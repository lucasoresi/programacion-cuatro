import { createContext, ReactNode, useState } from 'react';
import { Product } from '../types/Product';
import { OrderItem } from '../types/Order';

interface OrderContextType {
  items: OrderItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearOrder: () => void;
  getTotal: () => number;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      // Verificar si el producto ya existe en el pedido
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Si existe, incrementar cantidad
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        return newItems;
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex === -1) {
        return prevItems;
      }

      const existingItem = prevItems[existingItemIndex];

      if (existingItem.quantity > 1) {
        // Si hay más de 1, decrementar cantidad
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        return newItems;
      } else {
        // Si hay 1, remover completamente del pedido
        return prevItems.filter((item) => item.product.id !== productId);
      }
    });
  };

  const clearOrder = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearOrder,
        getTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
