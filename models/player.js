const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  games_played: {
    list: [{ type: Schema.Types.ObjectId, ref: 'Game', default: [] }],
    statistics: {
      total: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      drawn: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
    },
  },
  tournaments_played: {
    total: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
  },
  goals: {
    for: { type: Number, default: 0 },
    against: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Player', PlayerSchema);
