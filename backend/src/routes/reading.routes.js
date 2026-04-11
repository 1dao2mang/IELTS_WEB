// Reading routes - Reading practice endpoints
const { Router } = require("express");
const { ReadingSectionController } = require("../controllers/reading/reading-section.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();
const readingController = new ReadingSectionController();

// Public routes
router.get("/sections/:sectionId", (req, res, next) =>
  readingController.getSectionById(req, res, next)
);

// Protected routes
router.post("/attempts/start", authMiddleware, (req, res, next) =>
  readingController.startAttempt(req, res, next)
);
router.post("/attempts/:attemptId/submit", authMiddleware, (req, res, next) =>
  readingController.submitAttempt(req, res, next)
);
router.get("/attempts/:attemptId/result", authMiddleware, (req, res, next) =>
  readingController.getResult(req, res, next)
);

module.exports = router;
