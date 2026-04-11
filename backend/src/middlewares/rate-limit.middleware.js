// Rate Limit Middleware - Enhanced rate limiting for API endpoints
const { rateLimit } = require("express-rate-limit");

// Rate limit configurations for different endpoint types
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Stricter limit for auth endpoints
  message: {
    success: false,
    error: {
      code: "AUTH_RATE_LIMIT_EXCEEDED",
      message: "Too many authentication attempts, please try again later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // General API limit
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests, please try again later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const uploadRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Stricter limit for file uploads
  message: {
    success: false,
    error: {
      code: "UPLOAD_RATE_LIMIT_EXCEEDED",
      message: "Too many upload attempts, please try again later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Custom rate limiter that checks endpoint path
const rateLimitMiddleware = (req, res, next) => {
  const path = req.path;

  // Apply different limits based on endpoint
  if (path.includes("/auth/")) {
    return authRateLimit(req, res, next);
  } else if (path.includes("/upload") || path.includes("/submit")) {
    return uploadRateLimit(req, res, next);
  } else {
    return generalRateLimit(req, res, next);
  }
};

// Export individual limiters for specific use cases
module.exports = { authRateLimit, generalRateLimit, uploadRateLimit, rateLimitMiddleware };
