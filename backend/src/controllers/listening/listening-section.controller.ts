// Listening Section Controller - Get listening section details
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class ListeningSectionController {
  // GET /api/listening/sections/:sectionId
  async getSectionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { sectionId } = req.params;

      const section = await prisma.testSection.findFirst({
        where: {
          id: BigInt(sectionId),
        },
        include: {
          questionGroups: {
            include: {
              questions: true,
            },
          },
        },
      });

      if (!section) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Không tìm thấy section" },
        });
      }

      return res.json({
        success: true,
        data: {
          id: Number(section.id),
          title: section.title,
          instructions: section.instructions,
          sectionIndex: section.sectionIndex,
          questionGroups: section.questionGroups.map((qg: any) => ({
            id: Number(qg.id),
            groupTitle: qg.groupTitle,
            questions: qg.questions.map((q: any) => ({
              id: Number(q.id),
              questionType: q.questionType,
              prompt: q.prompt,
              questionIndex: q.questionIndex,
            })),
          })),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/listening/attempts/start
  async startAttempt(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = BigInt((req as any).user?.id || 1);
      const { testId } = req.body;

      const attempt = await prisma.testAttempt.create({
        data: {
          userId,
          testId: BigInt(testId),
          skillId: 1, // 1 for listening
          status: "in_progress",
          startedAt: new Date(),
        },
      });

      return res.json({
        success: true,
        message: "Bắt đầu làm bài listening",
        data: {
          attemptId: Number(attempt.id),
          startedAt: attempt.startedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/listening/attempts/:attemptId/submit
  async submitAttempt(req: Request, res: Response, next: NextFunction) {
    try {
      const { attemptId } = req.params;
      const { answers } = req.body;

      // Update attempt status
      const attempt = await prisma.testAttempt.update({
        where: { id: BigInt(attemptId) },
        data: {
          status: "completed",
          completedAt: new Date(),
        },
      });

      // TODO: Calculate score based on answers
      console.log("Answers received:", answers);

      return res.json({
        success: true,
        message: "Nộp bài thành công",
        data: {
          attemptId: Number(attempt.id),
          completedAt: attempt.completedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/listening/attempts/:attemptId/result
  async getResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { attemptId } = req.params;

      const attempt = await prisma.testAttempt.findUnique({
        where: { id: BigInt(attemptId) },
        include: {
          test: true,
        },
      });

      if (!attempt) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Không tìm thấy attempt" },
        });
      }

      return res.json({
        success: true,
        data: {
          attemptId: Number(attempt.id),
          status: attempt.status,
          score: attempt.totalScore ? Number(attempt.totalScore) : null,
          startedAt: attempt.startedAt,
          completedAt: attempt.completedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
