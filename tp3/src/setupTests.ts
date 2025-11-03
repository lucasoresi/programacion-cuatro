import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Establecer servidor MSW antes de todos los tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Resetear handlers después de cada test
afterEach(() => server.resetHandlers());

// Cerrar servidor después de todos los tests
afterAll(() => server.close());
