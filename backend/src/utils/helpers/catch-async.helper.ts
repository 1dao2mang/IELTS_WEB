import { Request, Response, NextFunction } from 'express';

// Define the signature of an asynchronous Express middleware
type AsyncExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Wraps an async Express middleware or controller function.
 * Automatically catches any rejected Promises and passes the error to the Express `next` function.
 * This completely eliminates the need to write standard try-catch blocks in every controller.
 */
export const catchAsync = (fn: AsyncExpressMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
