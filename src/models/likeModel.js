const likes = [];

export default class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }

  // Add a like
  static addLike(userId, postId) {
    const newLike = {
      id: likes.length + 1,
      userId,
      postId,
      createdAt: new Date(),
    };
    likes.push(newLike);
    return newLike;
  }

  // Remove a like
  static removeLike(id, userId) {
    const index = likes.findIndex(
      (like) => like.id == id && like.userId == userId
    );

    if (index === -1) {
      return false;
    }

    likes.splice(index, 1);
    return true;
  }

  // Get likes by post id
  static getLikesByPostId(postId) {
    return likes.filter((like) => like.postId == postId);
  }

  // Get all likes
  static getAllLikes() {
    return likes;
  }

  // If user has already liked the post
  static hasUserLiked(userId, postId) {
    const like = likes.find(
      (like) => like.userId == userId && like.postId == postId
    );
    if (!like) {
      return false;
    }
    return true;
  }
}
