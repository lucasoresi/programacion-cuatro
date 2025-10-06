import { Order } from '../types/index.js';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(status?: string): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  clear(): Promise<void>;
}
