// Speaking Validation Schemas
const { z } = require("zod");

// Schema for POST /api/speaking/attempts body
const createAttemptSchema = z.object({
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
const attemptIdParamSchema = z.object({
  id: z.union([
    z.string().regex(/^\d+$/),
    z.number().int().positive(),
  ]),
});

module.exports = { createAttemptSchema, attemptIdParamSchema };
