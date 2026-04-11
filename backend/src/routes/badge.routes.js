// Badge routes - Badge and gamification endpoints
const { Router } = require("express");
const { BadgeController } = require("../controllers/badge/badge.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();
const badgeController = new BadgeController();

// Public routes
router.get("/", (req, res, next) =>
  badgeController.getAllBadges(req, res, next)
);

// Protected routes
router.get("/user", authMiddleware, (req, res, next) =>
  badgeController.getUserBadges(req, res, next)
);

module.exports = router;
