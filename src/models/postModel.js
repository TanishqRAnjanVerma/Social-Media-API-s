import { comments } from "./commentModel.js";
import { likes } from "./likeModel.js";

// In-memory array to store posts
let posts = [
  {
    id: 1,
    userId: 1,
    caption: "First post!",
    imageUrl: "path/to/image1.jpg",
    status: "published",
    bookmarks: [1, 2],
    createdAt: new Date("2023-10-26T10:00:00Z"),
  },
  {
    id: 2,
    userId: 1,
    caption: "Another cool post",
    imageUrl: "path/to/image2.jpg",
    status: "published",
    bookmarks: [],
    createdAt: new Date("2023-10-27T11:00:00Z"),
  },
];
let postIdCounter = posts.length;

export default class PostModel {
  constructor(id, userId, caption, imageUrl, status = "published") {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.status = status;
    this.bookmarks = [];
    this.createdAt = new Date();
  }

  // Create a new post
  static createPost(userId, caption, imageUrl, status) {
    const newPost = new PostModel(
      ++postIdCounter,
      userId,
      caption,
      imageUrl,
      status
    );
    posts.push(newPost);
    return newPost;
  }

  // Get all posts with filtering, sorting, and pagination
  static getAllPosts({
    caption,
    page = 1,
    limit = 10,
    sortBy,
    order = "desc",
  }) {
    //  Filter by status (only show published posts) and caption
    let filteredPosts = posts.filter((p) => p.status === "published");
    if (caption) {
      filteredPosts = filteredPosts.filter((p) =>
        p.caption.toLowerCase().includes(caption.toLowerCase())
      );
    }

    // 2. Sort by date or engagement
    if (sortBy === "date") {
      filteredPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === "engagement") {
      filteredPosts.sort((a, b) => {
        const engagementA =
          likes.filter((l) => l.postId === a.id).length +
          comments.filter((c) => c.postId === a.id).length;
        const engagementB =
          likes.filter((l) => l.postId === b.id).length +
          comments.filter((c) => c.postId === b.id).length;
        return order === "asc"
          ? engagementA - engagementB
          : engagementB - engagementA;
      });
    }

    // 3. Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return paginatedPosts;
  }

  // Get a single post by its ID
  static getPostById(id) {
    const post = posts.find((p) => p.id === Number(id));
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }

  // Get all posts by a specific user
  static getPostsByUserId(userId) {
    // Return only 'published' posts when fetching for a user profile
    return posts.filter(
      (p) => p.userId === Number(userId) && p.status === "published"
    );
  }

  // Update a post
  static updatePost(postId, userId, caption, imageUrl) {
    const post = posts.find((p) => p.id === Number(postId));
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.userId !== userId) {
      throw new Error("Unauthorized to update this post");
    }
    if (caption) post.caption = caption;
    if (imageUrl) post.imageUrl = imageUrl;
    return post;
  }

  // Delete a post
  static deletePost(postId, userId) {
    const index = posts.findIndex(
      (p) => p.id === Number(postId) && p.userId === userId
    );
    if (index === -1) {
      throw new Error("Post not found or unauthorized to delete");
    }
    posts.splice(index, 1);
    return true;
  }

  // Update post status (draft, archive, publish)
  static updateStatus(postId, userId, status) {
    const post = posts.find((p) => p.id === Number(postId));
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.userId !== userId) {
      throw new Error("Unauthorized to update this post");
    }
    post.status = status;
    return post;
  }

  // Toggle a bookmark on a post
  static toggleBookmark(postId, userId) {
    const post = posts.find((p) => p.id === Number(postId));
    if (!post) {
      throw new Error("Post not found");
    }
    const bookmarkIndex = post.bookmarks.indexOf(userId);
    if (bookmarkIndex === -1) {
      // Bookmark it
      post.bookmarks.push(userId);
      return "Post bookmarked";
    } else {
      // Unbookmark it
      post.bookmarks.splice(bookmarkIndex, 1);
      return "Post unbookmarked";
    }
  }
}
