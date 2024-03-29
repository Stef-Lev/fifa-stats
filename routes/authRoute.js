const Player = require('../models/player');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createPlayerToken = async (player, code, req, res) => {
  const token = signToken(player._id);

  let d = new Date();
  d.setDate(d.getDate() + 30);

  res.cookie('jwt_token', token, {
    expires: d,
    httpOnly: true,
  });

  player.password = undefined;
  res.status(code).json({
    status: 'success',
    token,
    data: {
      player,
    },
  });
};

exports.registerPlayer = async (req, res, next) => {
  try {
    let { username, password, passwordCheck, fullname } = req.body;
    if (!username || !password || !passwordCheck)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });

    if (!fullname) fullname = username;

    const newPlayer = await Player.create({
      fullname: fullname,
      username: username,
      password: password,
      passwordCheck: passwordCheck,
    });
    createPlayerToken(newPlayer, 201, req, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.loginPlayer = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ msg: 'Please provide a username and password!' });
  }

  const player = await Player.findOne({ username }).select('+password');
  let correctPassword;
  if (player) {
    correctPassword = await player.correctPassword(password, player.password);
  }
  if (!player || !correctPassword) {
    return res.status(401).send({ msg: 'Incorrect username or password' });
  }
  createPlayerToken(player, 200, req, res);
});

exports.checkPlayer = catchAsync(async (req, res, next) => {
  let currentPlayer;
  if (req.cookies.jwt_token) {
    const token = req.cookies.jwt_token;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentPlayer = await Player.findById(decoded.id);
  } else {
    currentPlayer = null;
  }
  res.status(200).send({ currentPlayer });
});
//log user out
exports.logoutPlayer = catchAsync(async (req, res) => {
  res.cookie('jwt_token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).send('user is logged out');
});
