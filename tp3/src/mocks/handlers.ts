import { http, HttpResponse } from 'msw';

// Datos mock de productos
export const mockProducts = [
  { id: '1', name: 'Café', price: 150 },
  { id: '2', name: 'Té', price: 120 },
  { id: '3', name: 'Café con Leche', price: 180 },
  { id: '4', name: 'Cappuccino', price: 200 },
  { id: '5', name: 'Medialuna', price: 100 },
  { id: '6', name: 'Tostado', price: 250 },
];

// Handlers para interceptar requests HTTP
export const handlers = [
  // GET /api/menu - Devuelve el listado de productos
  http.get('/api/menu', () => {
    return HttpResponse.json(mockProducts);
  }),

  // POST /api/orders - Recibe y confirma un pedido
  http.post('/api/orders', async ({ request }) => {
    const order = await request.json();

    return HttpResponse.json({
      id: crypto.randomUUID(),
      ...order,
      status: 'confirmed',
      timestamp: new Date().toISOString(),
    }, { status: 201 });
  }),
];
