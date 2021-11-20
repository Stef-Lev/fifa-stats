const catchAsync = require('../utils/catchAsync');
const Game = require('../models/game');
const Tournament = require('../models/tournament');

exports.add = catchAsync(async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.json(game);
});

exports.list = catchAsync(async (req, res) => {
  const game = await Game.find({});
  res.json(game);
});

exports.delete = catchAsync(async (req, res) => {
  // await Game.findByIdAndDelete(req.params.id);
  const tournament = await Tournament.findById(req.params.tid);
  const game = await Game.findById(req.params.gid);
  res.json({tournament, game});
});
