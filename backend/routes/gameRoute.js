const catchAsync = require('../utils/catchAsync');
const Game = require('../models/game');

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
  await Game.findByIdAndDelete(req.params.id);
  res.json('DELETED GAME');
});
