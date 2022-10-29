const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const { User } = require("../../models");

const register = async (res, req) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword, subscription });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: email,
        subscription: subscription,
      },
    },
  });
};

module.exports = register;
