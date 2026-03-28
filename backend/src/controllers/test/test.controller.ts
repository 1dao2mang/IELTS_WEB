// Test Controller - Handle test operations
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class TestController {
  // GET /api/tests
  async getAllTests(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, difficulty, skillId, page = "1", limit = "10" } = req.query;

      const where: any = {};
      if (type) where.type = type;
      if (difficulty) where.difficulty = difficulty;

      // Filter by skillId - tests that have sections with this skill
      if (skillId) {
        where.testSections = {
          some: {
            skillId: Number(skillId),
          },
        };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [tests, total] = await Promise.all([
        prisma.test.findMany({
          where,
          skip,
          take: Number(limit),
          include: { testSections: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.test.count({ where }),
      ]);

      // Disable cache for debugging
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
      res.set("Pragma", "no-cache");
      res.set("Expires", "0");

      return res.json({
        success: true,
        data: {
          tests,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/tests/:testId
  async getTestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId } = req.params;

      const test = await prisma.test.findUnique({
        where: { id: BigInt(testId) },
        include: {
          testSections: {
            include: {
              passages: true,
              audioFiles: true,
              writingTasks: true,
              questionGroups: {
                include: {
                  questions: {
                    include: { questionOptions: true },
                  },
                },
              },
            },
          },
        },
      });

      if (!test) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Test not found" },
        });
      }

      return res.json({ success: true, data: test });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/tests/:testId/sections
  async getTestSections(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId } = req.params;

      const sections = await prisma.testSection.findMany({
        where: { testId: BigInt(testId) },
        include: {
          passages: true,
          audioFiles: true,
          writingTasks: true,
          questionGroups: {
            include: {
              questions: {
                include: {
                  questionOptions: true,
                },
              },
            },
          },
        },
        orderBy: { sectionIndex: "asc" },
      });

      return res.json({ success: true, data: sections });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/tests/sections/:sectionId/questions
  async getSectionQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const { sectionId } = req.params;

      const section = await prisma.testSection.findUnique({
        where: { id: BigInt(sectionId) },
        include: {
          passages: true,
          questionGroups: {
            include: {
              questions: {
                include: {
                  questionOptions: true,
                },
                orderBy: { questionIndex: "asc" },
              },
            },
          },
        },
      });

      if (!section) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Section not found" },
        });
      }

      return res.json({ success: true, data: section });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/tests/:testId/start
  async startTest(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId } = req.params;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      const test = await prisma.test.findUnique({
        where: { id: BigInt(testId) },
      });

      if (!test) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Test not found" },
        });
      }

      const attempt = await prisma.testAttempt.create({
        data: {
          userId: BigInt(userId),
          testId: BigInt(testId),
          skillId: 1, // Default skill
          startedAt: new Date(),
          status: "in_progress",
        },
      });

      return res.status(201).json({
        success: true,
        message: "Test started successfully",
        data: {
          attemptId: Number(attempt.id),
          testId: Number(attempt.testId),
          startedAt: attempt.startedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/tests/attempts/:attemptId
  async getAttemptResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { attemptId } = req.params;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      const attempt = await prisma.testAttempt.findFirst({
        where: { id: BigInt(attemptId), userId: BigInt(userId) },
        include: {
          test: true,
          questionAttempts: { include: { question: true } },
        },
      });

      if (!attempt) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Test attempt not found" },
        });
      }

      return res.json({ success: true, data: attempt });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/tests/attempts/:attemptId/answers
  async submitAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const { attemptId } = req.params;
      const { questionId, question_id, answer } = req.body;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      // Support both camelCase and snake_case
      const qId = questionId || question_id;

      console.log("📝 Submit Answer Request:", {
        attemptId,
        questionId: qId,
        answer,
        body: req.body,
      });

      // Validate input
      if (!qId || !answer) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "questionId and answer are required",
          },
        });
      }

      // Verify attempt belongs to user
      const attempt = await prisma.testAttempt.findFirst({
        where: { id: BigInt(attemptId), userId: BigInt(userId) },
      });

      if (!attempt) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Test attempt not found" },
        });
      }

      // Check if answer already exists
      const existing = await prisma.questionAttempt.findFirst({
        where: {
          testAttemptId: BigInt(attemptId),
          questionId: BigInt(qId),
        },
      });

      let questionAttempt;
      if (existing) {
        // Update existing answer
        questionAttempt = await prisma.questionAttempt.update({
          where: { id: existing.id },
          data: { userAnswer: answer },
        });
      } else {
        // Create new answer
        questionAttempt = await prisma.questionAttempt.create({
          data: {
            testAttemptId: BigInt(attemptId),
            questionId: BigInt(qId),
            userAnswer: answer,
          },
        });
      }

      return res.json({
        success: true,
        message: "Answer saved successfully",
        data: {
          id: questionAttempt.id.toString(),
          testAttemptId: questionAttempt.testAttemptId.toString(),
          questionId: questionAttempt.questionId.toString(),
          userAnswer: questionAttempt.userAnswer,
          isCorrect: questionAttempt.isCorrect,
          scoreObtained: questionAttempt.scoreObtained?.toString() || null,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/tests/attempts/:attemptId/submit
  async submitTest(req: Request, res: Response, next: NextFunction) {
    try {
      const { attemptId } = req.params;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: { code: "UNAUTHORIZED", message: "User not authenticated" },
        });
      }

      // Get attempt with all answers
      const attempt = await prisma.testAttempt.findFirst({
        where: { id: BigInt(attemptId), userId: BigInt(userId) },
        include: {
          questionAttempts: {
            include: {
              question: {
                include: {
                  questionAnswers: true,
                  questionOptions: true,
                },
              },
            },
          },
        },
      });

      if (!attempt) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Test attempt not found" },
        });
      }

      // Calculate score
      let correctAnswers = 0;
      let totalQuestions = attempt.questionAttempts.length;

      for (const qa of attempt.questionAttempts) {
        const correctAnswer = qa.question.questionAnswers[0]?.answerText;
        if (qa.userAnswer === correctAnswer) {
          correctAnswers++;
          // Update isCorrect field
          await prisma.questionAttempt.update({
            where: { id: qa.id },
            data: { isCorrect: true },
          });
        } else {
          await prisma.questionAttempt.update({
            where: { id: qa.id },
            data: { isCorrect: false },
          });
        }
      }

      const score =
        totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

      // Update attempt
      const updatedAttempt = await prisma.testAttempt.update({
        where: { id: BigInt(attemptId) },
        data: {
          completedAt: new Date(),
          status: "completed",
          totalScore: score,
        },
      });

      return res.json({
        success: true,
        message: "Test submitted successfully",
        data: {
          attemptId: updatedAttempt.id.toString(),
          score: score,
          correctAnswers,
          totalQuestions,
          completedAt: updatedAttempt.completedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
