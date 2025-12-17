// Manage routes/paths to ProductController

// Import express
import express from "express";
import PostController from "../controller/postController.js";
import { upload } from "../middlewares/fileupload.middleware.js";

// Initialize an Express Router
const postRouter = express.Router();

// Create an instance of PostController
const postController = new PostController();

// All paths to controller method
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.get("/user/:userId", postController.getPostsByUserId);
postRouter.post(
  "/create-post",
  upload.single("imageUrl"),
  postController.createPost
);
postRouter.put("/:id", upload.single("imageUrl"), postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

// Export postRouter
export default postRouter;
