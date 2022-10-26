const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bcrypt = require("bcrypt");
const regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const userSchema = Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: [true, "Name is required"],
    },
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

const signupJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regEmail).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  signupJoiSchema,
};
