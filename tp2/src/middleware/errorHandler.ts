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

  // Errores de validación de Zod
  if (error instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: 'Error de validación',
      details: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    });
    return;
  }

  // Errores de lógica de negocio personalizados
  if (error.name === 'BusinessLogicError') {
    const statusCode = error.message.includes('entregada') ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
    return;
  }

  // Errores de recurso no encontrado
  if (error.name === 'NotFoundError') {
    res.status(404).json({
      success: false,
      error: error.message
    });
    return;
  }

  // Error del servidor por defecto
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
}
