// Speaking Validation Schemas
import { z } from "zod";

// Schema for POST /api/speaking/attempts body
export const createAttemptSchema = z.object({
  testAttemptId: z.union([
    z.string().regex(/^\d+$/, "Must be numeric string"),
    z.number().int().positive(),
  ]),
  speakingPromptId: z.union([
    z.string().regex(/^\d+$/),
    z.number().int().positive(),
  ]).optional(),
});

// Schema for params in /attempts/:id
export const attemptIdParamSchema = z.object({
  id: z.union([
    z.string().regex(/^\d+$/),
    z.number().int().positive(),
  ]),
});
