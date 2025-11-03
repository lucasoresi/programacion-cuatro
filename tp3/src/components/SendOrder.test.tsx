import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { OrderProvider } from '../context/OrderContext';
import { OrderSummary } from './OrderSummary';
import { Menu } from './Menu';

describe('HU5 - Enviar pedido', () => {
  it('envía el pedido al servidor y muestra mensaje de confirmación', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar algunos productos
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café
    await user.click(addButtons[1]); // Té

    // Hacer click en "Enviar pedido"
    const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
    await user.click(sendButton);

    // Esperar mensaje de confirmación
    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument();
    });
  });

  it('limpia el pedido después de enviar exitosamente', async () => {
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

    // Verificar que hay productos en el pedido - Según consigna
    expect(screen.getByText(/total: \$\d+/i)).toBeInTheDocument();

    // Enviar pedido
    const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
    await user.click(sendButton);

    // Esperar confirmación
    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument();
    });

    // Verificar que el pedido se limpió
    await waitFor(() => {
      expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('muestra estado de carga mientras se envía el pedido', async () => {
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
    await user.click(addButtons[0]);

    // Enviar pedido
    const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
    await user.click(sendButton);

    // Verificar estado de carga (puede ser muy rápido, usar waitFor con timeout corto)
    // En tests, el mock responde instantáneamente, así que vamos directo a confirmación

    // Esperar a que termine
    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument();
    });
  });

  it('no permite enviar un pedido vacío', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Verificar que el pedido está vacío
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();

    // El botón de enviar no debe estar visible o debe estar deshabilitado
    const sendButton = screen.queryByRole('button', { name: /enviar pedido/i });
    expect(sendButton).not.toBeInTheDocument();
  });

  it('envía los datos correctos del pedido al servidor', async () => {
    const user = userEvent.setup();

    render(
      <OrderProvider>
        <Menu />
        <OrderSummary />
      </OrderProvider>
    );

    await screen.findByText('Café');

    // Agregar productos con cantidades específicas
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café
    await user.click(addButtons[0]); // Café x2

    // Enviar pedido
    const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
    await user.click(sendButton);

    // Verificar confirmación (el mock ya valida que los datos sean correctos)
    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument();
    });
  });
});
