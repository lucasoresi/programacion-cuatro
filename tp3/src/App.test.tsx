import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App - Test de Integración Completo', () => {
  it('flujo completo: cargar menú → agregar productos → calcular total → enviar pedido', async () => {
    const user = userEvent.setup();

    render(<App />);

    // 1. Verificar que la app se renderiza correctamente
    expect(screen.getByText(/cafetería digital/i)).toBeInTheDocument();

    // 2. Esperar a que se cargue el menú desde la API mock
    await waitFor(() => {
      expect(screen.getByText('Café')).toBeInTheDocument();
    });

    // Verificar que todos los productos están disponibles
    expect(screen.getByText('Té')).toBeInTheDocument();
    expect(screen.getByText('Cappuccino')).toBeInTheDocument();

    // 3. Verificar que el pedido está vacío inicialmente
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();

    // 4. Agregar productos al pedido
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });

    // Agregar Café ($150) x2
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    // Agregar Té ($120) x1
    await user.click(addButtons[1]);

    // Agregar Cappuccino ($200) x1
    await user.click(addButtons[3]);

    // 5. Verificar que los productos aparecen en el pedido
    expect(screen.getByText(/cantidad: 2/i)).toBeInTheDocument(); // Café x2

    // 6. Verificar que el total se calcula correctamente - Según consigna
    // Total: (150*2) + 120 + 200 = 300 + 120 + 200 = 620
    expect(screen.getByText(/total: \$620/i)).toBeInTheDocument();

    // 7. Eliminar un producto
    const removeButtons = screen.getAllByRole('button', { name: /eliminar/i });
    await user.click(removeButtons[0]); // Eliminar una unidad de Café

    // 8. Verificar que el total se actualiza - Según consigna
    // Nuevo total: (150*1) + 120 + 200 = 470
    await waitFor(() => {
      expect(screen.getByText(/total: \$470/i)).toBeInTheDocument();
    });

    // 9. Enviar el pedido
    const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
    await user.click(sendButton);

    // 11. Verificar mensaje de confirmación
    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument();
    });

    // 12. Verificar que el pedido se limpia después de enviarse
    await waitFor(() => {
      expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('permite realizar múltiples pedidos consecutivos', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Esperar menú
    await screen.findByText('Café');

    // Primer pedido
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]); // Café

    expect(screen.getByText(/total: \$150/i)).toBeInTheDocument();

    const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/pedido confirmado/i)).toBeInTheDocument();
    });

    // Esperar a que se limpie
    await waitFor(() => {
      expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Segundo pedido
    const newAddButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(newAddButtons[1]); // Té

    expect(screen.getByText(/total: \$120/i)).toBeInTheDocument();
  });

  it('muestra todos los elementos de la interfaz', async () => {
    render(<App />);

    // Header
    expect(screen.getByRole('heading', { name: /cafetería digital/i })).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/desarrollado con tdd/i)).toBeInTheDocument();

    // Esperar menú
    await screen.findByText('Café');

    // Secciones principales
    expect(screen.getByRole('heading', { name: /menú/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /tu pedido/i })).toBeInTheDocument();
  });

  it('maneja correctamente el botón de limpiar pedido', async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText('Café');

    // Agregar productos
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    // Verificar que hay productos - Según consigna
    expect(screen.getByText(/total: \$\d+/i)).toBeInTheDocument();

    // Limpiar pedido
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);

    // Verificar que se limpió
    expect(screen.getByText(/pedido vacío/i)).toBeInTheDocument();
  });
});
