const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  opponents: {
    homePlayer: {
      player: { type: Schema.Types.ObjectId, ref: "Player" },
      goals: Number,
      points: {
        type: Number,
        enum: [0, 1, 3],
      },
    },
    awayPlayer: {
      player: { type: Schema.Types.ObjectId, ref: "Player" },
      goals: Number,
      points: {
        type: Number,
        enum: [0, 1, 3],
      },
    },
  },
  score: String,
  winner: { type: Schema.Types.ObjectId, ref: "Player" },
});

module.exports = mongoose.model("Game", GameSchema);
