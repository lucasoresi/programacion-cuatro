import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorResponse } from '../types/index.js';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void {
  console.error('Error:', error);

  // Zod validation errors
  if (error instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: 'Validation failed',
      details: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    });
    return;
  }

  // Custom business logic errors
  if (error.name === 'BusinessLogicError') {
    const statusCode = error.message.includes('already delivered') ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
    return;
  }

  // Not found errors
  if (error.name === 'NotFoundError') {
    res.status(404).json({
      success: false,
      error: error.message
    });
    return;
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
}