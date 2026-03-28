// User Profile Controller - Handle user profile operations
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class UserProfileController {
  // GET /api/users/profile
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id);

      if (!userId || isNaN(Number(userId))) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "User not found" },
        });
      }

      res.json({
        success: true,
        data: {
          id: Number(user.id),
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          fullName: user.profile?.fullName,
          avatarUrl: user.profile?.avatarUrl,
          country: user.profile?.country,
          targetBand: user.profile?.targetBand
            ? Number(user.profile.targetBand)
            : null,
          bio: user.profile?.bio,
          dateOfBirth: user.profile?.dateOfBirth,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // PUT /api/users/profile
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id);

      if (!userId || isNaN(Number(userId))) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      const { fullName, bio, targetBand, country, dateOfBirth } = req.body;

      const profile = await prisma.userProfile.upsert({
        where: { userId },
        update: {
          fullName,
          bio,
          targetBand: targetBand ? Number(targetBand) : undefined,
          country,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        },
        create: {
          userId,
          fullName,
          bio,
          targetBand: targetBand ? Number(targetBand) : undefined,
          country,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        },
      });

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          userId: Number(profile.userId),
          fullName: profile.fullName,
          bio: profile.bio,
          targetBand: profile.targetBand ? Number(profile.targetBand) : null,
          country: profile.country,
          dateOfBirth: profile.dateOfBirth,
          avatarUrl: profile.avatarUrl,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/users/avatar
  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id);

      if (!userId || isNaN(Number(userId))) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      // TODO: Implement actual file upload logic with multer
      const avatarUrl = "https://example.com/avatars/user-" + userId + ".jpg";

      await prisma.userProfile.upsert({
        where: { userId },
        update: { avatarUrl },
        create: { userId, avatarUrl },
      });

      res.json({
        success: true,
        message: "Avatar uploaded successfully",
        data: { avatarUrl },
      });
    } catch (error) {
      return next(error);
    }
  }
}
