// Badge Controller - Handle badge operations
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";
import { catchAsync } from "../../utils/helpers/catch-async.helper";

export class BadgeController {
  // GET /api/badges
  getAllBadges = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
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
  });

  // GET /api/badges/user
  getUserBadges = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
  });
}
