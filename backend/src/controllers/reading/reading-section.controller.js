// Reading Section Controller - Get reading section details

const prisma = require("../../config/database.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

class ReadingSectionController {
  // GET /api/reading/sections/:sectionId
  getSectionById = catchAsync(async (req, res, next) => {
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
        questionGroups: section.questionGroups.map((qg) => ({
          id: Number(qg.id),
          groupTitle: qg.groupTitle,
          questions: qg.questions.map((q) => ({
            id: Number(q.id),
            questionType: q.questionType,
            prompt: q.prompt,
            questionIndex: q.questionIndex,
          })),
        })),
      },
    });
  });

  // POST /api/reading/attempts/start
  startAttempt = catchAsync(async (req, res, next) => {
    const userId = BigInt((req).user?.id || 1);
    const { testId } = req.body;

    const attempt = await prisma.testAttempt.create({
      data: {
        userId,
        testId: BigInt(testId),
        skillId: 2, // 2 for reading
        status: "in_progress",
        startedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: "Bắt đầu làm bài reading",
      data: {
        attemptId: Number(attempt.id),
        startedAt: attempt.startedAt,
      },
    });
  });

  // POST /api/reading/attempts/:attemptId/submit
  submitAttempt = catchAsync(async (req, res, next) => {
    const { attemptId } = req.params;

    const attempt = await prisma.testAttempt.update({
      where: { id: BigInt(attemptId) },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: "Nộp bài thành công",
      data: {
        attemptId: Number(attempt.id),
        completedAt: attempt.completedAt,
      },
    });
  });

  // GET /api/reading/attempts/:attemptId/result
  getResult = catchAsync(async (req, res, next) => {
    const { attemptId } = req.params;

    const attempt = await prisma.testAttempt.findUnique({
      where: { id: BigInt(attemptId) },
      include: { test: true },
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
  });
}

module.exports = { ReadingSectionController };
