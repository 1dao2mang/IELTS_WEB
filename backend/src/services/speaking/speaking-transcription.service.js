// Speaking Transcription Service - Audio transcription using Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiConfig } = require("../../config/gemini.config");

class SpeakingTranscriptionService {
  genAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
  }

  /**
   * Transcribe audio file to text using Gemini
   * @param audioUrl - Public URL of audio file
   * @returns Transcript text
   */
  async transcribeAudio(audioUrl) {
    const maxRetries = 3;
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Download audio file
        const audioBuffer = await this.downloadAudioBuffer(audioUrl);

        const model = this.genAI.getGenerativeModel({
          model: geminiConfig.transcriptionModel,
        });

        const result = await model.generateContent([
          {
            inlineData: {
              mimeType: "audio/mp3", // Gemini accepts various audio formats
              data: audioBuffer.toString("base64"),
            },
          },
          "Transcribe this English audio accurately. Return only the transcript text, no extra commentary.",
        ]);

        const transcript = result.response.text();
        
        // Record successful usage
        const { geminiKeyManager } = await import('../../config/gemini.config');
        geminiKeyManager.recordUsage();
        
        return transcript.trim();
      } catch (error) {
        lastError = error;
        
        // Check if quota error (429)
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          console.log(`⚠️  Transcription quota exceeded on attempt ${attempt + 1}/${maxRetries}`);
          
          // Try rotating to next key
          const { geminiKeyManager } = await import('../../config/gemini.config');
          if (geminiKeyManager.hasMultipleKeys()) {
            geminiKeyManager.rotateToNextKey();
            // Recreate genAI with new key
            this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
            console.log('🔄 Retrying transcription with next API key...');
            continue; // Retry with new key
          }
        }
        
        // Other errors or no more keys - rethrow
        throw error;
      }
    }

    throw lastError;
  }

  /**
   * Download audio file from URL to Buffer
   * @param audioUrl - Public URL of audio file
   * @returns Audio file
   */
  async downloadAudioBuffer(audioUrl) {
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to download audio: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}

module.exports = { SpeakingTranscriptionService };
