const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.postSignUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "email is already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "validation error",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    req.session.isLoggedIn = true;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "logout successfuly" });
  });
};

exports.getCurrentUser = (req, res, next) => {
  try {
    const user = {
      id: req.session.user.id,
      name: req.session.user.name,
      email: req.session.user.email,
      role: req.session.user.role,
    };

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
