import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { OrderProvider } from '../context/OrderContext';
import { OrderSummary } from './OrderSummary';
import { Menu } from './Menu';

describe('HU6 - Casos límite', () => {
  describe('Menú vacío', () => {
    beforeEach(() => {
      // Mockear endpoint que devuelve array vacío
      server.use(
        http.get('/api/menu', () => {
          return HttpResponse.json([]);
        })
      );
    });

    it('muestra mensaje cuando no hay productos disponibles', async () => {
      render(
        <OrderProvider>
          <Menu />
        </OrderProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument();
      });
    });

    it('no muestra la lista de productos cuando está vacía', async () => {
      render(
        <OrderProvider>
          <Menu />
        </OrderProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument();
      });

      // No debe haber lista de productos
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Error al cargar menú', () => {
    beforeEach(() => {
      // Mockear endpoint que devuelve error 500
      server.use(
        http.get('/api/menu', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );
    });

    it('muestra mensaje de error cuando falla la carga del menú', async () => {
      render(
        <OrderProvider>
          <Menu />
        </OrderProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/error al cargar menú/i)).toBeInTheDocument();
      });
    });

    it('no muestra la lista de productos cuando hay error', async () => {
      render(
        <OrderProvider>
          <Menu />
        </OrderProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/error al cargar menú/i)).toBeInTheDocument();
      });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Error al enviar pedido', () => {
    beforeEach(() => {
      // Mockear endpoint POST que devuelve error
      server.use(
        http.post('/api/orders', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );
    });

    it('muestra mensaje de error cuando falla el envío del pedido', async () => {
      const user = userEvent.setup();

      render(
        <OrderProvider>
          <Menu />
          <OrderSummary />
        </OrderProvider>
      );

      // Esperar a que cargue el menú
      await screen.findByText('Café');

      // Agregar un producto
      const addButtons = screen.getAllByRole('button', { name: /agregar/i });
      await user.click(addButtons[0]);

      // Intentar enviar pedido
      const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
      await user.click(sendButton);

      // Verificar mensaje de error
      await waitFor(() => {
        expect(screen.getByText(/error al enviar el pedido/i)).toBeInTheDocument();
      });
    });

    it('mantiene el pedido cuando falla el envío', async () => {
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

      // Verificar total inicial - Según consigna
      expect(screen.getByText(/total: \$150/i)).toBeInTheDocument();

      // Intentar enviar
      const sendButton = screen.getByRole('button', { name: /enviar pedido/i });
      await user.click(sendButton);

      // Esperar error
      await waitFor(() => {
        expect(screen.getByText(/error al enviar el pedido/i)).toBeInTheDocument();
      });

      // Verificar que el pedido no se limpió - Según consigna
      expect(screen.getByText(/total: \$150/i)).toBeInTheDocument();
    });
  });

  describe('Datos inválidos', () => {
    beforeEach(() => {
      // Mockear endpoint que devuelve datos con formato inválido
      server.use(
        http.get('/api/menu', () => {
          return HttpResponse.json([
            { id: '1', name: 'X', price: -100 }, // Precio negativo
          ]);
        })
      );
    });

    it('maneja datos inválidos de productos', async () => {
      render(
        <OrderProvider>
          <Menu />
        </OrderProvider>
      );

      await waitFor(() => {
        // Zod debería rechazar datos inválidos
        expect(
          screen.getByText(/error al cargar menú/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Red lenta o timeout', () => {
    it('muestra estado de carga mientras espera respuesta', async () => {
      // Mockear endpoint con delay
      server.use(
        http.get('/api/menu', async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json([
            { id: '1', name: 'Café', price: 150 },
          ]);
        })
      );

      render(
        <OrderProvider>
          <Menu />
        </OrderProvider>
      );

      // Verificar estado de carga
      expect(screen.getByText(/cargando/i)).toBeInTheDocument();

      // Esperar a que termine
      await waitFor(() => {
        expect(screen.getByText('Café')).toBeInTheDocument();
      });

      // El mensaje de carga debe desaparecer
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });
  });
});
