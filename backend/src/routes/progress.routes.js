// Progress routes - Progress tracking and statistics endpoints
const { Router } = require("express");
const { SkillProgressController } = require("../controllers/progress/skill-progress.controller");
const { StatisticsController } = require("../controllers/progress/statistics.controller");
const { AttemptHistoryController } = require("../controllers/progress/attempt-history.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

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

module.exports = router;
