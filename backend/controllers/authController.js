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
        erros: errors.array(),
      });
    }
    console.log("loginData", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not match", user);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("password not match", password);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    req.session.isLoggedIn = true;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("backend error", err);
    console.log("error name", err.name);
    console.log("error code", err.code);
    console.log("error stack", err.stack);
    console.log("error code", err.code);
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
