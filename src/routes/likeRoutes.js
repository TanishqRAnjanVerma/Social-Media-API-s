// Manage routes/paths to ProductController
import LikeController from "../controller/likeController.js";

// Import express
import express from "express";

// Intialize like router
const likeRouter = express.Router();

// Create an instance of likeController
const likeController = new LikeController();

// All paths to likeController method
likeRouter.get("/", likeController.getAllLikes);
likeRouter.post("/", likeController.addLike);
likeRouter.delete("/:id", likeController.removeLike);
likeRouter.get("/post/:postId", likeController.getLikesByPostId);
likeRouter.post("/has-liked", likeController.hasUserLiked);
// Export likeRouter
export default likeRouter;
