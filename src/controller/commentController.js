import CommentModel from "../models/commentModel.js";

export default class CommentController {
  // Add a comment
  addComment(req, res) {
    const { userId, postId, content } = req.body;

    if (!userId || !content) {
      return res
        .status(400)
        .send({ message: "userId and content are required" });
    }

    const newComment = CommentModel.addComment(
      Number(userId),
      Number(postId),
      content
    );

    res.status(201).send(newComment);
  }

  // Get all comments
  getAllComments(req, res) {
    const allComments = CommentModel.getAllComments();
    res.status(200).send(allComments);
  }

  // Delete a comment
  deleteComment(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    const success = CommentModel.deleteComment(id, userId);
    if (success) {
      res.status(200).send({ message: "Comment deleted successfully" });
    } else {
      res.status(404).send({ message: "Comment not found or unauthorized" });
    }
  }

  // Update a comment
  updateComment(req, res) {
    const { id } = req.params;
    const { userId, content } = req.body;
    const updatedComment = CommentModel.updateComment(id, userId, content);
    if (updatedComment) {
      res.status(200).send(updatedComment);
    } else {
      res.status(404).send({ message: "Comment not found or unauthorized" });
    }
  }
}
