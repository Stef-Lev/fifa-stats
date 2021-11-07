const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  opponents: {
    homePlayer: {
      goals: Number,
      points: Number,
    },
    awayPlayer: {},
  },
});

module.exports = mongoose.model("Game", GameSchema);
