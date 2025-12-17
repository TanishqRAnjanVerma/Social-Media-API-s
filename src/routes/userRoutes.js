// Manage routes/paths to UserController and related controllers

// Import express
import express from "express";
import UserController from "../controller/userController.js";
import jwtAuth from "../middlewares/jwt.middleware.js";
import {
  SignupValidation,
  LoginValidation,
} from "../middlewares/validation.middlewware.js";

// Initialize an Express Router
const userRouter = express.Router();

// Create instances of controllers
const userController = new UserController();

// All paths to controller methods
userRouter.post("/sign-up", SignupValidation, userController.signUp);
userRouter.post("/sign-in", LoginValidation, userController.signIn);
userRouter.get("/", jwtAuth, userController.getAllUsers);

// Export userRouter
export default userRouter;
