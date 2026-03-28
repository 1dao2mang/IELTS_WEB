// Badge Controller - Handle badge operations
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class BadgeController {
  // GET /api/badges
  async getAllBadges(_req: Request, res: Response, next: NextFunction) {
    try {
      const badges = await prisma.badge.findMany();

      return res.json({
        success: true,
        data: badges.map((b) => ({
          id: Number(b.id),
          name: b.name,
          description: b.description,
          iconUrl: b.iconUrl,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/badges/user
  async getUserBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);

      const userBadges = await prisma.userBadge.findMany({
        where: { userId },
        include: { badge: true },
      });

      return res.json({
        success: true,
        data: userBadges.map((ub) => ({
          id: Number(ub.badge.id),
          name: ub.badge.name,
          description: ub.badge.description,
          iconUrl: ub.badge.iconUrl,
          earnedAt: ub.earnedAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }
}
