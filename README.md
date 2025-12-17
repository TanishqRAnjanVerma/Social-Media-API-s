# Social Media API

This is a robust RESTful API for a social media application built with Node.js and Express. It includes features for user authentication, post management, comments, likes, file uploads, and comprehensive API documentation with Swagger.

## Features

- **User Authentication**: Secure sign-up and sign-in using JWT (JSON Web Tokens).
- **Post Management**: Full CRUD (Create, Read, Update, Delete) functionality for posts.
- **Advanced Post Retrieval**:
  - Filter posts by caption.
  - Sort posts by creation date.
  - Paginate results for efficient loading.
- **Engagement**:
  - Add and manage comments on posts.
  - Like and unlike posts.
- **Media Uploads**: Upload images for posts using `multer`.
- **Security**: Endpoints are secured using custom JWT authentication middleware.
- **Error Handling**: Centralized, custom error handling for consistent API responses.
- **Logging**: Detailed request logging using `winston`.
- **API Documentation**: Interactive API documentation powered by Swagger.

---

## API Documentation

Once the server is running, you can explore and interact with the API using the Swagger documentation available at:

**http://localhost:4000/api-docs**

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (usually comes with Node.js)

### Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project's root directory in your terminal.
3.  Install the required npm packages:
    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory of the project.
2.  Add the following environment variable. This is used to sign the JWTs.

    ```env
    JWT_SECRET="your_super_secret_jwt_key"
    ```

### Running the Application

To start the Express server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:4000`.

---

## API Endpoints Overview

All endpoints are prefixed with `/api`.

### User Routes (`/users`)

- `POST /sign-up`: Register a new user.
- `POST /sign-in`: Log in a user and receive a JWT.
- `GET /`: Get a list of all users.

### Post Routes (`/posts`)

_(Requires JWT Authentication)_

- `POST /`: Create a new post (multipart/form-data for image upload).
- `GET /`: Get all posts with optional filtering, sorting, and pagination.
- `GET /:id`: Get a specific post by its ID.
- `PUT /:id`: Update a post's caption or image.
- `DELETE /:id`: Delete a post.
- `GET /user/:userId`: Get all posts by a specific user.

### Comment Routes (`/comments`)

_(Requires JWT Authentication)_

- `POST /:postId`: Add a comment to a post.
- `GET /:postId`: Get all comments for a specific post.

### Like Routes (`/likes`)

_(Requires JWT Authentication)_

- `POST /`: Add a like to a post.
- `GET /`: Get all likes.
- `GET /post/:postId`: Get all likes for a specific post.
- `DELETE /:id`: Remove a like.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Database**: In-memory arrays (for demonstration purposes)
- **File Uploads**: Multer
- **API Documentation**: Swagger UI Express
- **Logging**: Winston
- **Environment Variables**: Dotenv
- **CORS**: cors
