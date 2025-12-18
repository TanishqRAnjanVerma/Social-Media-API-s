import CommentModel, { comments } from "../models/commentModel.js";
import CustomError from "../utils/customError.js";

export default class CommentController {
  // Add a comment
  addComment(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const { content } = req.body;
      const newComment = CommentModel.addComment(
        userId,
        Number(postId),
        content
      );
      res.status(201).send(newComment);
    } catch (error) {
      next(error);
    }
  }

  // Get all comments for a specific post
  getCommentsForPost(req, res, next) {
    try {
      const { page, limit } = req.query;
      const postId = req.params.postId;
      const comments = CommentModel.getCommentsByPostId(Number(postId), {
        page,
        limit,
      });
      res.status(200).send(comments);
    } catch (error) {
      next(error);
    }
  }

  // Delete a comment
  deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const userId = req.userId;
      CommentModel.deleteComment(Number(commentId), userId);
      res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Update a comment
  updateComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const userId = req.userId;
      const { content } = req.body;

      if (!content) {
        throw new CustomError("Content is required", 400);
      }

      const updatedComment = CommentModel.updateComment(
        Number(commentId),
        userId,
        content
      );

      res.status(200).send(updatedComment);
    } catch (error) {
      next(error);
    }
  }
}
