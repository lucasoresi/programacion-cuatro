# TEORIA.md - Trabajo Práctico 2

## 1. Explique el ciclo Rojo → Verde → Refactor y por qué es importante el tamaño de los pasos.

El ciclo **Rojo → Verde → Refactor** es el núcleo de TDD. **Rojo**: escribir un test que falle para una funcionalidad específica. **Verde**: implementar el código mínimo necesario para hacer pasar el test. **Refactor**: mejorar el código (tanto producción como tests) sin cambiar su comportamiento, manteniendo todos los tests verdes.

El tamaño pequeño de los pasos es crucial porque permite avanzar con confianza, recibir feedback inmediato, y facilita la localización de errores. Pasos grandes aumentan la complejidad y hacen más difícil identificar qué causó una falla, violando el principio de "una sola responsabilidad por iteración".

## 2. Diferencie tests unitarios, de integración y E2E en APIs.

**Tests unitarios** prueban una unidad aislada (función, clase, método) con todas sus dependencias mockeadas. En APIs, testean servicios de negocio, validadores, o utilidades sin tocar HTTP ni base de datos.

**Tests de integración** verifican la interacción entre componentes reales del sistema. En APIs, testean endpoints HTTP completos usando Supertest, validando status codes, headers y body responses, pero pueden usar bases de datos en memoria.

**Tests E2E** prueban el flujo completo desde la perspectiva del usuario final, incluyendo base de datos real, servicios externos, y todos los componentes del sistema funcionando juntos.

## 3. ¿Qué es un doble de prueba? Defina mock, stub y spy y cuándo conviene cada uno.

Un **doble de prueba** es un objeto que reemplaza una dependencia real durante las pruebas. **Mock**: objeto que verifica que ciertos métodos fueron llamados con parámetros específicos; útil para verificar interacciones. **Stub**: objeto que devuelve respuestas predefinidas; útil para simular dependencias externas. **Spy**: wrapper que permite observar llamadas a un objeto real; útil cuando necesitas el comportamiento original pero quieres verificar interacciones.

Usar **mocks** para verificar comportamiento, **stubs** para controlar dependencias externas, y **spies** cuando necesitas funcionalidad real con observabilidad.

## 4. ¿Por qué es útil separar app de server? Muestre un ejemplo mínimo con makeApp() y un test de integración con Supertest.

Separar **app** de **server** permite testear la aplicación sin iniciar un servidor real, evitando conflictos de puertos y mejorando la velocidad de tests.

```typescript
// app.ts
export function makeApp() {
  const app = express();
  app.get('/health', (req, res) => res.json({status: 'OK'}));
  return app;
}

// server.ts
const app = makeApp();
app.listen(3000);

// test
import request from 'supertest';
import { makeApp } from '../app';

test('health endpoint returns OK', async () => {
  const app = makeApp();
  const response = await request(app).get('/health');
  expect(response.status).toBe(200);
  expect(response.body.status).toBe('OK');
});
```

## 5. Zod: diferencia entre parse y safeParse. ¿Dónde usaría cada uno en una ruta Express y por qué?

**parse()** lanza una excepción si la validación falla, útil cuando queremos que el error se propague automáticamente al middleware de manejo de errores. **safeParse()** retorna un objeto con `success` boolean y `data` o `error`, útil cuando queremos manejar errores de validación de forma personalizada.

En Express, usaría **parse()** en middleware de validación para aprovechar el error handling centralizado, y **safeParse()** en controladores cuando necesito lógica condicional basada en el resultado de validación o respuestas de error más específicas.

## 6. Dé dos ejemplos de reglas de dominio que deben probarse con tests unitarios.

**Ejemplo 1**: Cálculo de precio total de pizza - verificar que el precio se calcula correctamente según tamaño (S=$10, M=$15, L=$20) + toppings ($2 c/u) × cantidad, independientemente de HTTP o persistencia.

**Ejemplo 2**: Validación de cancelación de pedidos - verificar que no se puede cancelar un pedido con status "delivered", pero sí con otros estados, testando solo la lógica de negocio sin involucrar base de datos o API calls.

## 7. ¿Qué malos olores suele haber en suites de tests? Dé 3 ejemplos.

**Nombres poco descriptivos**: tests llamados "test1" o "should work" en lugar de "should return 409 when cancelling delivered order". **Duplicación de setup**: repetir el mismo código de preparación en múltiples tests sin extraer helpers o usar beforeEach. **Asserts débiles**: usar solo `expect(result).toBeTruthy()` en lugar de verificaciones específicas como `expect(result.status).toBe(200)` y `expect(result.body.success).toBe(true)`.

## 8. ¿Cómo trazará criterios de aceptación ↔ tests? Incluya un mini ejemplo de tabla con 2 filas.

Mapear cada criterio de aceptación a tests específicos mediante una matriz que vincule funcionalidad con verificación:

| Criterio de Aceptación | Test |
|------------------------|------|
| Como cliente, quiero crear pedido con items válidos para recibir confirmación | `POST /orders with valid data returns 201 and order object` |
| Como cliente, no puedo cancelar pedido entregado para mantener integridad | `POST /orders/:id/cancel with delivered status returns 409 error` |

## 9. ¿Por qué no perseguir 100% de cobertura a toda costa? Mencione riesgos/limitaciones.

Buscar 100% de cobertura puede llevar a **tests frágiles** que prueban implementación en lugar de comportamiento, **falsa sensación de seguridad** (alta cobertura ≠ calidad), y **desperdicio de tiempo** testeando código trivial como getters/setters. También puede generar **tests sin valor** solo para alcanzar métricas.

La cobertura mide qué código se ejecuta, no la calidad de las verificaciones. Es mejor tener 80% de cobertura con tests significativos que 100% con tests superficiales.

## 10. Defina y dé un ejemplo de helper/builder para tests.

Un **helper/builder** es una función utilitaria que simplifica la creación de datos de prueba complejos, reduciendo duplicación y mejorando legibilidad.

```typescript
// Test helper/builder
export class OrderBuilder {
  private order = {
    items: [{size: 'M', toppings: ['cheese'], quantity: 1}],
    address: 'Test Address 123',
    customerName: 'Test Customer',
    phone: '+54911234567'
  };

  withItems(items: PizzaItem[]) {
    this.order.items = items;
    return this;
  }

  withAddress(address: string) {
    this.order.address = address;
    return this;
  }

  build() {
    return { ...this.order };
  }
}

// Uso en tests
const validOrder = new OrderBuilder().build();
const invalidOrder = new OrderBuilder().withAddress('short').build();
```