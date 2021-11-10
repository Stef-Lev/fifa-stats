const catchAsync = require('../utils/catchAsync');
const Tournament = require('../models/tournament');
const Player = require('../models/player');

exports.add = catchAsync(async (req, res) => {
  const { participants, team_rating } = req.body;
  const formattedPlayers = participants.map((item) => ({
    player: { id: item._id, name: item.name },
    goals: { for: 0, against: 0, position: 0 },
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
  const tournaments = await Tournament.find({}).populate('participants');
  res.json(tournaments);
});

exports.show = catchAsync(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  res.json(tournament);
});

exports.update = catchAsync(async (req, res) => {
  //@TODO fix this
  const tournaments = await Tournament.find({});
  res.json(tournaments);
});
