// Attempt History Controller - Handle attempt history
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class AttemptHistoryController {
  // GET /api/progress/history
  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);

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
    } catch (error) {
      return next(error);
    }
  }
}
