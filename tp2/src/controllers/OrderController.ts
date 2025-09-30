import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/OrderService.js';
import { CreateOrderSchema, OrderStatusQuerySchema } from '../types/index.js';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = CreateOrderSchema.parse(req.body);
      const order = await this.orderService.createOrder(validatedData);
      
      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.cancelOrder(id);
      
      res.json({
        success: true,
        data: order,
        message: 'Orden cancelada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedQuery = OrderStatusQuerySchema.parse(req.query);
      const orders = await this.orderService.getOrders(validatedQuery.status);
      
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }
}