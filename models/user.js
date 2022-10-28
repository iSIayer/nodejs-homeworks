const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const signupJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regEmail).required(),
  subscription: Joi.string().regex(/^(starter|pro|business)$/),
  token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regEmail).required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
};
