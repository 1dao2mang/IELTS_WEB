// Express App Setup
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { appConfig } = require("./config/app.config");
const { errorMiddleware } = require("./middlewares/error.middleware");
const { loggerMiddleware } = require("./middlewares/logger.middleware");
const { rateLimitMiddleware } = require("./middlewares/rate-limit.middleware");
const { DatabaseHealthService } = require("./services/database/health.service");

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const listeningRoutes = require("./routes/listening.routes");
const readingRoutes = require("./routes/reading.routes");
const writingRoutes = require("./routes/writing.routes");
const speakingRoutes = require("./routes/speaking.routes");
const testRoutes = require("./routes/test.routes");
const progressRoutes = require("./routes/progress.routes");
const bookmarkRoutes = require("./routes/bookmark.routes");
const badgeRoutes = require("./routes/badge.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// BigInt serialization fix
(BigInt.prototype).toJSON = function () {
  return this.toString();
};

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: appConfig.corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400, // 24 hours
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(rateLimitMiddleware);

// Serve static files (media uploads)
app.use("/uploads", express.static("public/uploads"));

// Health check
app.get("/health", async (_req, res) => {
  const dbHealth = await DatabaseHealthService.checkConnection();
  const performance = await DatabaseHealthService.testPerformance();

  res.json({
    status: dbHealth ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    database: {
      connected: dbHealth,
      performance,
    },
  });
});

// Database metrics endpoint
app.get("/metrics", async (_req, res) => {
  const metrics = await DatabaseHealthService.getMetrics();
  res.json(metrics);
});

// API Routes
app.use(`${appConfig.apiPrefix}/auth`, authRoutes);
app.use(`${appConfig.apiPrefix}/users`, userRoutes);
app.use(`${appConfig.apiPrefix}/listening`, listeningRoutes);
app.use(`${appConfig.apiPrefix}/reading`, readingRoutes);
app.use(`${appConfig.apiPrefix}/writing`, writingRoutes);
app.use(`${appConfig.apiPrefix}/speaking`, speakingRoutes);
app.use(`${appConfig.apiPrefix}/tests`, testRoutes);
app.use(`${appConfig.apiPrefix}/progress`, progressRoutes);
app.use(`${appConfig.apiPrefix}/bookmarks`, bookmarkRoutes);
app.use(`${appConfig.apiPrefix}/badges`, badgeRoutes);
app.use(`${appConfig.apiPrefix}/admin`, adminRoutes);

// Error handling
app.use(errorMiddleware);

module.exports = app;
