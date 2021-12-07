const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = catchAsync(async (req, res) => {
  const user = req.body;
  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    res.json({ message: 'Username or email has already been taken' });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });
    dbUser.save();
    res.json({ message: 'Success' });
  }
});
