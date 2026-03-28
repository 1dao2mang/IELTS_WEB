// Test routes - Test listing and details endpoints
import { Router } from "express";
import { TestController } from "../controllers/test/test.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateParams, validateBody } from "../middlewares/validation.middleware";
import {
  testIdSchema,
  attemptIdSchema,
  sectionIdSchema,
  submitAnswerSchema,
} from "../utils/validators/test.validator";

const router = Router();
const testController = new TestController();

// Public routes
router.get("/", testController.getAllTests.bind(testController));
router.get(
  "/:testId",
  validateParams(testIdSchema),
  testController.getTestById.bind(testController)
);
router.get(
  "/:testId/sections",
  validateParams(testIdSchema),
  testController.getTestSections.bind(testController)
);
router.get(
  "/sections/:sectionId/questions",
  validateParams(sectionIdSchema),
  testController.getSectionQuestions.bind(testController)
);

// Protected routes
router.post(
  "/:testId/start",
  authMiddleware,
  validateParams(testIdSchema),
  testController.startTest.bind(testController)
);
router.post(
  "/attempts/:attemptId/answers",
  authMiddleware,
  validateParams(attemptIdSchema),
  validateBody(submitAnswerSchema),
  testController.submitAnswer.bind(testController)
);
router.post(
  "/attempts/:attemptId/submit",
  authMiddleware,
  validateParams(attemptIdSchema),
  testController.submitTest.bind(testController)
);
router.get(
  "/attempts/:attemptId",
  authMiddleware,
  validateParams(attemptIdSchema),
  testController.getAttemptResult.bind(testController)
);

export default router;

