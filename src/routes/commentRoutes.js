// Manage routes/paths to CommentController

// Import express
import express from "express";
import jwtAuth from "../middlewares/jwt.middleware.js";
import CommentController from "../controller/commentController.js";

// Initialize an Express Router
const commentRouter = express.Router();

// Create an instance of CommentController
const commentController = new CommentController();

// All paths to commentController method
commentRouter.get("/", jwtAuth, commentController.getAllComments);
commentRouter.post("/", jwtAuth, commentController.addComment);
commentRouter.put("/:id", jwtAuth, commentController.updateComment);
commentRouter.delete("/:id", jwtAuth, commentController.deleteComment);

// Export postRouter
export default commentRouter;
