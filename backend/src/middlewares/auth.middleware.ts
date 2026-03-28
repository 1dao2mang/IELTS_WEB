// Auth Middleware - JWT authentication
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";
import prisma from "../config/database.config";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: {
          code: "MISSING_TOKEN",
          message: "Access token is required",
        },
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify JWT token
    const decoded = jwt.verify(token, jwtConfig.accessTokenSecret) as any;

    // Fetch user from database to ensure they still exist
    const user = await prisma.user.findUnique({
      where: { id: BigInt(decoded.userId) },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });
    }

    req.user = {
      id: user.id.toString(),
      email: user.email,
      role: user.role,
    };
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          code: "TOKEN_EXPIRED",
          message: "Access token has expired",
        },
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "Invalid access token",
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        code: "AUTH_ERROR",
        message: "Authentication error",
      },
    });
  }
};
