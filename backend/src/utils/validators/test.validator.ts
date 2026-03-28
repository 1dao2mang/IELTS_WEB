// Test Validator - Test validation schemas
import { z } from "zod";

export const createTestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  level: z.string().optional(),
  source: z.string().optional(),
});

export const testIdSchema = z.object({
  testId: z.string().regex(/^\d+$/, "Test ID must be a number"),
});

export const attemptIdSchema = z.object({
  attemptId: z.string().regex(/^\d+$/, "Attempt ID must be a number"),
});

export const sectionIdSchema = z.object({
  sectionId: z.string().regex(/^\d+$/, "Section ID must be a number"),
});

export const submitAnswerSchema = z
  .object({
    questionId: z.union([z.string(), z.number()]).optional(),
    question_id: z.union([z.string(), z.number()]).optional(),
    answer: z.string().min(1, "Answer cannot be empty"),
  })
  .refine((data) => data.questionId || data.question_id, {
    message: "Either questionId or question_id is required",
  });

