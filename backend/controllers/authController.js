const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.postSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "email is already exist" });
  }
  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "user created succesfully" });
};

exports.postLogin = (req, res, next) => {};
