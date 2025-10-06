import { CreateOrderRequest, Order, OrderStatusType, PizzaItem } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';
import { OrderRepository } from '../repositories/OrderRepository.js';
import { InMemoryOrderRepository } from '../repositories/InMemoryOrderRepository.js';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository?: OrderRepository) {
    // Si no se inyecta un repository, usar InMemoryOrderRepository por defecto
    this.orderRepository = orderRepository || new InMemoryOrderRepository();
  }
  
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const orderId = uuidv4();
    const totalPrice = this.calculateTotalPrice(orderData.items);
    
    const order: Order = {
      id: orderId,
      items: orderData.items,
      address: orderData.address,
      customerName: orderData.customerName,
      phone: orderData.phone,
      status: 'PENDING',
      totalPrice,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return await this.orderRepository.save(order);
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      const error = new Error(`Orden con id ${id} no encontrada`);
      error.name = 'NotFoundError';
      throw error;
    }
    return order;
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      const error = new Error(`Orden con id ${id} no encontrada`);
      error.name = 'NotFoundError';
      throw error;
    }

    if (order.status === 'DELIVERED') {
      const error = new Error('No se puede cancelar una orden que ya fue entregada');
      error.name = 'BusinessLogicError';
      throw error;
    }

    order.status = 'CANCELLED';
    order.updatedAt = new Date();
    
    return await this.orderRepository.update(order);
  }

  async getOrders(status?: string): Promise<Order[]> {
    return await this.orderRepository.findAll(status);
  }

  // Lógica de negocio para cálculo de precio
  calculateTotalPrice(items: PizzaItem[]): number {
    return items.reduce((total, item) => {
      const sizePrice = this.getSizePrice(item.size);
      const toppingsPrice = item.toppings.length * 2; // $2 por cada ingrediente
      const itemPrice = (sizePrice + toppingsPrice) * item.quantity;
      return total + itemPrice;
    }, 0);
  }

  private getSizePrice(size: string): number {
    const prices = {
      'S': 10,
      'M': 15,
      'L': 20
    };
    return prices[size as keyof typeof prices] || 0;
  }

  // Método auxiliar para testing
  async clearOrders(): Promise<void> {
    await this.orderRepository.clear();
  }

  // Método auxiliar para testing
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
