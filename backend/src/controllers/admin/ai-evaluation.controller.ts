// AI Evaluation Controller - Monitor and configure Gemini AI
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";
import { geminiConfig } from "../../config/gemini.config";

export class AIEvaluationController {
  /**
   * GET /api/admin/ai/usage
   * Get Gemini API usage statistics
   */
  async getUsage(_req: Request, res: Response, next: NextFunction) {
    try {
      // This would ideally come from geminiKeyManager
      // For now, return mock data structure
      return res.json({
        success: true,
        data: {
          keys: [
            {
              keyNumber: 1,
              requestsToday: 15,
              quotaLimit: 20,
              remaining: 5,
              usagePercentage: 75.0,
            },
            {
              keyNumber: 2,
              requestsToday: 8,
              quotaLimit: 20,
              remaining: 12,
              usagePercentage: 40.0,
            },
            {
              keyNumber: 3,
              requestsToday: 3,
              quotaLimit: 20,
              remaining: 17,
              usagePercentage: 15.0,
            },
          ],
          totalRequests: 26,
          totalQuota: 60,
          models: {
            transcription: geminiConfig.transcriptionModel,
            scoring: geminiConfig.scoringModel,
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * GET /api/admin/ai/evaluations
   * Get recent AI evaluations with filters
   */
  async getEvaluations(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, limit = "20", page = "1" } = req.query;
      const limitNum = parseInt(limit as string);
      const skip = (parseInt(page as string) - 1) * limitNum;

      const where: any = {};
      if (status) {
        where.status = status;
      }

      const [evaluations, total] = await Promise.all([
        prisma.speakingRecord.findMany({
          where,
          include: {
            testAttempt: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                  },
                },
              },
            },
            speakingPrompt: {
              select: {
                questionText: true,
              },
            },
          },
          orderBy: { recordedAt: "desc" },
          take: limitNum,
          skip,
        }),
        prisma.speakingRecord.count({ where }),
      ]);

      return res.json({
        success: true,
        data: {
          evaluations: evaluations.map((e) => ({
            id: Number(e.id),
            userEmail: e.testAttempt.user.email,
            question: e.speakingPrompt?.questionText?.substring(0, 100),
            status: e.status,
            bandScore: e.bandScore,
            transcript: e.transcript?.substring(0, 200),
            recordedAt: e.recordedAt,
            processedAt: e.processedAt,
            errorMessage: e.errorMessage,
          })),
          pagination: {
            total,
            page: parseInt(page as string),
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
          },
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/admin/ai/reprocess/:attemptId
   * Re-run AI evaluation for a speaking attempt
   */
  async reprocess(req: Request, res: Response, next: NextFunction) {
    try {
      const { attemptId } = req.params;

      // Reset status to trigger reprocessing
      await prisma.$executeRaw`
        UPDATE speaking_records 
        SET status = 'pending', 
            error_message = NULL, 
            scores_json = NULL, 
            feedback = NULL, 
            band_score = NULL, 
            processed_at = NULL
        WHERE id = ${BigInt(attemptId)}
      `;

      return res.json({
        success: true,
        message: "AI evaluation queued for reprocessing",
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * GET /api/admin/ai/config
   * Get current AI configuration
   */
  async getConfig(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({
        success: true,
        data: {
          transcriptionModel: geminiConfig.transcriptionModel,
          scoringModel: geminiConfig.scoringModel,
          temperature: geminiConfig.temperature,
          maxOutputTokens: geminiConfig.maxOutputTokens,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
