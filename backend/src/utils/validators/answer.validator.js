// Answer Validator - Answer validation schemas
const { z } = require("zod");

const submitAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});

const submitAnswersSchema = z.array(submitAnswerSchema);

module.exports = { submitAnswerSchema, submitAnswersSchema };
