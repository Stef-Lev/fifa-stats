const mongoose = require("mongoose");
const { Schema } = mongoose;

const TournamentSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  url: {
    type: String,
    required: false,
  },
  iv: {
    type: String,
    required: true,
  },
});

Player = {
  name: "John Doe",
  id: 7654321,
  games_played: {
    total: 20,
    won: 12,
    drawn: 3,
    lost: 5,
  },
  tournaments: {
    played: 10,
    won: 1,
  },
  goals: {
    for: 33,
    against: 12,
  },
};

Game = {
  id: 7654336,
  opponents: {
    player01: {
      name: "John Doe",
      goals: 2,
      points: 3,
    },
    player02: {
      name: "Michael Brown",
      goals: 1,
      points: 0,
    },
  },
  score: "2-1",
  winner: "John Doe",
};

Tournament = {
  id: 7654442,
  date: 1636225087208,
  games: [],
  participants: [
    {
      name: "John Doe",
      points: 3,
      goals_for: 2,
      goals_against: 1,
    },
    {
      name: "Michael Brown",
      points: 0,
      goals_for: 1,
      goals_against: 2,
    },
  ],
  winner: null,
};

module.exports = mongoose.model("Tournament", TournamentSchema);
