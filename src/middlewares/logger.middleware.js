import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "social-media-api" },
  transports: [new winston.transports.File({ filename: "log.txt" })],
});

export const loggerMiddleware = async (req, res, next) => {
  // Log all requests except for user sign-in and sign-up
  if (!req.originalUrl.startsWith("/api/users")) {
    const logData = `Method: ${req.method}, URL: ${
      req.originalUrl
    }, Body: ${JSON.stringify(req.body)}`;
    logger.info(logData, { timestamp: new Date().toISOString() });
  }
  return next();
};

export default loggerMiddleware;
