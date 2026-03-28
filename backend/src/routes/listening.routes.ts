// Listening routes - Listening practice endpoints
import { Router } from "express";
import { ListeningSectionController } from "../controllers/listening/listening-section.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const listeningController = new ListeningSectionController();

// Public routes
router.get("/sections/:sectionId", (req, res, next) =>
  listeningController.getSectionById(req, res, next)
);

// Protected routes
router.post("/attempts/start", authMiddleware, (req, res, next) =>
  listeningController.startAttempt(req, res, next)
);
router.post("/attempts/:attemptId/submit", authMiddleware, (req, res, next) =>
  listeningController.submitAttempt(req, res, next)
);
router.get("/attempts/:attemptId/result", authMiddleware, (req, res, next) =>
  listeningController.getResult(req, res, next)
);

export default router;
