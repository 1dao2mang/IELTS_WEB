// Writing Task Controller - Get writing tasks

const prisma = require("../../config/database.config");
const { ResponseHelper } = require("../../utils/helpers/response.helper");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

const { z } = require("zod");

const taskIdSchema = z.object({
  taskId: z.string().transform((val) => BigInt(val)),
});

class WritingTaskController {
  // GET /api/writing/tasks/:taskId
  getTaskById = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;

    // Validate taskId parameter
    const parsed = taskIdSchema.safeParse({ taskId });
    if (!parsed.success) {
      return res
        .status(400)
        .json(
          ResponseHelper.error(
            "INVALID_PARAMS",
            "Invalid task ID format",
            400,
            parsed.error.errors
          )
        );
    }

    const task = await prisma.writingTask.findFirst({
      where: {
        id: parsed.data.taskId,
      },
    });

    if (!task) {
      return res
        .status(404)
        .json(ResponseHelper.error("NOT_FOUND", "Writing task not found"));
    }

    return res.json(
      ResponseHelper.success({
        id: Number(task.id),
        taskType: task.taskType,
        prompt: task.prompt,
        imageUrl: task.imageUrl,
      })
    );
  });

  // GET /api/writing/tasks
  getTasks = catchAsync(async (req, res, next) => {
    const { page = "1", limit = "10", taskType } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = taskType ? { taskType: taskType } : {};

    const [tasks, total] = await Promise.all([
      prisma.writingTask.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.writingTask.count({ where }),
    ]);

    return res.json(
      ResponseHelper.paginated(
        tasks.map((task) => ({
          id: Number(task.id),
          taskType: task.taskType,
          prompt: task.prompt.substring(0, 100) + "...", // Truncate for list view
          imageUrl: task.imageUrl,
        })),
        pageNum,
        limitNum,
        total
      )
    );
  });
}

module.exports = { WritingTaskController };
