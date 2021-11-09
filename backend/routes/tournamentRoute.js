const catchAsync = require('../utils/catchAsync');
const Tournament = require('../models/tournament');

exports.add = catchAsync(async (req, res) => {
  const tournament = new Tournament(req.body);
  await tournament.save();
  res.json(tournament);
});

exports.list = catchAsync(async (req, res) => {
  const tournaments = await Tournament.find({});
  res.json(tournaments);
});

exports.update = catchAsync(async (req, res) => {
  //@TODO fix this
  const tournaments = await Tournament.find({});
  res.json(tournaments);
});
