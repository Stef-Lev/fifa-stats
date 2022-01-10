//EXAMPLE
const catchAsync = require('../utils/catchAsync');
const Player = require('../models/player');
const Game = require('../models/game');

exports.add = catchAsync(async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

exports.list = catchAsync(async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

exports.stats = catchAsync(async (req, res) => {
  const id = req.params.id;
  let dataObj = {};
  const player = await Player.findById(id);
  const games = await Game.find({});
  const sortedWins = games
    .filter((item) => item.winner.length < 2 && item.winner[0] == id)
    .map((item) => ({ id: item._id, scores: item.score.split(' - ') }))
    .map((item) => ({
      id: item.id,
      diff: Math.abs(item.scores[0] - item.scores[1]),
    }))
    .sort((a, b) => b.diff - a.diff)[0];
  const topWin = games.find((item) => item._id === sortedWins.id);

  dataObj.name = player.fullname;
  dataObj.games_played = player.games_played.statistics.total;
  dataObj.games_won = player.games_played.statistics.games_won;
  dataObj.games_drawn = player.games_played.statistics.drawn;
  dataObj.games_lost = player.games_played.statistics.lost;
  dataObj.tournaments_played = player.tournaments_played.won;
  dataObj.tournaments_won = player.tournaments_played.won;
  dataObj.av_goals_scored_per_game = +(
    player.goals.for / player.games_played.statistics.total
  ).toFixed(2);
  dataObj.av_goals_conceived_per_game = +(
    player.goals.against / player.games_played.statistics.total
  ).toFixed(2);
  dataObj.biggest_win = topWin;
  res.json(dataObj);
});
