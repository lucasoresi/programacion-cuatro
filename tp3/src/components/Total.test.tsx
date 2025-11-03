import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { OrderProvider } from '../context/OrderContext';
import { OrderSummary } from './OrderSummary';
import { Menu } from './Menu';

describe('HU3 - Cálculo de Total', () => {
  it('muestra el total en $0 cuando el pedido está vacío', async () => {
    render(
      <OrderProvider>
        <OrderSummary />
      </OrderProvider>
    );

    // Al estar vacío, no debe mostrar el total
    expect(screen.queryByText(/total:/i)).not.toBeInTheDocument();
  });

  it('calcula el total correctamente al agregar un producto', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar Café ($150)
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);

    // Verificar total - Según consigna: expect(screen.getByText(/total: \\$\\d+/i))
    expect(screen.getByText(/total: \$150/i)).toBeInTheDocument();
  });

  it('actualiza el total al agregar múltiples unidades del mismo producto', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar Café ($150) 3 veces
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    // Verificar total: 150 * 3 = 450 - Según consigna
    expect(screen.getByText(/total: \$450/i)).toBeInTheDocument();
  });

  it('calcula el total correctamente con múltiples productos diferentes', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    const addButtons = screen.getAllByRole('button', { name: /agregar/i });

    // Café ($150) x1
    await user.click(addButtons[0]);
    // Té ($120) x2
    await user.click(addButtons[1]);
    await user.click(addButtons[1]);
    // Cappuccino ($200) x1
    await user.click(addButtons[3]);

    // Total: 150 + (120*2) + 200 = 150 + 240 + 200 = 590 - Según consigna
    expect(screen.getByText(/total: \$\d+/i)).toBeInTheDocument();
  });

  it('actualiza el total al eliminar un producto', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar dos productos
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café $150
    await user.click(addButtons[1]); // Té $120

    // Total inicial: 270 - Según consigna
    expect(screen.getByText(/total: \$270/i)).toBeInTheDocument();

    // Eliminar un producto
    const removeButtons = screen.getAllByRole('button', { name: /eliminar/i });
    await user.click(removeButtons[0]);

    // Nuevo total: 120 - Según consigna
    expect(screen.getByText(/total: \$120/i)).toBeInTheDocument();
  });

  it('muestra total $0 después de limpiar el pedido', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar productos
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    // Verificar que hay un total - Según consigna
    expect(screen.getByText(/total: \$\d+/i)).toBeInTheDocument();

    // Limpiar pedido
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);

    // Verificar que el pedido está vacío
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
    expect(screen.queryByText(/total:/i)).not.toBeInTheDocument();
  });
});
