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
postRouter.post("/", upload.single("image"), postController.createPost);
postRouter.put("/:id", upload.single("image"), postController.updatePost);
postRouter.delete("/:id", postController.deletePost);
// Route to update post status (draft, archive, publish)
postRouter.put("/status/:id", postController.updateStatus);

// Route to toggle a bookmark on a post
postRouter.get("/bookmark/:id", postController.toggleBookmark);

// Export postRouter
export default postRouter;
