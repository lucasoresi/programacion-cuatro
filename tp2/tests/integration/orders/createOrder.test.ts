import request from "supertest";
import { createTestApp } from "../utils/testApp";

describe("POST /orders - integration", () => {
  const app = createTestApp();

  test("201 crea pedido válido y devuelve success true", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        items: [
          { size: "L", toppings: ["pepperoni", "queso"], quantity: 1 }
        ],
        address: "Av. Corrientes 1234, CABA",
        customerName: "Juan Pérez",
        phone: "+54911234567"
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.status).toBeDefined();
    expect(res.body.data.totalPrice).toBeGreaterThan(0);
  });

  test("422 si items está vacío", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        items: [],
        address: "Av. Corrientes 1234, CABA",
        customerName: "Juan Pérez",
        phone: "+54911234567"
      })
      .expect(422);

    expect(res.body.success).toBe(false);
    expect(res.body.error || res.body.message).toBeDefined();
  });
});
