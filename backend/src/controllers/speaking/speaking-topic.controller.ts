// Speaking Topic Controller - Get speaking topics and prompts
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";

export class SpeakingTopicController {
  // GET /api/speaking/topics
  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await prisma.speakingTopic.findMany({
        select: {
          id: true,
          topicTitle: true,
          part: true,
          description: true,
        },
      });

      return res.json({
        success: true,
        data: topics.map((t) => ({
          id: Number(t.id),
          title: t.topicTitle,
          part: t.part,
          description: t.description,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/speaking/topics/:topicId/prompts
  async getPrompts(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId } = req.params;

      const prompts = await prisma.speakingPrompt.findMany({
        where: { topicId: BigInt(topicId) },
      });

      return res.json({
        success: true,
        data: prompts.map((p) => ({
          id: Number(p.id),
          questionText: p.questionText,
          questionIndex: p.questionIndex,
          suggestedTimeSec: p.suggestedTimeSec,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }
}
