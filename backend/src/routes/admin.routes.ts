// Admin routes - Admin management endpoints
import { Router, Request, Response, NextFunction } from "express";
import { TestManagementController } from "../controllers/admin/test-management.controller";
import { AdminUserManagementController } from "../controllers/admin/user-management.controller";
import { ContentManagementController } from "../controllers/admin/content-management.controller";
import { AdminDashboardController } from "../controllers/admin/admin-dashboard.controller";
import { AIEvaluationController } from "../controllers/admin/ai-evaluation.controller";
import { SpeakingContentController } from "../controllers/admin/speaking-content.controller";
import { BadgeManagementController } from "../controllers/admin/badge-management.controller";
import {
  debugPDFStructure,
  analyzePDFContent,
  importPDFToDatabase,
} from "../controllers/admin/pdf-import.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

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
router.get("/dashboard/stats", adminOnly, (req: Request, res: Response, next: NextFunction) =>
dashboardController.getStats(req, res, next)
);
router.get("/dashboard/charts", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  dashboardController.getCharts(req, res, next)
);

// ========== User Management ==========
router.get("/users", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.getAllUsers(req, res, next)
);
router.get("/users/:userId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.getUserDetail(req, res, next)
);
router.post("/users", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.createUser(req, res, next)
);
router.patch("/users/:userId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.updateUser(req, res, next)
);
router.patch("/users/:userId/status", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.updateUserStatus(req, res, next)
);
router.delete("/users/:userId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.deleteUser(req, res, next)
);
router.get("/users/:userId/activity", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  userMgmtController.getUserActivity(req, res, next)
);

// ========== Test Management ==========
router.get("/tests", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  testMgmtController.getAllTests(req, res, next)
);
router.post("/tests", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  testMgmtController.createTest(req, res, next)
);
router.put("/tests/:testId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  testMgmtController.updateTest(req, res, next)
);
router.delete("/tests/:testId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  testMgmtController.deleteTest(req, res, next)
);

// ========== Content Management ==========
router.post("/questions", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  contentMgmtController.createQuestion(req, res, next)
);
router.put("/questions/:questionId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  contentMgmtController.updateQuestion(req, res, next)
);
router.delete("/questions/:questionId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  contentMgmtController.deleteQuestion(req, res, next)
);

// ========== Speaking Content ==========
router.get("/speaking/topics", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.getAllTopics(req, res, next)
);
router.post("/speaking/topics", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.createTopic(req, res, next)
);
router.put("/speaking/topics/:topicId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.updateTopic(req, res, next)
);
router.delete("/speaking/topics/:topicId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.deleteTopic(req, res, next)
);
router.get("/speaking/prompts", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.getAllPrompts(req, res, next)
);
router.post("/speaking/prompts", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.createPrompt(req, res, next)
);
router.put("/speaking/prompts/:promptId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.updatePrompt(req, res, next)
);
router.delete("/speaking/prompts/:promptId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  speakingContentController.deletePrompt(req, res, next)
);

// ========== AI Evaluation Monitoring ==========
router.get("/ai/usage", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  aiController.getUsage(req, res, next)
);
router.get("/ai/evaluations", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  aiController.getEvaluations(req, res, next)
);
router.post("/ai/reprocess/:attemptId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  aiController.reprocess(req, res, next)
);
router.get("/ai/config", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  aiController.getConfig(req, res, next)
);

// ========== Badge Management ==========
router.get("/badges", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  badgeController.getAllBadges(req, res, next)
);
router.post("/badges", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  badgeController.createBadge(req, res, next)
);
router.put("/badges/:badgeId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  badgeController.updateBadge(req, res, next)
);
router.delete("/badges/:badgeId", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  badgeController.deleteBadge(req, res, next)
);
router.post("/badges/award", adminOnly, (req: Request, res: Response, next: NextFunction) =>
  badgeController.awardBadge(req, res, next)
);

// ========== PDF Import (Development Tools) ==========
router.get("/pdf/debug", adminOnly, debugPDFStructure);
router.get("/pdf/analyze", adminOnly, analyzePDFContent);
router.post("/pdf/import", adminOnly, importPDFToDatabase);

export default router;
