// Auth routes - Authentication endpoints
const { Router } = require("express");
const { AuthController } = require("../controllers/auth/auth.controller");
const { authMiddleware, AuthRequest } = require("../middlewares/auth.middleware");
const { validateBody } = require("../middlewares/validation.middleware");
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require("../utils/validators/auth.validator");

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

router.post("/logout", authMiddleware, (req, res, next) =>
  authController.logout(req, res, next)
);
router.get("/me", authMiddleware, (req, res, next) =>
  authController.getCurrentUser(req, res, next)
);

module.exports = router;
