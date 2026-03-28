// Gemini API Key Manager - Rotation to handle quota limits
class GeminiKeyManager {
  private keys: string[];
  private currentIndex: number = 0;
  private usage: Map<number, { count: number; lastReset: Date }> = new Map();
  private readonly DAILY_QUOTA = 20; // Free tier limit per key

  constructor() {
    // Load all available keys from env
    this.keys = [
      process.env.GEMINI_API_KEY || "",
      process.env.GEMINI_API_KEY_2 || "",
      process.env.GEMINI_API_KEY_3 || "",
    ].filter(key => key.length > 0);

    if (this.keys.length === 0) {
      throw new Error("No Gemini API keys configured");
    }

    // Initialize usage tracking
    this.keys.forEach((_, index) => {
      this.usage.set(index, { count: 0, lastReset: new Date() });
    });

    console.log(`✅ Loaded ${this.keys.length} Gemini API key(s)`);
    this.logUsageStatus();
  }

  getCurrentKey(): string {
    return this.keys[this.currentIndex];
  }

  getCurrentKeyIndex(): number {
    return this.currentIndex;
  }

  recordUsage(): void {
    const usage = this.usage.get(this.currentIndex)!;
    
    // Reset if new day
    const now = new Date();
    const lastReset = usage.lastReset;
    if (now.getDate() !== lastReset.getDate() || now.getMonth() !== lastReset.getMonth()) {
      usage.count = 0;
      usage.lastReset = now;
    }
    
    usage.count++;
    this.logUsageStatus();
  }

  rotateToNextKey(): string {
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    console.log(`🔄 Rotated to API key ${this.currentIndex + 1}/${this.keys.length}`);
    this.logUsageStatus();
    return this.getCurrentKey();
  }

  hasMultipleKeys(): boolean {
    return this.keys.length > 1;
  }

  private logUsageStatus(): void {
    console.log('\n📊 API Key Usage Status:');
    this.keys.forEach((_, index) => {
      const usage = this.usage.get(index)!;
      const remaining = this.DAILY_QUOTA - usage.count;
      const percentage = ((usage.count / this.DAILY_QUOTA) * 100).toFixed(1);
      const isCurrent = index === this.currentIndex;
      
      console.log(
        `   ${isCurrent ? '→' : ' '} Key ${index + 1}: ${usage.count}/${this.DAILY_QUOTA} used (${percentage}%) - ${remaining} remaining`
      );
    });
    console.log('');
  }
}

export const geminiKeyManager = new GeminiKeyManager();

export const geminiConfig = {
  get apiKey() {
    return geminiKeyManager.getCurrentKey();
  },
  transcriptionModel: process.env.GEMINI_TRANSCRIPTION_MODEL || "gemini-2.5-flash",
  scoringModel: process.env.GEMINI_SCORING_MODEL || "gemini-2.5-flash",

  // Model parameters
  temperature: 0.2, // Low temperature for consistent scoring
  maxOutputTokens: 4096,

  // Safety settings
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_NONE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_NONE",
    },
  ],
};
