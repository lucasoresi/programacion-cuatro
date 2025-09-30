import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';

export const orderRoutes = Router();
const orderController = new OrderController();

// POST /orders - Create new order
orderRoutes.post('/', orderController.createOrder.bind(orderController));

// GET /orders/:id - Get order by ID
orderRoutes.get('/:id', orderController.getOrderById.bind(orderController));

// POST /orders/:id/cancel - Cancel order
orderRoutes.post('/:id/cancel', orderController.cancelOrder.bind(orderController));

// GET /orders - Get orders with optional status filter
orderRoutes.get('/', orderController.getOrders.bind(orderController));