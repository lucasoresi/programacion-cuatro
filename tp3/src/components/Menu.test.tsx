import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Menu } from './Menu';
import { OrderProvider } from '../context/OrderContext';

describe('Menu Component', () => {
  it('muestra un listado de productos disponibles', async () => {
    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );

    // Verificar que se muestra un estado de carga inicial
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    // Esperar a que se carguen los productos desde la API mockeada
    await waitFor(() => {
      expect(screen.getByText('Café')).toBeInTheDocument();
    });

    // Verificar que se muestran varios productos
    expect(screen.getByText('Té')).toBeInTheDocument();
    expect(screen.getByText('Café con Leche')).toBeInTheDocument();
    expect(screen.getByText('Cappuccino')).toBeInTheDocument();

    // Verificar que se renderizan como items de lista
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('muestra los precios de los productos', async () => {
    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Café')).toBeInTheDocument();
    });

    // Verificar que se muestran los precios
    expect(screen.getByText(/\$150/)).toBeInTheDocument();
    expect(screen.getByText(/\$120/)).toBeInTheDocument();
  });

  it('muestra botones de agregar para cada producto', async () => {
    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Café')).toBeInTheDocument();
    });

    // Verificar que hay botones de "Agregar"
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    expect(addButtons.length).toBeGreaterThan(0);
  });
});
