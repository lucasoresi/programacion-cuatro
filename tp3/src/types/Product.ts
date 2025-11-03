import { z } from 'zod';

// Schema Zod para validación de productos
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  price: z.number().positive('El precio debe ser positivo'),
});

// Tipo TypeScript inferido del schema
export type Product = z.infer<typeof ProductSchema>;

// Schema para validar array de productos
export const ProductsArraySchema = z.array(ProductSchema);
