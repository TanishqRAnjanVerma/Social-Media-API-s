import PostModel from "../models/postModel.js";
import CustomError from "../utils/customError.js";
export default class PostController {
  // Create a post
  createPost(req, res, next) {
    // Use the userId from the token, not the body
    const userId = req.userId;
    const { caption, status } = req.body; // status is optional

    // Get the image path from multer's file object
    const imageUrl = req.file ? req.file.path : null;

    if (!caption) {
      return res.status(400).send({ message: "Caption is required." });
    }

    // Pass status to the model, which will default to 'published' if not provided
    const createdPost = PostModel.createPost(userId, caption, imageUrl, status);
    res.status(201).send(createdPost);
  }

  // Get all posts
  getAllPosts(req, res, next) {
    // Extract query parameters for filtering, pagination, and sorting
    const { caption, page, limit, sortBy, order } = req.query;
    const allPosts = PostModel.getAllPosts({
      caption,
      page,
      limit,
      sortBy,
      order,
    });
    res.status(200).send(allPosts);
  }
  // Get post by id
  getPostById(req, res, next) {
    try {
      const post = PostModel.getPostById(req.params.id);
      res.status(200).send(post);
    } catch (err) {
      next(new CustomError(err.message, 404));
    }
  }
  // Get post by UserId
  getPostsByUserId(req, res, next) {
    const userId = req.params.userId;
    const postsByUserId = PostModel.getPostsByUserId(userId);
    res.status(200).send(postsByUserId);
  }
  // Update a post
  updatePost(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const userId = req.userId;
      const { caption } = req.body;
      const imageUrl = req.file ? req.file.path : undefined;

      const updatedPost = PostModel.updatePost(
        postId,
        userId,
        caption,
        imageUrl
      );
      res.status(200).send(updatedPost);
    } catch (err) {
      // Use 401 for unauthorized, and 404 for not found
      const statusCode = err.message.includes("Unauthorized") ? 401 : 404;
      next(new CustomError(err.message, statusCode));
    }
  }
  // Delete a post
  deletePost(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const userId = req.userId; // from JWT

      const success = PostModel.deletePost(postId, userId);
      if (success) {
        res.status(200).send({ message: "Post deleted successfully" });
      } else {
        // This case might not be reached if the model throws an error
        res.status(404).send({ message: "Post not found or unauthorized" });
      }
    } catch (err) {
      const statusCode = err.message.includes("unauthorized") ? 401 : 404;
      next(new CustomError(err.message, statusCode));
    }
  }

  // Update post status
  updateStatus(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const userId = req.userId;
      const { status } = req.body;

      if (!["draft", "archived", "published"].includes(status)) {
        return res.status(400).send({ message: "Invalid status provided." });
      }

      const updatedPost = PostModel.updateStatus(postId, userId, status);
      res.status(200).send(updatedPost);
    } catch (err) {
      const statusCode = err.message.includes("Unauthorized") ? 401 : 404;
      next(new CustomError(err.message, statusCode));
    }
  }

  // Toggle bookmark
  toggleBookmark(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const userId = req.userId;
      const message = PostModel.toggleBookmark(postId, userId);
      res.status(200).send({ message });
    } catch (err) {
      next(new CustomError(err.message, 404));
    }
  }
}
