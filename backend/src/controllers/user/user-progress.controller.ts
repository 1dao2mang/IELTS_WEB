// User Progress Controller - Handle user study progress and attempt history
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class UserProgressController {
  // GET /api/users/progress
  async getProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);

      // Get all test attempts
      const attempts = await prisma.testAttempt.findMany({
        where: { userId },
        include: {
          skill: true,
          test: true,
        },
        orderBy: { completedAt: "desc" },
      });

      // Calculate statistics
      const totalAttempts = attempts.length;
      const completedAttempts = attempts.filter(
        (a) => a.status === "completed"
      );
      const completedCount = completedAttempts.length;

      // Calculate average score
      const scoresWithValues = completedAttempts.filter((a) => a.totalScore);
      const averageScore =
        scoresWithValues.length > 0
          ? scoresWithValues.reduce((sum, a) => sum + Number(a.totalScore), 0) /
            scoresWithValues.length
          : 0;

      // Calculate study time in minutes
      const studyTimeMinutes = completedAttempts.reduce((total, attempt) => {
        if (attempt.completedAt && attempt.startedAt) {
          const diff =
            attempt.completedAt.getTime() - attempt.startedAt.getTime();
          return total + diff / (1000 * 60); // Convert ms to minutes
        }
        return total;
      }, 0);

      // Calculate trend
      let trend: "up" | "down" | "stable" = "stable";
      if (completedAttempts.length > 1) {
        const lastScore = Number(completedAttempts[0].totalScore || 0);
        const previousScores = completedAttempts
          .slice(1)
          .filter((a) => a.totalScore)
          .map((a) => Number(a.totalScore));

        if (previousScores.length > 0) {
          const previousAvg =
            previousScores.reduce((sum, s) => sum + s, 0) /
            previousScores.length;
          const diff = lastScore - previousAvg;
          if (diff > 2) trend = "up";
          else if (diff < -2) trend = "down";
        }
      }

      // Get last score
      const lastScore =
        completedAttempts.length > 0
          ? Number(completedAttempts[0].totalScore || 0)
          : null;

      // Calculate skills breakdown
      const skillsMap = new Map<number, any>();
      completedAttempts.forEach((attempt) => {
        const skillId = attempt.skillId;
        if (!skillsMap.has(skillId)) {
          skillsMap.set(skillId, {
            skillId,
            skillName: attempt.skill.name,
            skillCode: attempt.skill.code,
            attempts: 0,
            averageScore: 0,
            scores: [],
          });
        }
        const skill = skillsMap.get(skillId);
        skill.attempts++;
        if (attempt.totalScore) {
          skill.scores.push(Number(attempt.totalScore));
        }
      });

      const skillsBreakdown = Array.from(skillsMap.values()).map((skill) => ({
        skillId: skill.skillId,
        skillName: skill.skillName,
        skillCode: skill.skillCode,
        attempts: skill.attempts,
        averageScore:
          skill.scores.length > 0
            ? skill.scores.reduce((a: number, b: number) => a + b, 0) /
              skill.scores.length
            : 0,
      }));

      res.json({
        success: true,
        data: {
          totalAttempts,
          completedAttempts: completedCount,
          averageScore: Math.round(averageScore * 100) / 100,
          lastScore,
          studyTimeMinutes: Math.round(studyTimeMinutes),
          trend,
          skillsBreakdown,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/users/attempts/recent?limit=10
  async getRecentAttempts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);
      const limit = parseInt(req.query.limit as string) || 10;

      const attempts = await prisma.testAttempt.findMany({
        where: { userId },
        include: {
          test: {
            select: {
              id: true,
              title: true,
              level: true,
            },
          },
          skill: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
        orderBy: { startedAt: "desc" },
        take: limit,
      });

      const data = attempts.map((attempt) => ({
        attemptId: Number(attempt.id),
        testId: Number(attempt.testId),
        testTitle: attempt.test.title,
        skillId: attempt.skillId,
        skillName: attempt.skill.name,
        skillCode: attempt.skill.code,
        status: attempt.status,
        score: attempt.totalScore ? Number(attempt.totalScore) : null,
        bandScore: attempt.bandScore ? Number(attempt.bandScore) : null,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration:
          attempt.completedAt && attempt.startedAt
            ? Math.round(
                (attempt.completedAt.getTime() - attempt.startedAt.getTime()) /
                  (1000 * 60)
              )
            : null,
      }));

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/users/progress/skills/:skillId
  async getSkillProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);
      const skillId = parseInt(req.params.skillId);

      // Get skill info
      const skill = await prisma.skill.findUnique({
        where: { id: skillId },
      });

      if (!skill) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Skill không tồn tại" },
        });
      }

      // Get attempts for this skill
      const attempts = await prisma.testAttempt.findMany({
        where: {
          userId,
          skillId,
          status: "completed",
        },
        include: {
          test: {
            select: {
              id: true,
              title: true,
              level: true,
            },
          },
        },
        orderBy: { completedAt: "desc" },
      });

      // Calculate statistics
      const totalAttempts = attempts.length;
      const scoresWithValues = attempts.filter((a) => a.totalScore);
      const averageScore =
        scoresWithValues.length > 0
          ? scoresWithValues.reduce((sum, a) => sum + Number(a.totalScore), 0) /
            scoresWithValues.length
          : 0;

      const bestScore =
        scoresWithValues.length > 0
          ? Math.max(...scoresWithValues.map((a) => Number(a.totalScore)))
          : 0;

      const latestScore =
        scoresWithValues.length > 0
          ? Number(scoresWithValues[0].totalScore)
          : 0;

      // Calculate improvement
      let improvement = 0;
      if (scoresWithValues.length >= 2) {
        const firstScore = Number(
          scoresWithValues[scoresWithValues.length - 1].totalScore
        );
        improvement = ((latestScore - firstScore) / firstScore) * 100;
      }

      // Get score history
      const scoreHistory = scoresWithValues.slice(0, 20).map((attempt) => ({
        attemptId: Number(attempt.id),
        testTitle: attempt.test.title,
        score: Number(attempt.totalScore),
        bandScore: attempt.bandScore ? Number(attempt.bandScore) : null,
        completedAt: attempt.completedAt,
      }));

      res.json({
        success: true,
        data: {
          skillId,
          skillName: skill.name,
          skillCode: skill.code,
          totalAttempts,
          averageScore: Math.round(averageScore * 100) / 100,
          bestScore,
          latestScore,
          improvement: Math.round(improvement * 100) / 100,
          scoreHistory,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/users/attempts?page=1&limit=20&skillId=2
  async getAttempts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skillId = req.query.skillId
        ? parseInt(req.query.skillId as string)
        : undefined;

      const where: any = { userId };
      if (skillId) {
        where.skillId = skillId;
      }

      const skip = (page - 1) * limit;

      const [attempts, total] = await Promise.all([
        prisma.testAttempt.findMany({
          where,
          include: {
            test: {
              select: {
                id: true,
                title: true,
                level: true,
              },
            },
            skill: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
          orderBy: { startedAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.testAttempt.count({ where }),
      ]);

      const data = attempts.map((attempt) => ({
        attemptId: Number(attempt.id),
        testId: Number(attempt.testId),
        testTitle: attempt.test.title,
        testLevel: attempt.test.level,
        skillId: attempt.skillId,
        skillName: attempt.skill.name,
        skillCode: attempt.skill.code,
        mode: attempt.mode,
        status: attempt.status,
        score: attempt.totalScore ? Number(attempt.totalScore) : null,
        bandScore: attempt.bandScore ? Number(attempt.bandScore) : null,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration:
          attempt.completedAt && attempt.startedAt
            ? Math.round(
                (attempt.completedAt.getTime() - attempt.startedAt.getTime()) /
                  (1000 * 60)
              )
            : null,
      }));

      res.json({
        success: true,
        data: {
          attempts: data,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
