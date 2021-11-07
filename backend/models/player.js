const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Provide a player name"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  credentials: {
    username: {
      type: String,
      required: [true, "Add a username"],
    },
    password: {
      type: String,
      required: [true, "Add a password"],
    },
  },
  games_played: {
    total: Number,
    won: Number,
    drawn: Number,
    lost: Number,
  },
  tournaments_played: {
    played: Number,
    won: Number,
  },
  goals: {
    for: Number,
    against: Number,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
