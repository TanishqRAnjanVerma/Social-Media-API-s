// Manage routes/paths to CommentController

// Import express
import express from "express";
import CommentController from "../controller/commentController.js";

// Initialize an Express Router
const commentRouter = express.Router();

// Create an instance of CommentController
const commentController = new CommentController();

// All paths to commentController method
commentRouter.get("/post/:postId", commentController.getCommentsForPost);
commentRouter.post("/post/:postId", commentController.addComment);
commentRouter.put("/:commentId", commentController.updateComment);
commentRouter.delete("/:commentId", commentController.deleteComment);

// Export commentRouter
export default commentRouter;
