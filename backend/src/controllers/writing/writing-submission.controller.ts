// Writing Submission Controller - Handle writing submissions with AI evaluation
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.config";
import { WritingScoringService } from "../../services/writing/writing-scoring.service";

export class WritingSubmissionController {
  private scoringService: WritingScoringService;

  constructor() {
    this.scoringService = new WritingScoringService();
  }

  // POST /api/writing/submissions/submit
  async submitWriting(req: Request, res: Response, next: NextFunction) {
    try {
      const { testAttemptId, writingTaskId, content } = req.body;

      const submission = await prisma.writingSubmission.create({
        data: {
          testAttemptId: BigInt(testAttemptId),
          writingTaskId: BigInt(writingTaskId),
          content,
        },
      });

      // Trigger AI evaluation asynchronously (don't await)
      this.evaluateSubmissionAsync(
        submission.id,
        content,
        BigInt(writingTaskId)
      ).catch((error) => {
        console.error("❌ AI evaluation failed:", error.message);
      });

      return res.json({
        success: true,
        message: "Writing submitted successfully. AI evaluation in progress...",
        data: {
          submissionId: Number(submission.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Evaluate submission asynchronously
   * @private
   */
  private async evaluateSubmissionAsync(
    submissionId: bigint,
    content: string,
    writingTaskId: bigint
  ): Promise<void> {
    try {
      console.log(`🤖 Starting AI evaluation for submission ${submissionId}...`);

      // Get task details
      const task = await prisma.writingTask.findUnique({
        where: { id: writingTaskId },
      });

      if (!task) {
        throw new Error("Writing task not found");
      }

      // Determine task type from taskType field
      const taskType = task.taskType.toLowerCase().includes("2")
        ? "task2"
        : "task1";

      // Call AI evaluation
      const evaluation = await this.scoringService.evaluateWriting(
        content,
        taskType as "task1" | "task2",
        task.prompt
      );

      // Update submission with results
      await prisma.writingSubmission.update({
        where: { id: submissionId },
        data: {
          bandScore: evaluation.scores.overall,
          feedback: JSON.stringify(evaluation),
        },
      });

      console.log(
        `✅ AI evaluation completed for submission ${submissionId}. Band: ${evaluation.scores.overall}`
      );
    } catch (error: any) {
      console.error(
        `❌ AI evaluation failed for submission ${submissionId}:`,
        error.message
      );
      
      // Update submission with error status
      await prisma.writingSubmission.update({
        where: { id: submissionId },
        data: {
          feedback: JSON.stringify({
            error: "AI evaluation failed. Please contact support.",
            message: error.message,
          }),
        },
      });
    }
  }

  // GET /api/writing/submissions/:submissionId
  async getSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const { submissionId } = req.params;

      const submission = await prisma.writingSubmission.findUnique({
        where: { id: BigInt(submissionId) },
      });

      if (!submission) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Submission not found" },
        });
      }

      return res.json({
        success: true,
        data: {
          id: Number(submission.id),
          content: submission.content,
          submittedAt: submission.submittedAt,
          bandScore: submission.bandScore
            ? Number(submission.bandScore)
            : null,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/writing/submissions/:submissionId/feedback
  async getFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const { submissionId } = req.params;

      const submission = await prisma.writingSubmission.findUnique({
        where: { id: BigInt(submissionId) },
      });

      if (!submission) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Submission not found" },
        });
      }

      // Parse feedback if it exists
      let feedback = null;
      if (submission.feedback) {
        try {
          feedback = JSON.parse(submission.feedback);
        } catch {
          feedback = { note: submission.feedback };
        }
      }

      return res.json({
        success: true,
        data: {
          feedback: feedback || "Evaluation in progress...",
          bandScore: submission.bandScore
            ? Number(submission.bandScore)
            : null,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/writing/submissions/:submissionId/evaluate
  // Manually trigger AI evaluation for existing submission
  async triggerEvaluation(req: Request, res: Response, next: NextFunction) {
    try {
      const { submissionId } = req.params;

      const submission = await prisma.writingSubmission.findUnique({
        where: { id: BigInt(submissionId) },
      });

      if (!submission) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Submission not found" },
        });
      }

      // Check if already evaluated
      if (submission.bandScore) {
        return res.json({
          success: true,
          message: "Already evaluated",
          data: {
            bandScore: Number(submission.bandScore),
          },
        });
      }

      // Trigger evaluation async
      this.evaluateSubmissionAsync(
        submission.id,
        submission.content,
        submission.writingTaskId
      ).catch((error) => {
        console.error("❌ Manual evaluation failed:", error.message);
      });

      return res.json({
        success: true,
        message: "AI evaluation triggered. Poll /feedback endpoint for results.",
        data: {
          submissionId: Number(submission.id),
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
