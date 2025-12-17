import PostModel from "../models/postModel.js";
import CustomError from "../utils/customError.js";
export default class PostController {
  // Create a post
  createPost(req, res, next) {
    // Use the userId from the token, not the body
    const userId = req.userId;
    const { caption } = req.body;

    // Get the image path from multer's file object
    const imageUrl = req.file ? req.file.path : null;

    if (!caption || !imageUrl) {
      return res
        .status(400)
        .send({ message: "Caption and image are required." });
    }

    const createdPost = PostModel.createPost(userId, caption, imageUrl);
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
      res.send(post);
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
      const postId = req.params.id;
      const userId = req.userId; // from JWT
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
      next(new CustomError(err.message, 404));
    }
  }
  // Delete a post
  deletePost(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.userId; // from JWT

      const success = PostModel.deletePost(postId, userId);
      if (success) {
        res.status(200).send({ message: "Post deleted successfully" });
      } else {
        // This case might not be reached if the model throws an error
        res.status(404).send({ message: "Post not found or unauthorized" });
      }
    } catch (err) {
      next(new CustomError(err.message, 401));
    }
  }
}
