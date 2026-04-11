// Speaking Topic Controller - Get speaking topics and prompts

const prisma = require("../../config/database.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

class SpeakingTopicController {
  // GET /api/speaking/topics
  getAllTopics = catchAsync(async (_req, res, next) => {
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
  });

  // GET /api/speaking/topics/:topicId/prompts
  getPrompts = catchAsync(async (req, res, next) => {
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
  });
}

module.exports = { SpeakingTopicController };
