// Express App Setup
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { appConfig } from "./config/app.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";
import { DatabaseHealthService } from "./services/database/health.service";

// Import routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import listeningRoutes from "./routes/listening.routes";
import readingRoutes from "./routes/reading.routes";
import writingRoutes from "./routes/writing.routes";
import speakingRoutes from "./routes/speaking.routes";
import testRoutes from "./routes/test.routes";
import progressRoutes from "./routes/progress.routes";
import bookmarkRoutes from "./routes/bookmark.routes";
import badgeRoutes from "./routes/badge.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

// BigInt serialization fix
(BigInt.prototype as any).toJSON = function () {
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
app.get("/health", async (_req: express.Request, res: express.Response) => {
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
app.get("/metrics", async (_req: express.Request, res: express.Response) => {
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

export default app;
