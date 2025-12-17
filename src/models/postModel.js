// In-memomry array to store posts
const posts = [
  {
    id: 1,
    userId: 1,
    caption: "This is my first post",
    imageUrl: "https://example.com/image1.jpg",
    createdAt: new Date(),
  },

  {
    id: 2,
    userId: 2,
    caption: "This is my second post",
    imageUrl: "https://example.com/image1.jpg",
    createdAt: new Date(),
  },

  {
    id: 3,
    userId: 3,
    caption: "This is my third post",
    imageUrl: "https://example.com/image1.jpg",
    createdAt: new Date(),
  },
];

// Create empty array to store post
export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    (this.id = id),
      (this.userId = userId),
      (this.caption = caption),
      (this.imageUrl = imageUrl);
  }

  // Create a post
  static createPost(userId, caption, imageUrl) {
    const newPost = {
      id: posts.length + 1,
      userId,
      caption,
      imageUrl,
      createdAt: new Date(),
    };

    posts.push(newPost);
    return newPost;
  }
  // Gets all the posts
  static getAllPosts(options = {}) {
    const { caption, page, limit, sortBy, order = "desc" } = options;

    let filteredPosts = [...posts];

    // 1. Filtering by caption
    if (caption) {
      filteredPosts = filteredPosts.filter((p) =>
        p.caption.toLowerCase().includes(caption.toLowerCase())
      );
    }

    // 2. Sorting
    if (sortBy === "createdAt") {
      filteredPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (order === "asc") {
          return dateA - dateB;
        }
        return dateB - dateA; // Default to descending
      });
    }

    // 3. Pagination
    if (page && limit) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = pageNum * limitNum;

      return filteredPosts.slice(startIndex, endIndex);
    }

    return filteredPosts;
  }

  // Get post by id

  static getPostById(id) {
    id = Number(id);
    const post = posts.find((p) => p.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }

  // Get post by UserId
  static getPostsByUserId(userId) {
    const userPosts = posts.filter((p) => p.userId == userId);
    if (userPosts.length === 0) {
      throw new Error("No posts found for this user");
    }
    return userPosts;
  }

  // Update a post
  static updatePost(id, userId, caption, imageUrl) {
    id = Number(id);
    const post = posts.find((p) => p.id === id);

    if (!post) {
      throw new Error("Post not found");
    }
    // Authorization check
    if (post.userId != userId) {
      throw new Error("Unauthorized to update this post");
    }

    if (caption) post.caption = caption;
    if (imageUrl) post.imageUrl = imageUrl;

    return post;
  }

  // Delete a post
  static deletePost(id, userId) {
    id = Number(id);
    const index = posts.findIndex((p) => p.id === id && p.userId == userId);
    if (index === -1) {
      // Throw error for not found or unauthorized
      throw new Error("Post not found or user not authorized");
    }
    posts.splice(index, 1);
    return true;
  }
}
