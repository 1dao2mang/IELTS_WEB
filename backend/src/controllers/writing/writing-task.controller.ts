// Writing Task Controller - Get writing tasks
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";
import { ResponseHelper } from "../../utils/helpers/response.helper";
import { catchAsync } from "../../utils/helpers/catch-async.helper";

import { z } from "zod";

const taskIdSchema = z.object({
  taskId: z.string().transform((val) => BigInt(val)),
});

export class WritingTaskController {
  // GET /api/writing/tasks/:taskId
  getTaskById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
  getTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page = "1", limit = "10", taskType } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where = taskType ? { taskType: taskType as string } : {};

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
