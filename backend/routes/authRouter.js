const express =  require('express');
const authRouter = express.Router();
const authController =  require("../controllers/authController")


authRouter.post("/signUp" ,  authController.postSignUp )




exports.authRouter = authRouter;