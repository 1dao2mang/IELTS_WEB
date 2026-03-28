// Error Middleware - Global error handler
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let code = err.code || "INTERNAL_ERROR";
  let details = err.details;

  // Handle specific error types
  if (err instanceof ZodError) {
    statusCode = 400;
    code = "VALIDATION_ERROR";
    message = "Invalid request data";
    details = err.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message,
    }));
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    code = "INVALID_TOKEN";
    message = "Invalid authentication token";
  } else if (err.name === "PrismaClientKnownRequestError") {
    // Handle Prisma database errors
    switch ((err as any).code) {
      case 'P2002':
        statusCode = 409;
        code = "DUPLICATE_ENTRY";
        message = "Resource already exists";
        break;
      case 'P2025':
        statusCode = 404;
        code = "NOT_FOUND";
        message = "Resource not found";
        break;
      default:
        statusCode = 500;
        code = "DATABASE_ERROR";
        message = "Database operation failed";
    }
  }

  // Log error for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      statusCode: err.statusCode,
    });
  }

  // Send standardized error response
  const errorResponse: any = {
    success: false,
    error: {
      code,
      message,
    },
  };

  // Include details in development or if explicitly provided
  if (details || process.env.NODE_ENV === "development") {
    errorResponse.error.details = details || err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
