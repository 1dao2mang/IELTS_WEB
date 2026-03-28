// Speaking Record Controller - Handle speaking recordings
import { Request, Response, NextFunction } from "express";
import { SpeakingRecordingService } from "../../services/speaking/speaking-recording.service";
import multer from "multer";
import { uploadConfig } from "../../config/upload.config";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: uploadConfig.maxAudioFileSize },
  fileFilter: (_req, file, cb) => {
    const ext = file.originalname.split(".").pop()?.toLowerCase();
    if (ext && uploadConfig.allowedAudioFormats.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid audio format. Allowed: ${uploadConfig.allowedAudioFormats.join(", ")}`));
    }
  },
});

export class SpeakingRecordController {
  private recordingService: SpeakingRecordingService;
  public uploadMiddleware = upload.single("audio");

  constructor() {
    this.recordingService = new SpeakingRecordingService();
  }

  // POST /api/speaking/attempts
  async createAttempt(req: Request, res: Response, next: NextFunction) {
    try {
      // Debug: Log what we received
      console.log('🔍 CREATE ATTEMPT - Request body:', JSON.stringify(req.body));
      console.log('   testAttemptId type:', typeof req.body.testAttemptId, 'value:', req.body.testAttemptId);
      
      const { testAttemptId, speakingPromptId } = req.body;

      const recordId = await this.recordingService.createAttempt(
        BigInt(testAttemptId),
        speakingPromptId ? BigInt(speakingPromptId) : null
      );

      return res.json({
        success: true,
        message: "Speaking attempt created successfully",
        data: {
          attemptId: Number(recordId),
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/speaking/attempts/:id/upload
  async uploadRecording(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: { code: "NO_FILE", message: "No audio file provided" },
        });
      }

      // Process through full pipeline (blocking for MVP)
      await this.recordingService.uploadAndProcess(
        BigInt(id),
        req.file,
        String(userId)
      );

      return res.json({
        success: true,
        message: "Audio uploaded and processing completed",
        data: { attemptId: Number(id) },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/speaking/attempts/:id
  async getRecording(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const recording = await this.recordingService.getRecordingById(
        BigInt(id)
      );

      if (!recording) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Recording not found" },
        });
      }

      // Parse feedback JSON if it's a string
      let feedback;
      try {
        feedback =
          typeof recording.feedback === "string"
            ? JSON.parse(recording.feedback)
            : recording.feedback;
      } catch {
        feedback = null;
      }

      return res.json({
        success: true,
        data: {
          id: Number(recording.id),
          status: (recording as any).status || "unknown",
          audioUrl: recording.audioUrl,
          transcript: recording.transcript,
          scores: (recording as any).scoresJson || null,
          feedback: feedback,
          recordedAt: recording.recordedAt,
          processedAt: (recording as any).processedAt || null,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/speaking/recordings/:recordingId/feedback (legacy compatibility)
  async getFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const { recordingId } = req.params;

      const recording = await this.recordingService.getRecordingById(
        BigInt(recordingId)
      );

      if (!recording) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Recording not found" },
        });
      }

      return res.json({
        success: true,
        data: {
          feedback: recording.feedback || "No feedback available yet",
          bandScore: recording.bandScore ? Number(recording.bandScore) : null,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
