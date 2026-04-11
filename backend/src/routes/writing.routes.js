// Writing routes - Writing practice and submission endpoints
const { Router } = require("express");
const { WritingTaskController } = require("../controllers/writing/writing-task.controller");
const { WritingSubmissionController } = require("../controllers/writing/writing-submission.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { validateParams } = require("../middlewares/validation.middleware");
const { z } = require("zod");

const router = Router();
const taskController = new WritingTaskController();
const submissionController = new WritingSubmissionController();

// Validation schemas
const taskIdSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
});

const submissionIdSchema = z.object({
  submissionId: z.string().min(1, "Submission ID is required"),
});

// Public routes
router.get("/tasks", (req, res, next) =>
  taskController.getTasks(req, res, next)
);

router.get(
  "/tasks/:taskId",
  validateParams(taskIdSchema),
  (req, res, next) => taskController.getTaskById(req, res, next)
);

// Protected routes
router.post(
  "/submissions/submit",
  authMiddleware,
  (req, res, next) => submissionController.submitWriting(req, res, next)
);

router.get(
  "/submissions/:submissionId",
  authMiddleware,
  validateParams(submissionIdSchema),
  (req, res, next) => submissionController.getSubmission(req, res, next)
);

router.get(
  "/submissions/:submissionId/feedback",
  authMiddleware,
  validateParams(submissionIdSchema),
  (req, res, next) => submissionController.getFeedback(req, res, next)
);

// POST /api/writing/submissions/:submissionId/evaluate - Manually trigger AI evaluation
router.post(
  "/submissions/:submissionId/evaluate",
  authMiddleware,
  validateParams(submissionIdSchema),
  (req, res, next) => submissionController.triggerEvaluation(req, res, next)
);

module.exports = router;
