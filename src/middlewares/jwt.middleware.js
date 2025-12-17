const jwtAuth = (req, res, next) => {
  // Read the token
  const authHeader = req.headers.authorization;

  // Check if token exists and is in Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    // Call next middleware
    next();
  } catch (error) {
    // Return Error
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default jwtAuth;
