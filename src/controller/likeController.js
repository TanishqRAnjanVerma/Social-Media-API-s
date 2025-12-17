import LikeModel from "../models/likeModel.js";

export default class LikeController {
  // Add a like
  addLike(req, res) {
    const userId = req.userId; // Use userId from JWT
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).send({ message: "postId is required" });
    }

    const hasLiked = LikeModel.hasUserLiked(userId, Number(postId));

    if (hasLiked) {
      return res.status(409).send({ message: "Post already liked" });
    }

    const newLike = LikeModel.addLike(userId, Number(postId));

    res.status(201).send(newLike);
  }

  // Remove a like
  removeLike(req, res) {
    const userId = req.userId; // Use userId from JWT
    const id = Number(req.params.id);
    const success = LikeModel.removeLike(id, userId);
    if (success) {
      res.status(200).send({ message: "Like removed successfully" });
    } else {
      res.status(404).send({ message: "Like not found or unauthorized" });
    }
  }
  // Get all likes
  getAllLikes(req, res) {
    const allLikes = LikeModel.getAllLikes();
    res.status(200).send(allLikes);
  }

  // Get like by post id
  getLikesByPostId(req, res) {
    const postId = Number(req.params.postId);
    const likes = LikeModel.getLikesByPostId(postId);
    res.status(200).send(likes);
  }

  // If user has already liked the post
  hasUserLiked(req, res) {
    const userId = req.userId; // Use userId from JWT
    const postId = Number(req.body.postId);
    const hasLiked = LikeModel.hasUserLiked(userId, postId); // Assuming postId is in body
    res.status(200).send({ hasLiked });
  }
}
