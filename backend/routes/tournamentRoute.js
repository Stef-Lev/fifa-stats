const catchAsync = require('../utils/catchAsync');
const Tournament = require('../models/tournament');
const Player = require('../models/player');
const Game = require('../models/game');
const {
  calcWinner,
  updateTournamentStats,
  updatePlayerData,
} = require('../utils/helpers');

exports.add = catchAsync(async (req, res) => {
  const { participants, teams_rating } = req.body;
  const formattedPlayers = participants.map((item) => ({
    player: { id: item.id, name: item.name, team: item.team },
  }));
  const tournament = new Tournament({
    teams_rating: teams_rating,
    participants: formattedPlayers,
    games: [],
    winner: null,
  });
  await tournament.save();
  res.json(tournament);
});

exports.list = catchAsync(async (req, res) => {
  const tournaments = await Tournament.find({});
  res.json(tournaments);
});

exports.show = catchAsync(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id).populate('games');
  res.json(tournament);
});

exports.update = catchAsync(async (req, res) => {
  //Create home and away players
  const homePlayer = await Player.findById(req.body.home.id);
  const awayPlayer = await Player.findById(req.body.away.id);
  //Create game object
  let obj = {};
  obj.opponents = {
    home: {
      player: homePlayer,
      team: req.body.home.team,
      goals: parseInt(req.body.home.goals, 10),
      points: 0,
    },
    away: {
      player: awayPlayer,
      team: req.body.away.team,
      goals: parseInt(req.body.away.goals, 10),
      points: 0,
    },
  };
  obj.score = '';
  obj.winner = [];

  //Calculate winner
  const gameObj = calcWinner(obj);

  //Update data to game,tournament,players
  const game = new Game(gameObj);
  const tournament = await Tournament.findById(req.params.id);
  tournament.games.push(game);
  updateTournamentStats(homePlayer, game, tournament);
  updateTournamentStats(awayPlayer, game, tournament);

  //Save all
  await tournament.save();
  await game.save();

  const result = { ...tournament };

  res.status(200).json(result);
});

exports.finalize = catchAsync(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id).populate('games');
  tournament.participants
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDiff - a.goalDiff ||
        b.goalsFor - a.goalsFor,
    )
    .map((item, index) => (item.position = index + 1));

  tournament.participants.forEach((player) =>
    updatePlayerData(player, tournament),
  );

  await tournament.save();

  res.status(200).json('Everything OK');
});

exports.cancel = catchAsync(async (req, res) => {
  await Tournament.findByIdAndDelete(req.params.id);
  res.status(200).json('Deleted');
});
