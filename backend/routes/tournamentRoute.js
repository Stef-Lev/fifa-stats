const catchAsync = require('../utils/catchAsync');
const Tournament = require('../models/tournament');
const Player = require('../models/player');
const Game = require('../models/game');
const {
  calcWinner,
  updatePlayerOnGame,
  updateTournamentStats,
} = require('../utils/helpers');

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
  updatePlayerOnGame(homePlayer, game);
  updatePlayerOnGame(awayPlayer, game);

  // await tournament.save();
  // await game.save();
  // await homePlayer.save();
  // await awayPlayer.save();

  //Save all
  let result = { tournament, game, homePlayer, awayPlayer };
  res.json(tournament);
});
