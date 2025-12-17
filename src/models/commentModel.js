// In-memomry array to store comments
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
    postId: 2,
    content: "This is another comment",
    createdAt: new Date(),
  },
  {
    id: 3,
    userId: 3,
    postId: 3,
    content: "This is a third comment",
    createdAt: new Date(),
  },
];
let commentIdCounter = comments.length;
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

  // Get all comments
  static getAllComments() {
    return comments;
  }
  // Delete a comment
  static deleteComment(id, userId) {
    const index = comments.findIndex(
      (comment) => comment.id == id && comment.userId == userId
    );
    if (index === -1) {
      return false;
    }
    comments.splice(index, 1);
    return true;
  }

  // Update a comment
  static updateComment(id, userId, content) {
    const comment = comments.find(
      (comment) => comment.id == id && comment.userId == userId
    );
    if (!comment) {
      return null;
    }
    comment.content = content;
    return comment;
  }
}
