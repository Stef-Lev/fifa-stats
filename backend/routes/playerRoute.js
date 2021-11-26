//EXAMPLE
const catchAsync = require('../utils/catchAsync');
const Player = require('../models/player');

exports.add = catchAsync(async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

exports.list = catchAsync(async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

exports.clear = catchAsync(async (req, res) => {
  const players = await Player.find({});
  players.forEach(item => {
    item.games_played.statistics.total = 0;
    item.games_played.statistics.won = 0;
    item.games_played.statistics.drawn = 0;
    item.games_played.statistics.lost = 0;
    item.games_played.list = [];
    item.tournaments_played.total = 0;
    item.tournaments_played.won = 0;
    item.goals.for = 0;
    item.goals.against = 0;
  });
  players.forEach(async(item) => {
    const player = new Player(item)
    await player.save();
  })
  res.json('cleared');
});
