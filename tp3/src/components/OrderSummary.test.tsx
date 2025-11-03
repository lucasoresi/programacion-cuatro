import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { OrderProvider } from '../context/OrderContext';
import { OrderSummary } from './OrderSummary';
import { Menu } from './Menu';

describe('OrderSummary - Agregar productos al pedido', () => {
  it('muestra productos agregados cuando se hace click en Agregar', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    // Esperar a que se cargue el menú
    await screen.findByText('Café');

    // Verificar que el pedido está vacío inicialmente
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();

    // Hacer click en el botón "Agregar" del primer producto (Café)
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);

    // Verificar que el producto aparece en el área de pedido
    const orderList = screen.getByRole('list', { name: /pedido/i });
    expect(orderList).toBeInTheDocument();

    // Verificar que "Café" aparece en el pedido
    expect(screen.getAllByText('Café')).toHaveLength(2); // 1 en menú, 1 en pedido
  });

  it('incrementa la cantidad cuando se agrega el mismo producto múltiples veces', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar el mismo producto 3 veces
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    // Verificar que se muestra la cantidad
    expect(screen.getByText(/cantidad: 3/i)).toBeInTheDocument();
  });

  it('puede agregar múltiples productos diferentes', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar diferentes productos
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café
    await user.click(addButtons[1]); // Té
    await user.click(addButtons[2]); // Café con Leche

    // Verificar que todos aparecen en el pedido
    const orderList = screen.getByRole('list', { name: /pedido/i });
    const orderItems = within(orderList).getAllByRole('listitem');
    expect(orderItems).toHaveLength(3);
  });
});
