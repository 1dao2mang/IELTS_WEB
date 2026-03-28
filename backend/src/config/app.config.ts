// App Configuration
export const appConfig = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  apiPrefix: "/api",
  corsOrigin:
    process.env.NODE_ENV === "production"
      ? process.env.CORS_ORIGIN?.split(",") || []
      : [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:5173",
          "http://localhost:5174",
          "http://127.0.0.1:3000",
          "http://127.0.0.1:5173",
        ],
  // Security settings
  sessionSecret: process.env.SESSION_SECRET || "your-session-secret-change-in-production",
  jwtSecret: process.env.JWT_SECRET || "your-jwt-secret-change-in-production",
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
  // Rate limiting
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    authMaxRequests: 5,
    uploadMaxRequests: 10,
  },
  // File upload settings
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "audio/mpeg", "audio/wav"],
  },
  // API settings
  api: {
    version: "1.0.0",
    timeout: 30000, // 30 seconds
    pagination: {
      defaultLimit: 20,
      maxLimit: 100,
    },
  },
};
