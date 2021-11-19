const catchAsync = require('../utils/catchAsync');
const Tournament = require('../models/tournament');
const Player = require('../models/player');
const Game = require('../models/game');
const {
  calcWinner,
  updatePlayersData,
  rollBackData,
} = require('../utils/helpers');
const player = require('../models/player');

exports.add = catchAsync(async (req, res) => {
  const { participants, team_rating } = req.body;
  const formattedPlayers = participants.map((item) => ({
    player: { id: item.id, name: item.name, team: item.team },
  }));
  const tournament = new Tournament({
    team_rating: team_rating,
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

  homePlayer.games_played.list.push(game);
  updatePlayersData(homePlayer, game, tournament);
  updatePlayersData(awayPlayer, game, tournament);

  //Save all
  await tournament.save();
  await game.save();
  await homePlayer.save();
  await awayPlayer.save();

  const result = { ...tournament };

  res.status(200).json(result);
});

exports.finalize = catchAsync(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  tournament.participants
    .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)
    .map((item, index) => (item.position = index + 1));

  const champ = tournament.participants[0];
  const champPlayer = await Player.findById(champ.player.id);

  tournament.participants.forEach(async (item) => {
    let player = await Player.findById(item.player.id);
    player.tournaments_played.total += 1;
    return await player.save();
  });
  champPlayer.tournaments_played.won += 1;

  await tournament.save();
  await champPlayer.save();
  res.json(champPlayer);
});
