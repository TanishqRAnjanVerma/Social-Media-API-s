// Manage routes/paths to CommentController

// Import express
import express from "express";
import CommentController from "../controller/commentController.js";

// Initialize an Express Router
const commentRouter = express.Router();

// Create an instance of CommentController
const commentController = new CommentController();

// All paths to commentController method
commentRouter.get("/", commentController.getAllComments);
commentRouter.post("/", commentController.addComment);
commentRouter.put("/:id", commentController.updateComment);
commentRouter.delete("/:id", commentController.deleteComment);

// Export postRouter
export default commentRouter;
