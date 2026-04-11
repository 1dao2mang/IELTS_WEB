// Admin routes - Admin management endpoints
const { Router } = require("express");
const { TestManagementController } = require("../controllers/admin/test-management.controller");
const { AdminUserManagementController } = require("../controllers/admin/user-management.controller");
const { ContentManagementController } = require("../controllers/admin/content-management.controller");
const { AdminDashboardController } = require("../controllers/admin/admin-dashboard.controller");
const { AIEvaluationController } = require("../controllers/admin/ai-evaluation.controller");
const { SpeakingContentController } = require("../controllers/admin/speaking-content.controller");
const { BadgeManagementController } = require("../controllers/admin/badge-management.controller");
const { debugPDFStructure, analyzePDFContent, importPDFToDatabase } = require("../controllers/admin/pdf-import.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");

const router = Router();
const testMgmtController = new TestManagementController();
const userMgmtController = new AdminUserManagementController();
const contentMgmtController = new ContentManagementController();
const dashboardController = new AdminDashboardController();
const aiController = new AIEvaluationController();
const speakingContentController = new SpeakingContentController();
const badgeController = new BadgeManagementController();

// All admin routes require authentication and admin role
const adminOnly = [authMiddleware, roleMiddleware(["admin", "instructor"])];

// ========== Dashboard ==========
router.get("/dashboard/stats", adminOnly, (req, res, next) =>
dashboardController.getStats(req, res, next)
);
router.get("/dashboard/charts", adminOnly, (req, res, next) =>
  dashboardController.getCharts(req, res, next)
);

// ========== User Management ==========
router.get("/users", adminOnly, (req, res, next) =>
  userMgmtController.getAllUsers(req, res, next)
);
router.get("/users/:userId", adminOnly, (req, res, next) =>
  userMgmtController.getUserDetail(req, res, next)
);
router.post("/users", adminOnly, (req, res, next) =>
  userMgmtController.createUser(req, res, next)
);
router.patch("/users/:userId", adminOnly, (req, res, next) =>
  userMgmtController.updateUser(req, res, next)
);
router.patch("/users/:userId/status", adminOnly, (req, res, next) =>
  userMgmtController.updateUserStatus(req, res, next)
);
router.delete("/users/:userId", adminOnly, (req, res, next) =>
  userMgmtController.deleteUser(req, res, next)
);
router.get("/users/:userId/activity", adminOnly, (req, res, next) =>
  userMgmtController.getUserActivity(req, res, next)
);

// ========== Test Management ==========
router.get("/tests", adminOnly, (req, res, next) =>
  testMgmtController.getAllTests(req, res, next)
);
router.post("/tests", adminOnly, (req, res, next) =>
  testMgmtController.createTest(req, res, next)
);
router.put("/tests/:testId", adminOnly, (req, res, next) =>
  testMgmtController.updateTest(req, res, next)
);
router.delete("/tests/:testId", adminOnly, (req, res, next) =>
  testMgmtController.deleteTest(req, res, next)
);

// ========== Content Management ==========
router.post("/questions", adminOnly, (req, res, next) =>
  contentMgmtController.createQuestion(req, res, next)
);
router.put("/questions/:questionId", adminOnly, (req, res, next) =>
  contentMgmtController.updateQuestion(req, res, next)
);
router.delete("/questions/:questionId", adminOnly, (req, res, next) =>
  contentMgmtController.deleteQuestion(req, res, next)
);

// ========== Speaking Content ==========
router.get("/speaking/topics", adminOnly, (req, res, next) =>
  speakingContentController.getAllTopics(req, res, next)
);
router.post("/speaking/topics", adminOnly, (req, res, next) =>
  speakingContentController.createTopic(req, res, next)
);
router.put("/speaking/topics/:topicId", adminOnly, (req, res, next) =>
  speakingContentController.updateTopic(req, res, next)
);
router.delete("/speaking/topics/:topicId", adminOnly, (req, res, next) =>
  speakingContentController.deleteTopic(req, res, next)
);
router.get("/speaking/prompts", adminOnly, (req, res, next) =>
  speakingContentController.getAllPrompts(req, res, next)
);
router.post("/speaking/prompts", adminOnly, (req, res, next) =>
  speakingContentController.createPrompt(req, res, next)
);
router.put("/speaking/prompts/:promptId", adminOnly, (req, res, next) =>
  speakingContentController.updatePrompt(req, res, next)
);
router.delete("/speaking/prompts/:promptId", adminOnly, (req, res, next) =>
  speakingContentController.deletePrompt(req, res, next)
);

// ========== AI Evaluation Monitoring ==========
router.get("/ai/usage", adminOnly, (req, res, next) =>
  aiController.getUsage(req, res, next)
);
router.get("/ai/evaluations", adminOnly, (req, res, next) =>
  aiController.getEvaluations(req, res, next)
);
router.post("/ai/reprocess/:attemptId", adminOnly, (req, res, next) =>
  aiController.reprocess(req, res, next)
);
router.get("/ai/config", adminOnly, (req, res, next) =>
  aiController.getConfig(req, res, next)
);

// ========== Badge Management ==========
router.get("/badges", adminOnly, (req, res, next) =>
  badgeController.getAllBadges(req, res, next)
);
router.post("/badges", adminOnly, (req, res, next) =>
  badgeController.createBadge(req, res, next)
);
router.put("/badges/:badgeId", adminOnly, (req, res, next) =>
  badgeController.updateBadge(req, res, next)
);
router.delete("/badges/:badgeId", adminOnly, (req, res, next) =>
  badgeController.deleteBadge(req, res, next)
);
router.post("/badges/award", adminOnly, (req, res, next) =>
  badgeController.awardBadge(req, res, next)
);

// ========== PDF Import (Development Tools) ==========
router.get("/pdf/debug", adminOnly, debugPDFStructure);
router.get("/pdf/analyze", adminOnly, analyzePDFContent);
router.post("/pdf/import", adminOnly, importPDFToDatabase);

module.exports = router;
