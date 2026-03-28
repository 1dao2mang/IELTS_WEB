// Auth routes - Authentication endpoints
import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validation.middleware";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../utils/validators/auth.validator";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/register", validateBody(registerSchema), (req, res, next) =>
  authController.register(req, res, next)
);
router.post("/login", validateBody(loginSchema), (req, res, next) =>
  authController.login(req, res, next)
);
router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  (req, res, next) => authController.forgotPassword(req, res, next)
);
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  (req, res, next) => authController.resetPassword(req, res, next)
);

router.post("/logout", authMiddleware, (req: AuthRequest, res, next) =>
  authController.logout(req, res, next)
);
router.get("/me", authMiddleware, (req: AuthRequest, res, next) =>
  authController.getCurrentUser(req, res, next)
);

export default router;
