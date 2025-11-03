import { useEffect, useState } from 'react';
import { Product, ProductsArraySchema } from '../types/Product';
import { useOrder } from '../hooks/useOrder';

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useOrder();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');

        if (!response.ok) {
          throw new Error('Error al cargar el menú');
        }

        const data = await response.json();

        // Validar datos con Zod
        const validatedProducts = ProductsArraySchema.parse(data);
        setProducts(validatedProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div>Cargando menú...</div>;
  }

  if (error) {
    return <div>Error al cargar menú: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No hay productos disponibles</div>;
  }

  return (
    <div>
      <h2>Menú</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addItem(product)}>Agregar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
