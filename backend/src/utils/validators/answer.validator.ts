// Answer Validator - Answer validation schemas
import { z } from "zod";

export const submitAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});

export const submitAnswersSchema = z.array(submitAnswerSchema);
