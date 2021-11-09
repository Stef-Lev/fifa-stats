const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
  name: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  credentials: {
    username: String,
    password: String,
  },
  games_played: {
    total: Number,
    won: Number,
    drawn: Number,
    lost: Number,
  },
  tournaments_played: {
    total: Number,
    won: Number,
  },
  goals: {
    for: Number,
    against: Number,
  },
});

module.exports = mongoose.model('Player', PlayerSchema);
