// User routes - User profile management
import { Router } from "express";
import { UserProfileController } from "../controllers/user/user-profile.controller";
import { UserProgressController } from "../controllers/user/user-progress.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validation.middleware";
import { updateProfileSchema } from "../utils/validators/user.validator";

const router = Router();
const userController = new UserProfileController();
const progressController = new UserProgressController();

// All user routes require authentication

// Profile routes
router.get("/profile", authMiddleware, (req, res, next) =>
  userController.getProfile(req, res, next)
);
router.put(
  "/profile",
  authMiddleware,
  validateBody(updateProfileSchema),
  (req, res, next) => userController.updateProfile(req, res, next)
);
router.post("/avatar", authMiddleware, (req, res, next) =>
  userController.uploadAvatar(req, res, next)
);

// Progress routes
router.get("/progress", authMiddleware, (req, res, next) =>
  progressController.getProgress(req, res, next)
);
router.get("/progress/skills/:skillId", authMiddleware, (req, res, next) =>
  progressController.getSkillProgress(req, res, next)
);

// Attempts routes
router.get("/attempts", authMiddleware, (req, res, next) =>
  progressController.getAttempts(req, res, next)
);
router.get("/attempts/recent", authMiddleware, (req, res, next) =>
  progressController.getRecentAttempts(req, res, next)
);

export default router;
