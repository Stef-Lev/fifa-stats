const mongoose = require('mongoose');
const { Schema } = mongoose;

const TournamentSchema = new Schema({
  date: new Date(),
  teams_rating: Number,
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  participants: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      goals: {
        for: Number,
        against: Number,
      },
      position: Number,
    },
  ],
  winner: { type: Schema.Types.ObjectId, ref: 'Player' },
});

module.exports = mongoose.model('Tournament', TournamentSchema);
