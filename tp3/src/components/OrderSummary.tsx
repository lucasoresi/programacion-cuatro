import { useState } from 'react';
import { useOrder } from '../hooks/useOrder';

export const OrderSummary = () => {
  const { items, removeItem, getTotal, clearOrder } = useOrder();
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOrder = async () => {
    try {
      setSending(true);
      setError(null);

      const orderData = {
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        total: getTotal(),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }

      const result = await response.json();

      // Mostrar confirmación
      setConfirmed(true);

      // Limpiar pedido después de un breve delay
      setTimeout(() => {
        clearOrder();
        setConfirmed(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSending(false);
    }
  };

  if (confirmed) {
    return (
      <div>
        <h2>Tu Pedido</h2>
        <p>Pedido confirmado</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <h2>Tu Pedido</h2>
        <p>Pedido vacío</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Tu Pedido</h2>
      <ul aria-label="pedido">
        {items.map((item) => (
          <li key={item.product.id}>
            <div>
              <h3>{item.product.name}</h3>
              <p>Precio: ${item.product.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => removeItem(item.product.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h3>Total: ${getTotal()}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={clearOrder} disabled={sending}>
          Limpiar pedido
        </button>
        <button onClick={handleSendOrder} disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar pedido'}
        </button>
      </div>
    </div>
  );
};
