const { Request, Response, NextFunction } = require('express');

// Define the signature of an asynchronous Express middleware

/**
 * Wraps an async Express middleware or controller function.
 * Automatically catches any rejected Promises and passes the error to the Express `next` function.
 * This completely eliminates the need to write standard try-catch blocks in every controller.
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

module.exports = { catchAsync };
