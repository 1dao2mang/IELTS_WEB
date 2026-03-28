// Badge routes - Badge and gamification endpoints
import { Router } from "express";
import { BadgeController } from "../controllers/badge/badge.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

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

export default router;
