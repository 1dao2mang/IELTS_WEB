// Attempt History Controller - Handle attempt history

const prisma = require("../../config/database.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

class AttemptHistoryController {
  // GET /api/progress/history
  getHistory = catchAsync(async (req, res, next) => {
    const userId = BigInt((req).user?.id || 1);

    const attempts = await prisma.testAttempt.findMany({
      where: { userId },
      include: { test: true },
      orderBy: { startedAt: "desc" },
    });

    return res.json({
      success: true,
      data: attempts.map((a) => ({
        id: Number(a.id),
        testId: Number(a.testId),
        testTitle: a.test.title,
        status: a.status,
        score: a.totalScore,
        startedAt: a.startedAt,
        completedAt: a.completedAt,
      })),
    });
  });
}

module.exports = { AttemptHistoryController };
