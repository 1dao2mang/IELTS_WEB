// AI Evaluation Controller - Monitor and configure Gemini AI

const prisma = require("../../config/database.config");
const { geminiConfig } = require("../../config/gemini.config");

class AIEvaluationController {
  /**
   * GET /api/admin/ai/usage
   * Get Gemini API usage statistics
   */
  async getUsage(_req, res, next) {
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
  async getEvaluations(req, res, next) {
    try {
      const { status, limit = "20", page = "1" } = req.query;
      const limitNum = parseInt(limit);
      const skip = (parseInt(page) - 1) * limitNum;

      const where = {};
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
            page: parseInt(page),
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
  async reprocess(req, res, next) {
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
  async getConfig(_req, res, next) {
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

module.exports = { AIEvaluationController };
