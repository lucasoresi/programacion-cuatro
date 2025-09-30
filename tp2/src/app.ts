import express from 'express';
import cors from 'cors';
import { orderRoutes } from './routes/orderRoutes.js';
import { orderSingleRoutes } from './routes/orderSingleRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function makeApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use('/orders', orderRoutes);
  app.use('/order', orderSingleRoutes);

  // Endpoint de estado de salud
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Middleware de manejo de errores (debe ir al final)
  app.use(errorHandler);

  return app;
}