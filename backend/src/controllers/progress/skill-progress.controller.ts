// Skill Progress Controller - Handle skill-specific progress
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class SkillProgressController {
  // GET /api/progress/overview
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);

      const attempts = await prisma.testAttempt.findMany({
        where: { userId },
        include: { test: true },
        orderBy: { startedAt: "desc" },
        take: 10,
      });

      return res.json({
        success: true,
        data: {
          totalAttempts: attempts.length,
          recentAttempts: attempts.map((a) => ({
            id: Number(a.id),
            testTitle: a.test.title,
            score: a.totalScore,
            completedAt: a.completedAt,
          })),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/progress/skills/:skillId
  async getSkillProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { skillId } = req.params;

      return res.json({
        success: true,
        data: {
          skillId,
          progress: 0,
          message: "Feature coming soon",
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
