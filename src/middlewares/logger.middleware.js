import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "social-media-api" },
  transports: [new winston.transports.File({ filename: "app.log" })],
});

export const loggerMiddleware = (req, res, next) => {
  // Exclude user authentication routes
  if (!req.originalUrl.startsWith("/api/users")) {
    const logData = {
      method: req.method,
      url: req.originalUrl,
      body: Object.keys(req.body || {}).length > 0 ? req.body : "N/A",
    };

    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
