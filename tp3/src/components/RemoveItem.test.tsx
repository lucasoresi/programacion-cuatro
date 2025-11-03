import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { OrderProvider } from '../context/OrderContext';
import { OrderSummary } from './OrderSummary';
import { Menu } from './Menu';

describe('HU4 - Eliminar ítem del pedido', () => {
  it('elimina un producto del pedido al hacer click en Eliminar', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar producto
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café

    // Verificar que está en el pedido
    const orderList = screen.getByRole('list', { name: /pedido/i });
    expect(within(orderList).getByText('Café')).toBeInTheDocument();

    // Eliminar el producto
    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    await user.click(removeButton);

    // Verificar que ya no está en el pedido
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
  });

  it('decrementa la cantidad cuando se elimina un ítem con cantidad > 1', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar mismo producto 3 veces
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    // Verificar cantidad: 3
    expect(screen.getByText(/cantidad: 3/i)).toBeInTheDocument();

    // Eliminar una vez
    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    await user.click(removeButton);

    // Verificar nueva cantidad: 2
    expect(screen.getByText(/cantidad: 2/i)).toBeInTheDocument();
  });

  it('elimina solo el producto seleccionado sin afectar otros', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar dos productos diferentes
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café
    await user.click(addButtons[1]); // Té

    // Verificar que ambos están en el pedido
    const orderList = screen.getByRole('list', { name: /pedido/i });
    expect(within(orderList).getByText('Café')).toBeInTheDocument();
    expect(within(orderList).getByText('Té')).toBeInTheDocument();

    // Eliminar el primer producto (Café)
    const removeButtons = screen.getAllByRole('button', { name: /eliminar/i });
    await user.click(removeButtons[0]);

    // Verificar que solo Té permanece en el pedido (Café sigue en el menú)
    expect(within(orderList).queryByText('Café')).not.toBeInTheDocument();
    expect(within(orderList).getByText('Té')).toBeInTheDocument();
  });

  it('elimina completamente un ítem cuando la cantidad llega a 0', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar producto 2 veces
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    expect(screen.getByText(/cantidad: 2/i)).toBeInTheDocument();

    // Eliminar dos veces
    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    await user.click(removeButton);
    await user.click(removeButton);

    // Verificar que el pedido está vacío
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
  });
});
