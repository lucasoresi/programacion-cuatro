import express from 'express';
import cors from 'cors';
import { orderRoutes } from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function makeApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/orders', orderRoutes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}