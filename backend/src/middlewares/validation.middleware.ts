// Validation Middleware - Request validation using Zod
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export interface ValidationRequest extends Request {
  validatedBody?: any;
  validatedParams?: any;
  validatedQuery?: any;
}

export const validateBody = (schema: ZodSchema) => {
  return (req: ValidationRequest, res: Response, next: NextFunction) => {
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

export const validateParams = (schema: ZodSchema) => {
  return (req: ValidationRequest, res: Response, next: NextFunction) => {
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

export const validateQuery = (schema: ZodSchema) => {
  return (req: ValidationRequest, res: Response, next: NextFunction) => {
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
export const validate = validateBody;
