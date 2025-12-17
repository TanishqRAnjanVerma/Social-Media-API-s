import CustomError from "../utils/customError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // For any other unhandled errors, send a generic 500 server error
  res
    .status(500)
    .json({ message: "An unexpected error occurred. Please try again later." });
};

export default errorHandler;
