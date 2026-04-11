// Badge Controller - Handle badge operations

const prisma = require("../../config/database.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

class BadgeController {
  // GET /api/badges
  getAllBadges = catchAsync(async (_req, res, next) => {
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
  getUserBadges = catchAsync(async (req, res, next) => {
    const userId = BigInt((req).user?.id || 1);

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

module.exports = { BadgeController };
