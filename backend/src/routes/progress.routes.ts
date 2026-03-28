// Progress routes - Progress tracking and statistics endpoints
import { Router } from "express";
import { SkillProgressController } from "../controllers/progress/skill-progress.controller";
import { StatisticsController } from "../controllers/progress/statistics.controller";
import { AttemptHistoryController } from "../controllers/progress/attempt-history.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const skillProgressController = new SkillProgressController();
const statisticsController = new StatisticsController();
const historyController = new AttemptHistoryController();

// All progress routes require authentication
router.get("/overview", authMiddleware, (req, res, next) =>
  skillProgressController.getOverview(req, res, next)
);
router.get("/skills/:skillId", authMiddleware, (req, res, next) =>
  skillProgressController.getSkillProgress(req, res, next)
);
router.get("/history", authMiddleware, (req, res, next) =>
  historyController.getHistory(req, res, next)
);
router.get("/statistics", authMiddleware, (req, res, next) =>
  statisticsController.getStatistics(req, res, next)
);

export default router;
