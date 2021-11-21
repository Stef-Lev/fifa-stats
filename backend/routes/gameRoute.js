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
  
  const tournament = await Tournament.findById(req.params.tid);
  const game = await Game.findById(req.params.gid);
  const {home, away} = game.opponents;
  const homePlayer = tournament.participants.find(item => item.player.id == home.player._id)
  const awayPlayer = tournament.participants.find(item => item.player.id == away.player._id)
  homePlayer.goals.for -= home.goals;
  homePlayer.goals.against -= away.goals;
  homePlayer.points -= home.points;
  awayPlayer.goals.for -= away.goals;
  awayPlayer.goals.against -= home.goals;
  awayPlayer.points -= away.points;

  await Game.findByIdAndDelete(req.params.gid);
  await tournament.save();
 
  res.json({ tournament });
});
