# 🍕 Pizzeria API - TP2

API REST para sistema de pedidos de pizzería desarrollada con **TDD** usando TypeScript, Express y Zod.

## 📋 Requisitos Técnicos

- **Node.js**: 18+
- **Tecnologías**: TypeScript, Express, Zod
- **Testing**: Jest + Supertest
- **Cobertura**: ≥80%

## 🚀 Instalación y Ejecución

```bash
# Clonar e instalar dependencias
cd pizzeria-api
npm install

# Desarrollo
npm run dev          # Servidor con hot-reload

# Testing
npm test             # Ejecutar todos los tests
npm run test:unit    # Solo tests unitarios
npm run test:integration # Solo tests de integración
npm run test:coverage    # Tests con reporte de cobertura
npm run test:watch   # Tests en modo watch

# Producción
npm run build        # Compilar TypeScript
npm start           # Ejecutar en producción

# Linting
npm run lint         # Verificar código
npm run lint:fix     # Corregir problemas automáticamente
```

## 📊 Endpoints

### POST /orders
Crear nuevo pedido de pizza.

**Body:**
```json
{
  "items": [
    {
      "size": "M",
      "toppings": ["pepperoni", "cheese"],
      "quantity": 2
    }
  ],
  "address": "Av. Corrientes 1234, CABA",
  "customerName": "Juan Pérez",
  "phone": "+54911234567"
}
```

**Respuesta 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "items": [...],
    "address": "Av. Corrientes 1234, CABA",
    "customerName": "Juan Pérez",
    "phone": "+54911234567",
    "status": "PENDING",
    "totalPrice": 34,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
}
```

### GET /orders/:id
Obtener pedido por ID.

**Respuesta 200:**
```json
{
  "success": true,
  "data": { /* orden completa */ }
}
```

### POST /orders/:id/cancel
Cancelar pedido existente.

**Respuesta 200:**
```json
{
  "success": true,
  "data": { /* orden cancelada */ },
  "message": "Order cancelled successfully"
}
```

### GET /orders?status=pending
Obtener todos los pedidos, con filtro opcional por estado.

**Query params:**
- `status` (opcional): `pending`, `preparing`, `ready`, `delivered`, `cancelled`

**Respuesta 200:**
```json
{
  "success": true,
  "data": [ /* array de órdenes */ ]
}
```

## 🧪 Ejemplos cURL

```bash
# Crear pedido
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"size": "L", "toppings": ["pepperoni"], "quantity": 1}],
    "address": "Av. Santa Fe 1234, CABA",
    "customerName": "María García",
    "phone": "+54911234567"
  }'

# Obtener pedido por ID
curl http://localhost:3000/orders/YOUR_ORDER_ID

# Cancelar pedido
curl -X POST http://localhost:3000/orders/YOUR_ORDER_ID/cancel

# Listar pedidos por estado
curl "http://localhost:3000/orders?status=pending"

# Health check
curl http://localhost:3000/health
```

## 🔧 Reglas de Negocio

- **Tamaños válidos**: S, M, L
- **Máximo 5 toppings** por pizza
- **Precio calculado**: size + toppings ($2 c/u) × quantity
- **No se puede cancelar** si status = "delivered"
- **Address mínimo** 10 caracteres
- **Items no puede estar vacío**

## ❌ Códigos de Error

- **422**: Validación fallida (Zod)
- **409**: No se puede cancelar pedido entregado
- **404**: Pedido no encontrado
- **500**: Error interno del servidor

## 🧪 Matriz de Casos de Prueba

| ID | Descripción | Precondición | Input | Acción | Resultado Esperado | Test |
|----|-------------|--------------|-------|--------|-------------------|------|
| CA-01 | Crear pedido válido | API funcionando | Datos válidos completos | POST /orders | 201, pedido creado | `createOrder.test.ts` |
| CA-02 | Items vacío | API funcionando | items: [] | POST /orders | 422, error validación | `createOrder.test.ts` |
| CA-03 | Cancelar pendiente | Pedido existe, status=pending | ID válido | POST /orders/:id/cancel | 200, cancelado | `cancelOrder.test.ts` |
| CA-04 | Cancelar entregado | Pedido existe, status=delivered | ID válido | POST /orders/:id/cancel | 409, error negocio | `cancelOrder.test.ts` |

## 📁 Estructura del Proyecto

```
pizzeria-api/
├── src/
│   ├── controllers/     # Controladores HTTP
│   ├── services/        # Lógica de negocio
│   ├── routes/          # Definición de rutas
│   ├── middleware/      # Middleware de Express
│   ├── types/           # Tipos y schemas Zod
│   ├── app.ts          # Configuración de Express (sin listen)
│   └── server.ts       # Punto de entrada con listen
├── tests/
│   ├── unit/           # Tests unitarios
│   ├── integration/    # Tests de integración
│   └── setup.ts        # Configuración de Jest
└── docs/               # Documentación adicional
```

## 🎯 User Stories Implementadas

- ✅ **Como cliente, quiero crear un pedido** con items, dirección y datos personales
- ✅ **Como cliente, quiero consultar mi pedido** por ID
- ✅ **Como cliente, quiero cancelar mi pedido** si aún no fue entregado
- ✅ **Como administrador, quiero listar pedidos** filtrados por estado

## 🏗️ Evidencia de TDD

Este proyecto fue desarrollado siguiendo el ciclo **Rojo → Verde → Refactor**:

1. **Rojo**: Escribir test que falla
2. **Verde**: Implementación mínima para pasar test
3. **Refactor**: Mejorar código manteniendo tests verdes

Ver commits del historial para evidencia del proceso TDD por cada user story.

## 📈 Cobertura de Tests

```bash
npm run test:coverage
```

Objetivo: **≥80%** en branches, functions, lines y statements.

## 🔗 Tecnologías Utilizadas

- **Express**: Framework web
- **TypeScript**: Tipado estático
- **Zod**: Validación de esquemas
- **Jest**: Framework de testing
- **Supertest**: Tests de integración HTTP
- **ESLint**: Linting de código