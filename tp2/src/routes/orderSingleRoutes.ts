import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';

export const orderSingleRoutes = Router();
const orderController = new OrderController();

// GET /order/:id - Obtener orden por ID (ruta singular)
orderSingleRoutes.get('/:id', orderController.getOrderById.bind(orderController));