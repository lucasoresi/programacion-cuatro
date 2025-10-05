import request from "supertest";
import { createTestApp } from "../utils/testApp";

describe("POST /orders/:id/cancel - integration", () => {
  const app = createTestApp();

  test("200 cancela una orden en estado no entregado (seed order-001 PENDING)", async () => {
    const res = await request(app)
      .post("/orders/order-001/cancel")
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/cancelada/i);
    expect(res.body.data.status).toBe("CANCELLED");
  });

  test("409 no permite cancelar una orden entregada (seed order-004 DELIVERED)", async () => {
    const res = await request(app)
      .post("/orders/order-004/cancel")
      .expect(409);

    // Puede venir como {success:false,error:...} o {message:...}
    expect(res.body.success).toBe(false);
    expect(res.body.error || res.body.message).toBeDefined();
  });
});
