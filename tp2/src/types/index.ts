import { z } from 'zod';

// Pizza sizes and toppings enums
export const PizzaSize = {
  S: 'S',
  M: 'M',
  L: 'L'
} as const;

export const OrderStatus = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

// Zod schemas for validation
export const PizzaItemSchema = z.object({
  size: z.enum(['S', 'M', 'L']),
  toppings: z.array(z.string()).max(5, 'Maximum 5 toppings allowed'),
  quantity: z.number().int().positive('Quantity must be positive')
});

export const CreateOrderSchema = z.object({
  items: z.array(PizzaItemSchema).min(1, 'At least one item is required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  customerName: z.string().min(1, 'Customer name is required'),
  phone: z.string().min(1, 'Phone number is required')
});

export const OrderStatusQuerySchema = z.object({
  status: z.enum(['pending', 'preparing', 'ready', 'delivered', 'cancelled']).optional()
});

// TypeScript types derived from Zod schemas
export type PizzaSizeType = keyof typeof PizzaSize;
export type OrderStatusType = keyof typeof OrderStatus;
export type PizzaItem = z.infer<typeof PizzaItemSchema>;
export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;
export type OrderStatusQuery = z.infer<typeof OrderStatusQuerySchema>;

// Domain models
export interface Order {
  id: string;
  items: PizzaItem[];
  address: string;
  customerName: string;
  phone: string;
  status: OrderStatusType;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}