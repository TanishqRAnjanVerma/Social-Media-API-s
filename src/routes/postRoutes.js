// Manage routes/paths to ProductController

// Import express
import express from "express";
import PostController from "../controller/postController.js";
import { upload } from "../middlewares/fileupload.middleware.js";
import jwtAuth from "../middlewares/jwt.middleware.js";

// Initialize an Express Router
const postRouter = express.Router();

// Create an instance of PostController
const postController = new PostController();

// All paths to controller method
postRouter.get("/", jwtAuth, postController.getAllPosts);
postRouter.get("/:id", jwtAuth, postController.getPostById);
postRouter.get("/user/:userId", jwtAuth, postController.getPostsByUserId);
postRouter.post(
  "/create-post",
  upload.single("imageUrl"),
  jwtAuth,
  postController.createPost
);
postRouter.put(
  "/:id",
  upload.single("imageUrl"),
  jwtAuth,
  postController.updatePost
);
postRouter.delete("/:id", jwtAuth, postController.deletePost);

// Export postRouter
export default postRouter;
