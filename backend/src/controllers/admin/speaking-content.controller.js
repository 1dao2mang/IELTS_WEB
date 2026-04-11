// Speaking Content Controller - Manage speaking topics and prompts

const prisma = require("../../config/database.config");

class SpeakingContentController {
  /**
   * GET /api/admin/speaking/topics
   * List all speaking topics
   */
  async getAllTopics(req, res, next) {
    try {
      const { part } = req.query;
      
      const where = {};
      if (part) {
        where.part = parseInt(part);
      }

      const topics = await prisma.speakingTopic.findMany({
        where,
        include: {
          _count: {
            select: { speakingPrompts: true },
          },
        },
        orderBy: [{ part: "asc" }, { topicTitle: "asc" }],
      });

      return res.json({
        success: true,
        data: topics.map((t) => ({
          id: Number(t.id),
          part: t.part,
          title: t.topicTitle,
          description: t.description,
          promptCount: t._count.speakingPrompts,
          createdAt: t.createdAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/admin/speaking/topics
   * Create new speaking topic
   */
  async createTopic(req, res, next) {
    try {
      const { part, topicTitle, description, skillId } = req.body;

      const topic = await prisma.speakingTopic.create({
        data: {
          skillId: skillId ? skillId : 2, // Default to Speaking skill (id: 2)
          part,
          topicTitle,
          description,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Topic created successfully",
        data: {
          id: Number(topic.id),
          title: topic.topicTitle,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * PUT /api/admin/speaking/topics/:topicId
   * Update speaking topic
   */
  async updateTopic(req, res, next) {
    try {
      const { topicId } = req.params;
      const { part, topicTitle, description } = req.body;

      const topic = await prisma.speakingTopic.update({
        where: { id: BigInt(topicId) },
        data: { part, topicTitle, description },
      });

      return res.json({
        success: true,
        message: "Topic updated successfully",
        data: {
          id: Number(topic.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * DELETE /api/admin/speaking/topics/:topicId
   * Delete speaking topic
   */
  async deleteTopic(req, res, next) {
    try {
      const { topicId } = req.params;

      await prisma.speakingTopic.delete({
        where: { id: BigInt(topicId) },
      });

      return res.json({
        success: true,
        message: "Topic deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * GET /api/admin/speaking/prompts
   * List all speaking prompts with filters
   */
  async getAllPrompts(req, res, next) {
    try {
      const { topicId } = req.query;

      const where = {};
      if (topicId) {
        where.topicId = BigInt(topicId);
      }

      const prompts = await prisma.speakingPrompt.findMany({
        where,
        include: {
          topic: {
            select: {
              topicTitle: true,
              part: true,
            },
          },
        },
        orderBy: [{ topicId: "asc" }, { questionIndex: "asc" }],
      });

      return res.json({
        success: true,
        data: prompts.map((p) => ({
          id: Number(p.id),
          topicId: Number(p.topicId),
          topicTitle: p.topic.topicTitle,
          part: p.topic.part,
          questionIndex: p.questionIndex,
          questionText: p.questionText,
          suggestedTimeSec: p.suggestedTimeSec,
          createdAt: p.createdAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/admin/speaking/prompts
   * Create new speaking prompt
   */
  async createPrompt(req, res, next) {
    try {
      const { topicId, questionIndex, questionText, suggestedTimeSec } = req.body;

      const prompt = await prisma.speakingPrompt.create({
        data: {
          topicId: BigInt(topicId),
          questionIndex,
          questionText,
          suggestedTimeSec,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Prompt created successfully",
        data: {
          id: Number(prompt.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * PUT /api/admin/speaking/prompts/:promptId
   * Update speaking prompt
   */
  async updatePrompt(req, res, next) {
    try {
      const { promptId } = req.params;
      const { questionIndex, questionText, suggestedTimeSec } = req.body;

      const prompt = await prisma.speakingPrompt.update({
        where: { id: BigInt(promptId) },
        data: { questionIndex, questionText, suggestedTimeSec },
      });

      return res.json({
        success: true,
        message: "Prompt updated successfully",
        data: {
          id: Number(prompt.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * DELETE /api/admin/speaking/prompts/:promptId
   * Delete speaking prompt
   */
  async deletePrompt(req, res, next) {
    try {
      const { promptId } = req.params;

      await prisma.speakingPrompt.delete({
        where: { id: BigInt(promptId) },
      });

      return res.json({
        success: true,
        message: "Prompt deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = { SpeakingContentController };
