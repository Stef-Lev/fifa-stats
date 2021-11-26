const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  opponents: {
    home: {
      player: { type: Schema.Types.ObjectId, ref: 'Player' },
      team: String,
      goals: Number,
      points: {
        type: Number,
        enum: [0, 1, 3],
      },
    },
    away: {
      player: { type: Schema.Types.ObjectId, ref: 'Player' },
      team: String,
      goals: Number,
      points: {
        type: Number,
        enum: [0, 1, 3],
      },
    },
  },
  date: {
    type: Date,
    default: new Date(),
  },
  score: String,
  winner: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});

module.exports = mongoose.model('Game', GameSchema);
