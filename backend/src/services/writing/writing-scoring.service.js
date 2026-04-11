// Writing Scoring Service - IELTS Writing evaluation using Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiConfig } = require("../../config/gemini.config");







class WritingScoringService {
  genAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
  }

  /**
   * Evaluate writing response using Gemini
   * @param content - User's written response
   * @param taskType - 'task1' or 'task2'
   * @param promptText - The task prompt/question
   * @returns Structured evaluation with scores and feedback
   */
  async evaluateWriting(
    content,
    taskType,
    promptText
  ) {
    const maxRetries = 3;
    let lastError;

    // Word count validation
    const wordCount = content.trim().split(/\s+/).length;
    const minWords = taskType === "task1" ? 150 : 250;

    if (wordCount < minWords) {
      console.log(`⚠️  Under word count: ${wordCount}/${minWords}`);
    }

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

        const prompt = this.buildScoringPrompt(
          content,
          taskType,
          promptText,
          wordCount
        );
        const result = await model.generateContent(prompt);
        let response = result.response.text();

        // Parse JSON response (same robust parsing)
        try {
          response = response
            .trim()
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "");

          response = response.replace(/\\"/g, '"');
          response = response.replace(/"\\s*:\\s*"([^"]*)\\n([^"]*)"/g, '": "$1 $2"');

          // Fix truncated JSON
          if (!response.endsWith("}")) {
            const openBraces = (response.match(/{/g) || []).length;
            const closeBraces = (response.match(/}/g) || []).length;
            const openBrackets = (response.match(/\[/g) || []).length;
            const closeBrackets = (response.match(/\]/g) || []).length;

            if ((response.match(/"/g) || []).length % 2 !== 0) {
              response += '"';
            }
            for (let i = 0; i < openBrackets - closeBrackets; i++) {
              response += "]";
            }
            for (let i = 0; i < openBraces - closeBraces; i++) {
              response += "}";
            }
          }

          const parsed = JSON.parse(response);

          // Record successful usage
          const { geminiKeyManager } = await import(
            "../../config/gemini.config"
          );
          geminiKeyManager.recordUsage();

          return parsed;
        } catch (parseError) {
          console.error("❌ Failed to parse Gemini response:");
          console.error("Original response:", response.substring(0, 800));
          console.error("Error:", parseError);
          throw new Error(`Failed to parse Gemini response: ${parseError}`);
        }
      } catch (error) {
        lastError = error;

        // Check if quota error (429)
        if (
          error.message?.includes("429") ||
          error.message?.includes("quota")
        ) {
          console.log(
            `⚠️  Quota exceeded on attempt ${attempt + 1}/${maxRetries}`
          );

          // Try rotating to next key
          const { geminiKeyManager } = await import(
            "../../config/gemini.config"
          );
          if (geminiKeyManager.hasMultipleKeys()) {
            geminiKeyManager.rotateToNextKey();
            // Recreate genAI with new key
            this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
            console.log("🔄 Retrying with next API key...");
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
   * Build IELTS Writing scoring prompt
   */
  buildScoringPrompt(
    content,
    taskType,
    promptText,
    wordCount
  ) {
    const minWords = taskType === "task1" ? 150 : 250;
    const taskName = taskType === "task1" ? "Task 1 (Report/Letter)" : "Task 2 (Essay)";
    
    const criteriaName = taskType === "task1" ? "Task Achievement" : "Task Response";

    return `You are an IELTS Writing Examiner. Evaluate this ${taskName} response using official IELTS band descriptors.

**Task Prompt**: ${promptText}

**Candidate's Writing** (${wordCount} words):
${content}

---

## IELTS WRITING ASSESSMENT CRITERIA

Score each criterion independently using 0.5 increments (e.g., 5.5, 6.0, 6.5).

### 1. ${criteriaName.toUpperCase()}
${taskType === "task1" ? `
- **Band 7-9**: Fully satisfies all requirements. Presents clear overview. Highlights key features. Accurate data presentation.
- **Band 5-6**: Addresses requirements but may be mechanical. Presents overview but details may be inappropriate/inaccurate. Some irrelevant details.
- **Band 3-4**: Responds to task only minimally. No clear overview. Confuses key features. Contains irrelevant information.
` : `
- **Band 7-9**: Fully addresses all parts of task. Presents well-developed response with relevant, extended ideas. Clear position throughout.
- **Band 5-6**: Addresses task but some parts more fully than others. Presents relevant main ideas but may be inadequately developed/unclear.
- **Band 3-4**: Responds to task only minimally or tangentially. Position unclear. Few ideas, poorly developed.
`}

**Assess**: Addresses all parts, appropriate format, clear position (T2), appropriate length, relevant content.

### 2. COHERENCE AND COHESION
- **Band 7-9**: Sequences information logically. Uses cohesive devices flexibly. Clear progression throughout. Well-organized paragraphs.
- **Band 5-6**: Information/ideas arranged coherently. Clear overall progression. Uses cohesive devices but may be mechanical/faulty. Paragraphing may lack logic.
- **Band 3-4**: Information/ideas not arranged coherently. Repetitive use of cohesive devices. No paragraphing or confusing paragraphing.

**Assess**: Logical flow, paragraph structure, linking words, topic sentences, pronoun reference.

### 3. LEXICAL RESOURCE (Vocabulary)
- **Band 7-9**: Uses sufficient range of vocabulary flexibly and precisely. Uses less common lexical items. Shows awareness of style/collocation. Rare errors in spelling/word formation.
- **Band 5-6**: Uses adequate range for task. Attempts less common vocabulary but with some inaccuracy. Makes noticeable errors in spelling/word formation that may cause difficulty.
- **Band 3-4**: Uses only basic vocabulary. Limited control of word formation/spelling. Errors may severely distort message.

**Assess**: Range, precision, paraphrase, topic vocabulary, collocations, spelling accuracy.

### 4. GRAMMATICAL RANGE AND ACCURACY
- **Band 7-9**: Uses variety of complex structures. Frequent error-free sentences. Good control of grammar/punctuation. Minor errors only.
- **Band 5-6**: Uses mix of simple and complex sentence forms. Makes some errors but they rarely reduce communication. Punctuation generally appropriate.
- **Band 3-4**: Uses only limited range of structures. Attempts complex sentences but they tend to be faulty. Frequent grammatical errors distort meaning.

**Assess**: Sentence variety, tense control, subject-verb agreement, articles, punctuation, error frequency.

---

## SCORING GUIDELINES

1. **Overall Band**: Average of 4 criteria, rounded to nearest 0.5
2. **Be realistic**: Most candidates score **5.0-7.0**
3. **Under word count** (${wordCount}/${minWords}): ${wordCount < minWords ? "**Maximum Band 5.0**" : "No penalty"}
4. **Completely off-topic**: Maximum Band 3.0
5. **Memorized/Copied text**: Band 0

---

## REQUIRED OUTPUT

Return COMPACT JSON (single line):
{"scores":{"overall":6.0,"taskAchievement":6,"coherence":6,"lexical":6,"grammar":6},"feedback":{"strengths":["point1","point2"],"improvements":["fix1","fix2"],"suggestions":["tip1","tip2"]}}

**CRITICAL**:
- Keep strings under 60 chars
- Max 2-3 items per array
- Return ONLY valid JSON
- No markdown, no extra text
- Be realistic with scores (avoid 8.5+)`;
  }

  /**
   * Calculate band score (legacy method for compatibility)
   */
  async calculateBandScore(content, taskType) {
    // Call main evaluation method
    const evaluation = await this.evaluateWriting(
      content,
      taskType,
      "Evaluate this writing sample"
    );
    return evaluation.scores.overall;
  }
}

module.exports = { WritingScoringService };
