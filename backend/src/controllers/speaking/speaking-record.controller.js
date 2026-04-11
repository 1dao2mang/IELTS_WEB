// Speaking Record Controller - Handle speaking recordings

const { SpeakingRecordingService } = require("../../services/speaking/speaking-recording.service");
const multer = require("multer");
const { uploadConfig } = require("../../config/upload.config");
const { catchAsync } = require("../../utils/helpers/catch-async.helper");

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

class SpeakingRecordController {
  recordingService;
  uploadMiddleware = upload.single("audio");

  constructor() {
    this.recordingService = new SpeakingRecordingService();
  }

  // POST /api/speaking/attempts
  createAttempt = catchAsync(async (req, res, next) => {
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
  });

  // POST /api/speaking/attempts/:id/upload
  uploadRecording = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userId = (req).user.userId;

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
  });

  // GET /api/speaking/attempts/:id
  getRecording = catchAsync(async (req, res, next) => {
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
        status: (recording).status || "unknown",
        audioUrl: recording.audioUrl,
        transcript: recording.transcript,
        scores: (recording).scoresJson || null,
        feedback: feedback,
        recordedAt: recording.recordedAt,
        processedAt: (recording).processedAt || null,
      },
    });
  });

  // GET /api/speaking/recordings/:recordingId/feedback (legacy compatibility)
  getFeedback = catchAsync(async (req, res, next) => {
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
  });
}

module.exports = { SpeakingRecordController };
