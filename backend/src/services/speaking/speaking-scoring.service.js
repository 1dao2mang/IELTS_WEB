// Speaking Scoring Service - Speaking evaluation and scoring using Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiConfig } = require("../../config/gemini.config");







class SpeakingScoringService {
  genAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
  }

  /**
   * Evaluate speaking response using Gemini
   * @param transcript - Transcribed text from audio
   * @param part - IELTS Speaking part (1, 2, or 3)
   * @param promptText - The question/prompt text
   * @returns Structured evaluation with scores and feedback
   */
  async evaluateSpeaking(
    transcript,
    part,
    promptText
  ) {
    const maxRetries = 3;
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const model = this.genAI.getGenerativeModel({
          model: geminiConfig.scoringModel,
          generationConfig: {
            temperature: geminiConfig.temperature,
            maxOutputTokens: 4000,
            responseMimeType: "application/json",
          },
          safetySettings: geminiConfig.safetySettings,
        });

        const prompt = this.buildScoringPrompt(transcript, part, promptText);
        const result = await model.generateContent(prompt);
        let response = result.response.text();

        // ... (parsing logic)
        try {
          response = response.trim()
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '');
          
          console.log('🔍 Before unescape:', response.substring(0, 100));
          response = response.replace(/\\"/g, '"');
          console.log('🔍 After unescape:', response.substring(0, 100));
          
          response = response.replace(/"\s*:\s*"([^"]*)\n([^"]*)"/g, '": "$1 $2"');
          
          if (!response.endsWith('}')) {
            console.log('⚠️  Response appears truncated, attempting to fix...');
            const openBraces = (response.match(/{/g) || []).length;
            const closeBraces = (response.match(/}/g) || []).length;
            const openBrackets = (response.match(/\[/g) || []).length;
            const closeBrackets = (response.match(/\]/g) || []).length;
            
            if ((response.match(/"/g) || []).length % 2 !== 0) {
              response += '"';
            }
            for (let i = 0; i < openBrackets - closeBrackets; i++) {
              response += ']';
            }
            for (let i = 0; i < openBraces - closeBraces; i++) {
              response += '}';
            }
            console.log('✅ Fixed response:', response.substring(response.length - 100));
          }
          
          const parsed = JSON.parse(response);
          
          // Record successful usage
          const { geminiKeyManager } = await import('../../config/gemini.config');
          geminiKeyManager.recordUsage();
          
          return parsed;
        } catch (parseError) {
          console.error('❌ Failed to parse Gemini response:');
          console.error('Original response:', response.substring(0, 800));
          console.error('Error:', parseError);
          throw new Error(`Failed to parse Gemini response: ${parseError}`);
        }
      } catch (error) {
        lastError = error;
        
        // Check if quota error (429)
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          console.log(`⚠️  Quota exceeded on attempt ${attempt + 1}/${maxRetries}`);
          
          // Try rotating to next key
          const { geminiKeyManager } = await import('../../config/gemini.config');
          if (geminiKeyManager.hasMultipleKeys()) {
            geminiKeyManager.rotateToNextKey();
            // Recreate genAI with new key
            this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
            console.log('🔄 Retrying with next API key...');
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
   * Build comprehensive IELTS scoring prompt
   */
  buildScoringPrompt(
    transcript,
    part,
    promptText
  ) {
    return `You are an IELTS Speaking Examiner. Score this Part ${part} response using official IELTS band descriptors.

**Question**: ${promptText}

**Candidate's Transcript**:
${transcript}

---

## IELTS SPEAKING ASSESSMENT CRITERIA

Score each criterion independently using 0.5 increments (e.g., 5.5, 6.0, 6.5).

### 1. FLUENCY AND COHERENCE
- **Band 7-9**: Speaks fluently with only rare repetition/self-correction. Uses cohesive devices naturally. Develops topics coherently.
- **Band 5-6**: Maintains flow despite some repetition/self-correction. Uses cohesive devices but with some inaccuracy. Can speak at length but may lose coherence.
- **Band 3-4**: Speaks with frequent pauses. Limited ability to link ideas. Frequent repetition. Short, simple responses.
- **Band 1-2**: Responds with isolated words. Long pauses. Cannot form sentences.

**Assess**: Length, pauses, repetition, self-correction, use of linking words, logical flow.

### 2. LEXICAL RESOURCE (Vocabulary)
- **Band 7-9**: Uses vocabulary flexibly and precisely. Uses less common/idiomatic items. Uses paraphrase effectively. Rare errors in word choice.
- **Band 5-6**: Has sufficient vocabulary for familiar topics. Attempts paraphrase but with mixed success. Makes noticeable errors in word choice but meaning is clear.
- **Band 3-4**: Uses simple vocabulary for basic communication. Relies on repetition of prompt words. Limited ability to paraphrase.
- **Band 1-2**: Uses only isolated words. No meaningful vocabulary range.

**Assess**: Range, precision, paraphrasing ability, topic-specific vocabulary, collocations.

### 3. GRAMMATICAL RANGE AND ACCURACY
- **Band 7-9**: Uses a range of complex structures naturally and accurately. Frequent error-free sentences. Minor errors only.
- **Band 5-6**: Uses mix of simple and complex forms. Makes frequent errors with complex structures but they rarely cause comprehension problems. Basic structures mostly accurate.
- **Band 3-4**: Uses basic sentence forms with reasonable accuracy. Subordinate clauses are rare. Errors frequent and may cause comprehension difficulty.
- **Band 1-2**: Cannot produce basic sentence forms accurately. Errors prevent communication.

**Assess**: Sentence variety (simple/compound/complex), verb tenses, subject-verb agreement, articles, plurals, error frequency.

### 4. PRONUNCIATION
- **Band 7-9**: Easy to understand. L1 accent has minimal effect. Uses features of natural connected speech (linking, weak forms). Word/sentence stress is clear.
- **Band 5-6**: Generally intelligible despite mispronunciation. L1 accent may affect clarity. Uses some features of connected speech but not consistently.
- **Band 3-4**: Mispronunciation is frequent. L1 accent requires listener effort. Limited use of connected speech features.
- **Band 1-2**: Speech unintelligible. Cannot produce recognizable words.

**NOTE**: Since you only have transcript, estimate based on:
- Transcript clarity (missing/garbled words indicate poor pronunciation)
- Complex word usage (suggests confident pronunciation)
- Natural speech patterns evident in transcript

---

## SCORING GUIDELINES

1. **Overall Band**: Average of 4 criteria, rounded to nearest 0.5
2. **Be realistic**: Most candidates score **5.0-7.0**
3. **Short responses (<30 words)**: Maximum Band 4.0
4. **Off-topic/Irrelevant**: Maximum Band 3.0
5. **"I don't know" only**: Band 1.0-2.0

---

## REQUIRED OUTPUT

Return COMPACT JSON (single line):
{"scores":{"overall":6.5,"fluency":6,"lexical":6.5,"grammar":6,"pronunciation":6.5},"feedback":{"strengths":["point1","point2"],"improvements":["fix1","fix2"],"suggestions":["tip1","tip2"]}}

**CRITICAL**:
- Keep strings under 50 chars
- Max 2 items per array
- Return ONLY valid JSON
- No markdown, no extra text`;
  }
}

module.exports = { SpeakingScoringService };
