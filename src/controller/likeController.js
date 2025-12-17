import LikeModel from "../models/likeModel.js";

export default class LikeController {
  // Toggle like (add/remove)
  toggleLike(req, res, next) {
    try {
      const userId = req.userId;
      const postId = Number(req.params.postId);

      if (!postId) {
        return res.status(400).json({ message: "postId is required" });
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

      if (!postId) {
        return res.status(400).json({ message: "postId is required" });
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
