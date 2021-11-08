//EXAMPLE
const catchAsync = require("../utils/catchAsync");
const Player = require("../models/player");

exports.add = catchAsync(async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

exports.list = catchAsync(async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});
