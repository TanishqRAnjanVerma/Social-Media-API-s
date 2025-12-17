export const likes = [];
let likeIdCounter = 0;

export default class LikeModel {
  // Add a like
  static addLike(userId, postId) {
    const newLike = {
      id: ++likeIdCounter,
      userId,
      postId,
    };
    likes.push(newLike);
    return newLike;
  }

  // Remove a like (by userId + postId)
  static removeLike(userId, postId) {
    const index = likes.findIndex(
      (like) => like.userId === userId && like.postId === postId
    );

    if (index === -1) {
      return false;
    }

    likes.splice(index, 1);
    return true;
  }

  // Check if a user has already liked a post
  static findLike(userId, postId) {
    return likes.find(
      (like) => like.userId === userId && like.postId === postId
    );
  }

  // Get all likes for a specific post
  static getLikesByPostId(postId) {
    return likes.filter((like) => like.postId === postId);
  }
}
