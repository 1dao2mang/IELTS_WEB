// Statistics Controller - Handle overall statistics

const prisma = require("../../config/database.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

class StatisticsController {
  // GET /api/progress/statistics
  getStatistics = catchAsync(async (req, res, next) => {
    const userId = BigInt((req).user?.id || 1);

    const totalAttempts = await prisma.testAttempt.count({
      where: { userId },
    });

    const completedAttempts = await prisma.testAttempt.count({
      where: { userId, status: "completed" },
    });

    return res.json({
      success: true,
      data: {
        totalAttempts,
        completedAttempts,
        averageScore: 0,
        studyStreak: 0,
      },
    });
  });
}

module.exports = { StatisticsController };
