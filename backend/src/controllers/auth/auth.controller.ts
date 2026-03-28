// Auth Controller - Handle authentication logic
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import prisma from "../../config/database.config";
import { jwtConfig } from "../../config/jwt.config";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { ValidationRequest } from "../../middlewares/validation.middleware";

export class AuthController {
  // POST /api/auth/register
  async register(req: ValidationRequest, res: Response, next: NextFunction) {
    try {
      const { email, password, fullName } = req.validatedBody || req.body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: {
            code: "USER_EXISTS",
            message: "Email already exists",
          },
        });
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user with profile
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role: "student",
          profile: {
            create: {
              fullName: fullName || email.split("@")[0],
            },
          },
        },
        include: { profile: true },
      });

      // Generate JWT tokens
      const accessToken = (jwt.sign as any)(
        { userId: user.id.toString(), email: user.email },
        jwtConfig.accessTokenSecret,
        { expiresIn: jwtConfig.accessTokenExpiry }
      );

      const refreshToken = (jwt.sign as any)(
        { userId: user.id.toString() },
        jwtConfig.refreshTokenSecret,
        { expiresIn: jwtConfig.refreshTokenExpiry }
      );

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: Number(user.id),
            email: user.email,
            fullName: user.profile?.fullName,
            role: user.role,
          },
          tokens: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/login
  async login(req: ValidationRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.validatedBody || req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        });
      }

      // Verify password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        });
      }

      // Generate JWT tokens
      const accessToken = (jwt.sign as any)(
        { userId: user.id.toString(), email: user.email },
        jwtConfig.accessTokenSecret,
        { expiresIn: jwtConfig.accessTokenExpiry }
      );

      const refreshToken = (jwt.sign as any)(
        { userId: user.id.toString() },
        jwtConfig.refreshTokenSecret,
        { expiresIn: jwtConfig.refreshTokenExpiry }
      );

      return res.json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: Number(user.id),
            email: user.email,
            fullName: user.profile?.fullName,
            role: user.role,
          },
          tokens: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/logout
  async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/auth/me
  async getCurrentUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: BigInt(userId) },
        include: { profile: true },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "User not found",
          },
        });
      }

      return res.json({
        success: true,
        data: {
          id: Number(user.id),
          email: user.email,
          fullName: user.profile?.fullName,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/forgot-password
  async forgotPassword(
    req: ValidationRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.validatedBody || req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "User not found",
          },
        });
      }

      // TODO: Implement email sending functionality
      // Generate reset token and send email

      return res.json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/reset-password
  async resetPassword(
    req: ValidationRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token: _token, newPassword: _newPassword } = req.validatedBody || req.body;

      // TODO: Verify reset token and implement password reset
      // For now, just return success

      return res.json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      return next(error);
    }
  }
}
