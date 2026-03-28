// Speaking routes - Speaking practice and recording endpoints
import { Router } from "express";
import { SpeakingTopicController } from "../controllers/speaking/speaking-topic.controller";
import { SpeakingRecordController } from "../controllers/speaking/speaking-record.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateBody, validateParams } from "../middlewares/validation.middleware";
import {
  createAttemptSchema,
  attemptIdParamSchema,
} from "../utils/validation/speaking.validation";

const router = Router();
const topicController = new SpeakingTopicController();
const recordController = new SpeakingRecordController();

// Public routes - Topics
router.get("/topics", (req, res, next) =>
  topicController.getAllTopics(req, res, next)
);
router.get("/topics/:topicId/prompts", (req, res, next) =>
  topicController.getPrompts(req, res, next)
);

// Protected routes - Speaking Attempts
router.post(
  "/attempts",
  authMiddleware,
  validateBody(createAttemptSchema),
  (req, res, next) => recordController.createAttempt(req, res, next)
);

router.post(
  "/attempts/:id/upload",
  authMiddleware,
  validateParams(attemptIdParamSchema),
  (req, res, next) => {
    recordController.uploadMiddleware(req, res, (err) => {
      if (err) return next(err);
      recordController.uploadRecording(req, res, next);
    });
  }
);

router.get(
  "/attempts/:id",
  authMiddleware,
  validateParams(attemptIdParamSchema),
  (req, res, next) => recordController.getRecording(req, res, next)
);

// Legacy routes (for backward compatibility)
router.get(
  "/recordings/:recordingId/feedback",
  authMiddleware,
  (req, res, next) => recordController.getFeedback(req, res, next)
);

export default router;
