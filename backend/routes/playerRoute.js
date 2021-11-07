//EXAMPLE
const catchAsync = require("../utils/catchAsync");

exports.list = catchAsync(async (req, res) => {
  res.render("users", { title: "Users", users: users });
});
