// Statistics Controller - Handle overall statistics
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";
import { catchAsync } from "../../utils/helpers/catch-async.helper";

export class StatisticsController {
  // GET /api/progress/statistics
  getStatistics = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = BigInt((req as any).user?.id || 1);

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
