const catchAsync = require('../utils/catchAsync');
const Tournament = require('../models/tournament');
const Player = require('../models/player');

exports.add = catchAsync(async (req, res) => {
  const { participants, team_rating } = req.body;
  const participantIds = participants.map((item) => item._id);
  const players = await Player.find().where('_id').in(participantIds).exec();
  const formattedPlayers = players.map((item) => ({
    player: item,
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
