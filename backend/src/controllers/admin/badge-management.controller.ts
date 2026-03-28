// Badge Management Controller - Manage badge system
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class BadgeManagementController {
  /**
   * GET /api/admin/badges
   * List all badges
   */
  async getAllBadges(_req: Request, res: Response, next: NextFunction) {
    try {
      const badges = await prisma.badge.findMany({
        include: {
          _count: {
            select: { userBadges: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return res.json({
        success: true,
        data: badges.map((b) => ({
          id: Number(b.id),
          name: b.name,
          description: b.description,
          iconUrl: b.iconUrl,
          code: b.code,
          awardedCount: b._count.userBadges,
          createdAt: b.createdAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/admin/badges
   * Create new badge
   */
  async createBadge(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, iconUrl, code } = req.body;

      const badge = await prisma.badge.create({
        data: {
          name,
          description,
          iconUrl,
          code,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Badge created successfully",
        data: {
          id: Number(badge.id),
          name: badge.name,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * PUT /api/admin/badges/:badgeId
   * Update badge
   */
  async updateBadge(req: Request, res: Response, next: NextFunction) {
    try {
      const { badgeId } = req.params;
      const { name, description, iconUrl, code } = req.body;

      const badge = await prisma.badge.update({
        where: { id: BigInt(badgeId) },
        data: { name, description, iconUrl, code },
      });

      return res.json({
        success: true,
        message: "Badge updated successfully",
        data: {
          id: Number(badge.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * DELETE /api/admin/badges/:badgeId
   * Delete badge
   */
  async deleteBadge(req: Request, res: Response, next: NextFunction) {
    try {
      const { badgeId } = req.params;

      await prisma.badge.delete({
        where: { id: BigInt(badgeId) },
      });

      return res.json({
        success: true,
        message: "Badge deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/admin/badges/award
   * Manually award badge to user
   */
  async awardBadge(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, badgeId } = req.body;

      // Check if already awarded
      const existing = await prisma.userBadge.findFirst({
        where: {
          userId: BigInt(userId),
          badgeId: BigInt(badgeId),
        },
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          error: {
            code: "ALREADY_AWARDED",
            message: "User already has this badge",
          },
        });
      }

      const userBadge = await prisma.userBadge.create({
        data: {
          userId: BigInt(userId),
          badgeId: BigInt(badgeId),
        },
        include: {
          badge: true,
          user: {
            select: { email: true },
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "Badge awarded successfully",
        data: {
          userEmail: userBadge.user.email,
          badgeName: userBadge.badge.name,
          earnedAt: userBadge.earnedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
