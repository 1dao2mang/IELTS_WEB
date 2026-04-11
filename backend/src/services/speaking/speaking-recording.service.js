// Speaking Recording Service - Handle audio recording uploads and orchestration
const prisma = require("../../config/database.config");
const { R2UploadService } = require("../file/r2-upload.service");
const { SpeakingTranscriptionService } = require("./speaking-transcription.service");
const { SpeakingScoringService } = require("./speaking-scoring.service");

class SpeakingRecordingService {
  r2Service;
  transcriptionService;
  scoringService;

  constructor() {
    this.r2Service = new R2UploadService();
    this.transcriptionService = new SpeakingTranscriptionService();
    this.scoringService = new SpeakingScoringService();
  }

  /**
   * Create a new speaking attempt record
   * @param testAttemptId - Parent test attempt ID
   * @param speakingPromptId - Speaking prompt ID (nullable)
   * @returns Created record ID
   */
  async createAttempt(
    testAttemptId,
    speakingPromptId
  ) {
    const record = await prisma.speakingRecord.create({
      data: {
        testAttemptId,
        speakingPromptId,
        audioUrl: "", // Will be updated after upload
        status: "pending",
      },
    });
    return record.id;
  }

  /**
   * Upload audio and process through full AI pipeline
   * Pipeline: Upload → Transcribe → Score → Save
   * @param recordId - Speaking record ID
   * @param audioFile - Uploaded audio file
   * @param userId - User ID for R2 organization
   */
  async uploadAndProcess(
    recordId,
    audioFile,
    userId
  ) {
    try {
      // Step 1: Upload to R2
      const audioUrl = await this.r2Service.uploadAudio(audioFile, userId);
      await prisma.speakingRecord.update({
        where: { id: recordId },
        data: { audioUrl, status: "transcribing" },
      });

      // Step 2: Transcribe audio
      const transcript = await this.transcriptionService.transcribeAudio(
        audioUrl
      );
      await prisma.speakingRecord.update({
        where: { id: recordId },
        data: { transcript, status: "scoring" },
      });

      // Step 3: Get prompt details for scoring context
      const record = await prisma.speakingRecord.findUnique({
        where: { id: recordId },
        include: { speakingPrompt: { include: { topic: true } } },
      });

      if (!record?.speakingPrompt) {
        throw new Error("Speaking prompt not found");
      }

      // Step 4: Score using Gemini
      const evaluation = await this.scoringService.evaluateSpeaking(
        transcript,
        record.speakingPrompt.topic.part,
        record.speakingPrompt.questionText
      );

      // Step 5: Save results
      await prisma.speakingRecord.update({
        where: { id: recordId },
        data: {
          bandScore: evaluation.scores.overall,
          scoresJson: evaluation,
          feedback: JSON.stringify(evaluation.feedback),
          status: "completed",
          processedAt: new Date(),
        },
      });
    } catch (error) {
      // Handle errors gracefully
      await prisma.speakingRecord.update({
        where: { id: recordId },
        data: {
          status: "failed",
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
        },
      });
      throw error;
    }
  }

  /**
   * Get recording by ID with all details
   * @param recordingId - Speaking record ID
   * @returns Full record with prompt details
   */
  async getRecordingById(recordingId) {
    return prisma.speakingRecord.findUnique({
      where: { id: recordingId },
      include: {
        speakingPrompt: {
          include: { topic: true },
        },
      },
    });
  }

  /**
   * Get all recordings for a user
   * @param userId - User ID
   * @returns List of user's speaking records
   */
  async getUserRecordings(userId) {
    return prisma.speakingRecord.findMany({
      where: {
        testAttempt: { userId },
      },
      include: {
        speakingPrompt: {
          include: { topic: true },
        },
      },
      orderBy: { recordedAt: "desc" },
    });
  }
}

module.exports = { SpeakingRecordingService };
