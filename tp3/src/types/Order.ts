import { z } from 'zod';
import { Product } from './Product';

// Item del pedido (producto + cantidad)
export interface OrderItem {
  product: Product;
  quantity: number;
}

// Schema para el pedido completo
export const OrderSchema = z.object({
  items: z.array(z.object({
    product: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    }),
    quantity: z.number().positive(),
  })),
  total: z.number().nonnegative(),
});

// Tipo TypeScript para el pedido
export type Order = z.infer<typeof OrderSchema>;

// Tipo para la respuesta del servidor al confirmar pedido
export interface OrderResponse {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'confirmed' | 'pending' | 'failed';
  timestamp: string;
}
