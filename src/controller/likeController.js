import LikeModel from "../models/likeModel.js";
import CustomError from "../utils/customError.js";

export default class LikeController {
  // Toggle like (add/remove)
  toggleLike(req, res, next) {
    try {
      const userId = req.userId;
      const postId = Number(req.params.postId); // postId from params

      if (!postId || isNaN(postId)) {
        throw new CustomError("A valid postId is required", 400);
      }

      const existingLike = LikeModel.findLike(userId, postId);

      if (existingLike) {
        LikeModel.removeLike(userId, postId);
        return res.status(200).json({ message: "Post unliked" });
      } else {
        LikeModel.addLike(userId, postId);
        return res.status(200).json({ message: "Post liked" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Get all likes for a specific post
  getLikes(req, res, next) {
    try {
      const postId = Number(req.params.postId);

      if (!postId || isNaN(postId)) {
        throw new CustomError("A valid postId is required", 400);
      }

      const likes = LikeModel.getLikesByPostId(postId);

      res.status(200).json({
        totalLikes: likes.length,
        likes,
      });
    } catch (error) {
      next(error);
    }
  }
}
