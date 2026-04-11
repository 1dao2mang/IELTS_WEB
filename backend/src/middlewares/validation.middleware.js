// Validation Middleware - Request validation using Zod

const { ZodSchema, ZodError } = require("zod");



const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      req.validatedBody = schema.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request body",
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        });
      }
      return res.status(500).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
        },
      });
    }
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      req.validatedParams = schema.parse(req.params);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request parameters",
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        });
      }
      return res.status(500).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
        },
      });
    }
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      req.validatedQuery = schema.parse(req.query);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        });
      }
      return res.status(500).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
        },
      });
    }
  };
};

// Legacy export for backward compatibility
const validate = validateBody;

module.exports = { validateBody, validateParams, validateQuery, validate };
