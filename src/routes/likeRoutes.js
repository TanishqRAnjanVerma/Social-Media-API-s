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
likeRouter.get("/", jwtAuth, likeController.getAllLikes);
likeRouter.post("/", jwtAuth, likeController.addLike);
likeRouter.delete("/:id", jwtAuth, likeController.removeLike);
likeRouter.get("/post/:postId", jwtAuth, likeController.getLikesByPostId);
likeRouter.post("/has-liked", jwtAuth, likeController.hasUserLiked);
// Export likeRouter
export default likeRouter;
