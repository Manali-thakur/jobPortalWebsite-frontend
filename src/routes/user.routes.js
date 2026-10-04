import express from "express";
import userController from "../controller/user.controller.js";

const userRouter = express.Router();
const UserController = new userController();

userRouter.get("/", UserController.getLanding);
userRouter.get("/login", UserController.getLogin);
userRouter.get("/signup", UserController.getSignup);
userRouter.post("/register", UserController.postRegister);
userRouter.post("/login", UserController.postLogin);
userRouter.get("/logout", UserController.logout);
userRouter.post("/logout", UserController.logout);

export default userRouter;
