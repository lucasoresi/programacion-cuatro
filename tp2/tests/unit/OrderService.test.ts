import { OrderService } from "../../src/services/OrderService";
import { InMemoryOrderRepository } from "../../src/repositories/InMemoryOrderRepository";

describe("OrderService - unit", () => {
  let service: OrderService;

  beforeEach(() => {
    // Usamos un repositorio en memoria nuevo por test para aislar el estado
    service = new OrderService(new InMemoryOrderRepository());
  });

  test("createOrder debería crear una orden con status PENDING y total calculado", async () => {
    const order = await service.createOrder({
      items: [
        { size: "M", toppings: ["pepperoni", "queso"], quantity: 2 },
        { size: "S", toppings: [], quantity: 1 }
      ],
      address: "Av. Corrientes 1234, CABA",
      customerName: "Juan Pérez",
      phone: "+54911234567"
    });

    expect(order.id).toBeDefined();
    expect(order.status).toBe("PENDING");
    // (M=15 + 2*2=4) * 2 = 38; (S=10 + 0) * 1 = 10; total = 48
    expect(order.totalPrice).toBe(48);
  });

  test("getOrderById con id inexistente lanza NotFoundError", async () => {
    await expect(service.getOrderById("no-existe"))
      .rejects.toMatchObject({ name: "NotFoundError" });
  });

  test("cancelOrder sobre entregada lanza BusinessLogicError", async () => {
    // En el repositorio seed, existe order-004 con status DELIVERED
    await expect(service.cancelOrder("order-004"))
      .rejects.toMatchObject({ name: "BusinessLogicError" });
  });
});
