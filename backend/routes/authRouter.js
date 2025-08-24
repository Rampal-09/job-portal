const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const { validateSignup } = require("../validation/validation");
const { validateLogin } = require("../validation/validation");

authRouter.post("/signUp", validateSignup(), authController.postSignUp);
authRouter.post("/login", validateLogin(), authController.postLogin);
authRouter.post("/logout", authController.postLogout);

exports.authRouter = authRouter;
