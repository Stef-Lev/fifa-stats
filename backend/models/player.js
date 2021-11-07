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
    total: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    won: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    drawn: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    lost: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  },
  tournaments_played: {
    played: [{ type: Schema.Types.ObjectId, ref: "Tournament" }],
    won: [{ type: Schema.Types.ObjectId, ref: "Tournament" }],
  },
  goals: {
    for: Number,
    against: Number,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
