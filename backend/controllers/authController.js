const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("===========================================");
    console.log("🚀 SIGNUP REQUEST RECEIVED!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
    console.log("===========================================");

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
