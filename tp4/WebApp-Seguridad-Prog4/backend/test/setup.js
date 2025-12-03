// Mock de la base de datos para los tests
const mockDb = {
  query: jest.fn((query, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    
    // Simular respuestas según la query y parámetros
    if (query.includes('SELECT * FROM users')) {
      callback(null, [{
        id: 1,
        username: 'testuser',
        password: '$2a$10$YourHashedPasswordHere',
        email: 'test@example.com'
      }]);
    } else if (query.includes('SELECT COUNT(*)')) {
      callback(null, [{ count: 1 }]);
    } else if (query.includes('SELECT * FROM products')) {
      // Para consultas parametrizadas, verificar los parámetros
      if (params && params.length > 0) {
        // Si hay parámetros, verificar si son válidos
        const hasValidCategory = params.some(param => 
          typeof param === 'string' && 
          param === 'Electronics' || 
          param === 'Furniture' || 
          param === 'Test'
        );
        
        if (hasValidCategory) {
          // Devolver productos solo si la categoría es válida
          callback(null, [
            { id: 1, name: 'Test Product', category: params.find(p => typeof p === 'string'), price: 10, stock: 100 }
          ]);
        } else {
          // Para inyecciones SQL o categorías inválidas, no devolver resultados
          callback(null, []);
        }
      } else {
        // Sin parámetros (consulta básica), devolver resultados de prueba
        callback(null, [
          { id: 1, name: 'Test Product', category: 'Test', price: 10, stock: 100 }
        ]);
      }
    } else {
      callback(null, []);
    }
  }),
  connect: jest.fn((callback) => callback(null))
};

// Mock del módulo de database
jest.mock('../src/config/database', () => ({
  db: mockDb,
  connectWithRetry: jest.fn()
}));

// Variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_NAME = 'test_db';

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});
