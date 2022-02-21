//EXAMPLE
const catchAsync = require('../utils/catchAsync');
const Player = require('../models/player');
const Game = require('../models/game');

exports.add = catchAsync(async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

exports.list = catchAsync(async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

exports.stats = catchAsync(async (req, res) => {
  const id = req.params.id;
  let dataObj = {};
  const player = await Player.findById(id);
  if (player.games_played.list.length > 0) {
    const games = await Game.find({});
    const sortedWins = games
      .filter((item) => item.winner.length < 2 && item.winner[0] == id)
      .map((item) => ({ id: item._id, scores: item.score.split(' - ') }))
      .map((item) => ({
        id: item.id,
        diff: Math.abs(item.scores[0] - item.scores[1]),
      }))
      .sort((a, b) => b.diff - a.diff)[0];
    const topWin = await Game.findById(sortedWins.id.toJSON());
    const topWinAgainst = Object.values(topWin.opponents)
      .find((item) => item.player._id.toJSON() !== player._id.toJSON())
      .player.toJSON();
    const winOpponent = await Player.findById(topWinAgainst);
    const sortedLosses = games
      .filter(
        (item) =>
          item.winner.length < 2 &&
          item.winner[0] != id &&
          (item.opponents.home.player == id ||
            item.opponents.away.player == id),
      )
      .map((item) => ({ id: item._id, scores: item.score.split(' - ') }))
      .map((item) => ({
        id: item.id,
        diff: Math.abs(item.scores[0] - item.scores[1]),
      }))
      .sort((a, b) => b.diff - a.diff)[0];
    const topLoss = await Game.findById(sortedLosses.id.toJSON());
    const topLossAgainst = Object.values(topLoss.opponents)
      .find((item) => item.player._id.toJSON() !== player._id.toJSON())
      .player.toJSON();
    const lossOpponent = await Player.findById(topLossAgainst);

    dataObj.name = player.fullname;
    dataObj.id = player.id;
    dataObj.games_played = player.games_played.statistics.total;
    dataObj.games_won = player.games_played.statistics.won;
    dataObj.games_drawn = player.games_played.statistics.drawn;
    dataObj.games_lost = player.games_played.statistics.lost;
    dataObj.tournaments_played = player.tournaments_played.total;
    dataObj.tournaments_won = player.tournaments_played.won;
    dataObj.av_goals_scored_per_game = +(
      player.goals.for / player.games_played.statistics.total
    ).toFixed(2);
    dataObj.av_goals_conceived_per_game = +(
      player.goals.against / player.games_played.statistics.total
    ).toFixed(2);
    dataObj.biggest_win = {
      score: topWin.score,
      against: winOpponent.fullname,
      teams: topWin.opponents,
    };
    dataObj.biggest_loss = {
      score: topLoss.score,
      against: lossOpponent.fullname,
      teams: topLoss.opponents,
    };
  } else {
    dataObj.errorMsg = 'No games played';
  }
  res.status(200).json(dataObj);
});

exports.updateColor = catchAsync(async (req, res) => {
  const player = await Player.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { color: req.body.color } },
    {
      new: true,
    },
  );
  res.status(200).json(player);
});

exports.updateRole = catchAsync(async (req, res) => {
  const player = await Player.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { role: req.body.role } },
    {
      new: true,
    },
  );
  res.status(200).json(player);
});
