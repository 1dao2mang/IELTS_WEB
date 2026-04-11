// User Validator - User validation schemas
const { z } = require("zod");

const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  targetBand: z.number().min(1).max(9).optional(),
  country: z.string().max(100).optional(),
  dateOfBirth: z.string().datetime().optional(),
});

module.exports = { updateProfileSchema };
