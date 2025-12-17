import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // Read the token
  const token = req.headers["authorization"];

  // If no token, send error
  if (!token) {
    return res.status(401).send("Access Denied. Unauthorized.");
  }

  // Check if token is valid or not
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
  } catch (err) {
    // Return Error
    return res.status(401).send("Access Denied. Unauthorized.");
  }

  // Call next middleware
  next();
};

export default jwtAuth;
