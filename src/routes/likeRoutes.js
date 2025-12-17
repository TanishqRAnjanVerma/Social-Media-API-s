// Manage routes/paths to LikeController

// Import express
import express from "express";
import jwtAuth from "../middlewares/jwt.middleware.js";
import LikeController from "../controller/likeController.js";

// Intialize like router
const likeRouter = express.Router();

// Create an instance of likeController
const likeController = new LikeController();

// All paths to likeController method
// Toggle like (add/remove)
likeRouter.get("/toggle/:postId", jwtAuth, likeController.toggleLike);

// Get all likes for a specific post
likeRouter.get("/:postId", jwtAuth, likeController.getLikes);

// Export likeRouter
export default likeRouter;
