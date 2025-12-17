// Manage routes/paths to ProductController
import UserController from "../controller/userController.js";

// Import express
import express from "express";

// Initialize an  Express Router
const userRouter = express.Router();

// Create an instance of UserController
const userController = new UserController();

// All paths to controller method
userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-in", userController.signIn);
userRouter.get("/", userController.getAllUsers);

// Export userRouter
export default userRouter;
