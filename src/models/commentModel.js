import CustomError from "../utils/customError.js";
// In-memory array to store comments
const comments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    content: "This is a comment",
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
    content: "This is another comment",
    createdAt: new Date(),
  },
  {
    id: 3,
    userId: 3,
    postId: 1,
    content: "This is a third comment",
    createdAt: new Date(),
  },
];
let commentIdCounter =
  comments.length > 0 ? Math.max(...comments.map((c) => c.id)) : 0;
export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
    this.createdAt = new Date();
  }

  // Add a comment
  static addComment(userId, postId, content) {
    const newComment = new CommentModel(
      ++commentIdCounter,
      userId,
      postId,
      content
    );
    comments.push(newComment);
    return newComment;
  }

  // Get comments by post ID
  static getCommentsByPostId(postId, { page = 1, limit = 10 }) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const postComments = comments.filter((c) => c.postId === Number(postId));

    // Paginate
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    return postComments.slice(startIndex, endIndex);
  }

  // Delete a comment
  static deleteComment(id, userId) {
    const index = comments.findIndex(
      (comment) => comment.id === Number(id) && comment.userId === userId
    );
    if (index === -1) {
      throw new CustomError(
        "Comment not found or you are not authorized to delete it",
        404
      );
    }
    comments.splice(index, 1);
    return true;
  }

  // Update a comment
  static updateComment(id, userId, content) {
    const comment = comments.find(
      (comment) => comment.id === Number(id) && comment.userId === userId
    );
    if (!comment) {
      throw new CustomError(
        "Comment not found or you are not authorized to update it",
        404
      );
    }
    comment.content = content;
    return comment;
  }
}

export { comments };
