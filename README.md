# Social Media API

This is a RESTful API for a simple social media application. It provides endpoints for user authentication, creating and managing posts, commenting on posts, and liking posts.

The API is built with Node.js and Express, and it uses JWT for authentication.

## Features

- **User Management**: User registration and sign-in.
- **Authentication**: Secure endpoints using JSON Web Tokens (JWT).
- **Post Management**: Full CRUD (Create, Read, Update, Delete) functionality for posts.
- **Image Uploads**: Support for uploading images with posts.
- **Social Interactions**: Liking posts and adding comments.
- **API Documentation**: Interactive API documentation powered by Swagger/OpenAPI.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v16 or newer)
- [npm](https://www.npmjs.com/) (included with Node.js)

### Installation

1.  Clone the repository to your local machine.
2.  Navigate into the project directory:
    ```bash
    cd Social-Media
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:4000`.

## API Documentation

This API is documented using the OpenAPI 3.0 specification. Once the server is running, you can access the interactive Swagger UI documentation in your browser at:

**http://localhost:4000/api-docs**

This interface allows you to explore and test all the API endpoints directly.

## API Endpoints

All endpoints are prefixed with `/api`. Authentication is required for most endpoints and is handled via a JWT Bearer token in the `Authorization` header.

### User Endpoints

- **`POST /users/sign-up`**

  - **Description**: Registers a new user.
  - **Request Body**: `application/json` with `name`, `email`, and `password`.
  - **Response**: `201 Created` on success.

- **`POST /users/sign-in`**
  - **Description**: Logs in an existing user.
  - **Request Body**: `application/json` with `email` and `password`.
  - **Response**: `200 OK` with user details and a JWT `token`.

### Post Endpoints

- **`GET /posts`**

  - **Description**: Retrieves all posts. Supports filtering by `caption`, pagination (`page`, `limit`), and sorting (`sortBy=date|engagement`, `order=asc|desc`).
  - **Auth**: Required.
  - **Response**: `200 OK` with an array of posts.

- **`POST /posts`**

  - **Description**: Creates a new post. The route for this is `POST /api/posts`.
  - **Auth**: Required.
  - **Request Body**: `multipart/form-data` with `caption` (text) and `image` (file).
  - **Response**: `201 Created` with the newly created post.

- **`GET /posts/{id}`**

  - **Description**: Retrieves a single post by its ID.
  - **Auth**: Required.
  - **Response**: `200 OK` with the post details.

- **`PUT /posts/{id}`**

  - **Description**: Updates an existing post. Only the post's author can update it.
  - **Auth**: Required.
  - **Request Body**: `multipart/form-data` with optional `caption` (text) and `image` (file).
  - **Response**: `200 OK` with the updated post.

- **`DELETE /posts/{id}`**

  - **Description**: Deletes a post. Only the post's author can delete it.
  - **Auth**: Required.
  - **Response**: `200 OK` with a success message.

- **`GET /posts/user/{userId}`**

  - **Description**: Retrieves all posts created by a specific user. The route for this is `GET /api/posts/user/{userId}`.
  - **Auth**: Required.
  - **Response**: `200 OK` with an array of posts.

- **`PUT /posts/status/{id}`**

  - **Description**: Updates the status of a post (e.g., to 'draft', 'archived', or 'published'). Only the author can update the status.
  - **Auth**: Required.
  - **Request Body**: `application/json` with `status`.
  - **Response**: `200 OK` with the updated post.

- **`GET /posts/bookmark/{id}`**
  - **Description**: Toggles a bookmark on a post for the current user.
  - **Auth**: Required.
  - **Response**: `200 OK` with a success message ("Post bookmarked" or "Post unbookmarked").

### Comment Endpoints

- **`GET /comments/{postId}`**

  - **Description**: Retrieves all comments for a specific post.
  - **Auth**: Required.
  - **Response**: `200 OK` with an array of comments.

- **`POST /comments/{postId}`**

  - **Description**: Adds a new comment to a specific post.
  - **Auth**: Required.
  - **Request Body**: `application/json` with `content`.
  - **Response**: `201 Created` with the new comment.

- **`PUT /comments/{id}`**

  - **Description**: Updates a comment. Only the comment's author can update it.
  - **Auth**: Required.
  - **Request Body**: `application/json` with `content`.
  - **Response**: `200 OK` with the updated comment.

- **`DELETE /comments/{id}`**

  - **Description**: Deletes a comment. Only the comment's author can delete it.
  - **Auth**: Required.
  - **Response**: `200 OK` with a success message.

### Like Endpoints

- **`GET /likes/toggle/{postId}`**

  - **Description**: Toggles a like on a post. If the user has already liked the post, it unlikes it. Otherwise, it adds a like.
  - **Auth**: Required.
  - **Response**: `200 OK` with a success message ("Post liked" or "Post unliked").

- **`GET /likes/{postId}`**
  - **Description**: Retrieves all likes for a specific post.
  - **Auth**: Required.
  - **Response**: `200 OK` with the total like count and an array of like details.

## Project Structure

```
src/
├── config/         # Environment configuration
├── controller/     # Express route handlers (controllers)
├── middleware/     # Custom Express middleware (e.g., auth, file upload)
├── models/         # Data models and business logic
├── routes/         # API route definitions
├── utils/          # Utility functions and classes
└── server.js       # Main application entry point
```

## Testing

API testing can be performed using the Swagger UI or by importing the `swagger.json` file into a tool like Postman.

To test authenticated endpoints, first, use the `/api/users/sign-in` endpoint to get a JWT. Then, add it as a Bearer Token to the `Authorization` header for your subsequent requests.

---
