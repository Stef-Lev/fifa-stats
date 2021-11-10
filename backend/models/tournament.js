const mongoose = require('mongoose');
const { Schema } = mongoose;

const TournamentSchema = new Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  teams_rating: Number,
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  participants: [
    {
      player: {
        id: String,
        name: String,
      },
      team: String,
      goals: {
        for: { type: Number, default: 0 },
        against: { type: Number, default: 0 },
      },
      points: { type: Number, default: 0 },
      position: { type: Number, default: 0 },
      _id: false,
    },
  ],
  winner: { type: Schema.Types.ObjectId, ref: 'Player' },
});

module.exports = mongoose.model('Tournament', TournamentSchema);
