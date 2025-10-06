import { Order } from '../types/index.js';
import { OrderRepository } from './OrderRepository.js';

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, Order> = new Map();

  constructor() {
    this.loadSeedData();
  }

  async save(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  async findAll(status?: string): Promise<Order[]> {
    const allOrders = Array.from(this.orders.values());
    
    if (status) {
      return allOrders.filter(order => 
        order.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    return allOrders;
  }

  async update(order: Order): Promise<Order> {
    if (!this.orders.has(order.id)) {
      throw new Error(`Orden con id ${order.id} no encontrada`);
    }
    this.orders.set(order.id, order);
    return order;
  }

  async clear(): Promise<void> {
    this.orders.clear();
  }

  // Método para cargar datos de ejemplo
  private loadSeedData(): void {
    const sampleOrders: Order[] = [
      {
        id: 'order-001',
        items: [
          {
            size: 'L',
            toppings: ['pepperoni', 'queso', 'champinones'],
            quantity: 1
          }
        ],
        address: 'Av. Corrientes 1234, CABA, Buenos Aires',
        customerName: 'Juan Pérez',
        phone: '+54911234567',
        status: 'PENDING',
        totalPrice: 26, // L=20 + 3 toppings=6
        createdAt: new Date('2024-01-15T10:30:00Z'),
        updatedAt: new Date('2024-01-15T10:30:00Z')
      },
      {
        id: 'order-002',
        items: [
          {
            size: 'M',
            toppings: ['queso', 'tomate'],
            quantity: 2
          },
          {
            size: 'S',
            toppings: ['pepperoni'],
            quantity: 1
          }
        ],
        address: 'Av. Santa Fe 5678, Palermo, CABA',
        customerName: 'María García',
        phone: '+54911987654',
        status: 'PREPARING',
        totalPrice: 50, // (M=15 + 2 toppings=4) * 2 + (S=10 + 1 topping=2) = 38 + 12 = 50
        createdAt: new Date('2024-01-15T11:15:00Z'),
        updatedAt: new Date('2024-01-15T11:45:00Z')
      },
      {
        id: 'order-003',
        items: [
          {
            size: 'S',
            toppings: ['queso'],
            quantity: 3
          }
        ],
        address: 'Av. Cabildo 9012, Belgrano, CABA',
        customerName: 'Carlos Rodriguez',
        phone: '+54911555444',
        status: 'READY',
        totalPrice: 36, // (S=10 + 1 topping=2) * 3 = 36
        createdAt: new Date('2024-01-15T09:00:00Z'),
        updatedAt: new Date('2024-01-15T12:30:00Z')
      },
      {
        id: 'order-004',
        items: [
          {
            size: 'L',
            toppings: ['pepperoni', 'queso', 'aceitunas', 'pimientos', 'cebollas'],
            quantity: 1
          }
        ],
        address: 'Av. Rivadavia 3456, San Telmo, CABA',
        customerName: 'Ana Martinez',
        phone: '+54911333222',
        status: 'DELIVERED',
        totalPrice: 30, // L=20 + 5 toppings=10
        createdAt: new Date('2024-01-14T19:20:00Z'),
        updatedAt: new Date('2024-01-14T20:45:00Z')
      },
      {
        id: 'order-005',
        items: [
          {
            size: 'M',
            toppings: ['queso', 'jamon'],
            quantity: 1
          }
        ],
        address: 'Av. Las Heras 7890, Recoleta, CABA',
        customerName: 'Luis Fernandez',
        phone: '+54911111000',
        status: 'CANCELLED',
        totalPrice: 19, // M=15 + 2 toppings=4
        createdAt: new Date('2024-01-14T16:10:00Z'),
        updatedAt: new Date('2024-01-14T16:25:00Z')
      }
    ];

    // Cargar datos de ejemplo
    sampleOrders.forEach(order => {
      this.orders.set(order.id, order);
    });
  }

  // Método auxiliar para obtener todos los pedidos (útil para debugging)
  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }
}
