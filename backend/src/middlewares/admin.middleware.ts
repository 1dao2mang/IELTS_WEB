// Admin Middleware - Check for admin role
import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const adminMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      });
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Admin access required",
        },
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: "AUTH_ERROR",
        message: "Authorization error",
      },
    });
  }
};
