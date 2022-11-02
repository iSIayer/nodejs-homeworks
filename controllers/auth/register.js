const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarUrl = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: name,
        email: email,
        subscription: subscription,
        avatarUrl,
      },
    },
  });
};

// ==============Альтернативный спопсоб регистрации юзера :==================

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Conflict(`User with ${email} already exist`);
//   }
//   const newUser = new User({ name, email });
//   newUser.setPassword(password);
//   newUser.save();
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: {
//       user: {
//         email,
//         name,
//       },
//     },
//   });
// };
module.exports = register;
