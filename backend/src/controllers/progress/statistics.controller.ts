// Statistics Controller - Handle overall statistics
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class StatisticsController {
  // GET /api/progress/statistics
  async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      return next(error);
    }
  }
}
