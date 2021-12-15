//EXAMPLE
const catchAsync = require('../utils/catchAsync');
const Player = require('../models/player');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.add = catchAsync(async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

exports.list = catchAsync(async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

exports.clear = catchAsync(async (req, res) => {
  const players = await Player.find({});
  players.forEach((item) => {
    item.games_played.statistics.total = 0;
    item.games_played.statistics.won = 0;
    item.games_played.statistics.drawn = 0;
    item.games_played.statistics.lost = 0;
    item.games_played.list = [];
    item.tournaments_played.total = 0;
    item.tournaments_played.won = 0;
    item.goals.for = 0;
    item.goals.against = 0;
  });
  players.forEach(async (item) => {
    const player = new Player(item);
    await player.save();
  });
  res.json('cleared');
});

exports.register = catchAsync(async (req, res) => {
  const player = req.body;
  const takenUsername = await Player.findOne({
    username: player.username,
  });

  if (takenUsername) {
    res.json({ message: 'Username is being used by another player' });
  } else {
    player.password = await bcrypt.hash(req.body.password, 10);

    const dbPlayer = new Player({
      name: player.name,
      username: player.username.toLowerCase(),
      password: player.password,
    });
    dbPlayer.save();
    res.json({ message: 'Success' });
  }
});

exports.login = catchAsync(async (req, res) => {
  const userLoggingIn = req.body;

  Player.findOne({ username: userLoggingIn.username }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: 'Invalid Username or Password' });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ message: err });
              return res.json({
                message: 'success',
                token: `Bearer ${token}`,
              });
            },
          );
        } else {
          return res.json({
            message: 'Invalid Username or Password',
          });
        }
      });
  });
});

exports.getPlayerName = catchAsync(async (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});
