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
  try {
    let { fullname, username, password, passwordCheck } = req.body;
    // password
    if (!fullname || !username || !password || !passwordCheck)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    if (password.length < 5)
      return res.status(400).json({
        msg: 'The password needs to be at least 5 characters long.',
      });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: 'A player with this username already exists.' });
    if (!fullname) fullname = username;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newPlayer = new Player({
      username,
      password: passwordHash,
      fullname,
    });
    const savedUser = await newPlayer.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.login = catchAsync(async (req, res) => {
  try {
    const { username, password } = req.body;
    // validate
    if (!username || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    const player = await Player.findOne({ username });
    if (!player)
      return res
        .status(400)
        .json({ msg: 'No player with this username has been registered.' });
    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.validateToken = catchAsync(async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const player = await Player.findById(verified.id);
    if (!player) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.getPlayerData = catchAsync(async (req, res) => {
  const player = await Player.findById(req.user);
  res.json({
    fullname: player.fullname,
    username: player.username,
    id: player._id,
  });
});
