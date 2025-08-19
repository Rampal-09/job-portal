const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/signUp", authController.postSignUp);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

exports.authRouter = authRouter;
