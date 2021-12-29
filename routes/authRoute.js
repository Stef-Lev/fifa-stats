const Player = require('../models/player');
const AppError = require('../utils/AppError');
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

  res.cookie('jwt', token, {
    expires: d,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none',
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
    });
    createPlayerToken(newPlayer, 201, req, res);
  } catch (err) {
    next(err);
  }
};

exports.loginPlayer = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide a username and password!', 400));
  }

  const player = await Player.findOne({ username }).select('+password');
  if (!player || !(await player.correctPassword(password, player.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  createPlayerToken(player, 200, req, res);
});

exports.checkPlayer = catchAsync(async (req, res, next) => {
  let currentPlayer;
  console.log('cookies!!!', req.cookies.jwt);
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentPlayer = await Player.findById(decoded.id);
  } else {
    currentPlayer = null;
  }
  res.status(200).send({ currentPlayer });
});
//log user out
exports.logoutPlayer = catchAsync(async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).send('user is logged out');
});
