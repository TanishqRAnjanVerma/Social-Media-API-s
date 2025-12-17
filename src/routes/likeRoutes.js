// Manage routes/paths to LikeController

// Import express
import express from "express";
import LikeController from "../controller/likeController.js";

// Intialize like router
const likeRouter = express.Router();

// Create an instance of likeController
const likeController = new LikeController();

// All paths to likeController method
// Toggle like (add/remove)
likeRouter.get("/toggle/:postId", likeController.toggleLike);

// Get all likes for a specific post
likeRouter.get("/:postId", likeController.getLikes);

// Export likeRouter
export default likeRouter;
