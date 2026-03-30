// Skill Progress Controller - Handle skill-specific progress
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";
import { catchAsync } from "../../utils/helpers/catch-async.helper";

export class SkillProgressController {
  // GET /api/progress/overview
  getOverview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
  });

  // GET /api/progress/skills/:skillId
  getSkillProgress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skillId } = req.params;

    return res.json({
      success: true,
      data: {
        skillId,
        progress: 0,
        message: "Feature coming soon",
      },
    });
  });
}
