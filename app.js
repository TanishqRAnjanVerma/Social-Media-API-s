import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swagger from "swagger-ui-express";
import fs from "fs";
import apiDocs from "./swagger.json" with { type: "json" };
import postRouter from "./src/routes/postRoutes.js";
import commentRouter from "./src/routes/commentRoutes.js";
import likeRouter from "./src/routes/likeRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";

// Load environment variables
dotenv.config();

// Creating a server
const app = express();

// CORS Policy Configuration
var corsOptions = {
  origin: "http://localhost:5500",
};
app.use(cors(corsOptions));

app.use(express.json());

// Use logger middleware
app.use(loggerMiddleware);

// Use Swagger
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// Default request handler
app.get("/", (req, res) => {
  res.send("Welcome to Social Media Application API");
});

// For all requests related to users
app.use("/api/users", userRouter);

// For all requests related to posts
app.use("/api/posts", jwtAuth, postRouter);

// For all requests related to comments
app.use("/api/comments", jwtAuth, commentRouter);

// For all requests related to likes
app.use("/api/likes", jwtAuth, likeRouter);

// Use the error handler middleware
app.use(errorHandler);

// Middleware to handle 404 requests
app.use((req, res) => {
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs.");
});

// Specify the port and start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
