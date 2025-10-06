import request from "supertest";
import { createTestApp } from "../utils/testApp";

describe("GET /order/:id - integration", () => {
  const app = createTestApp();

  test("200 devuelve una orden existente por id (seed order-001)", async () => {
    const res = await request(app)
      .get("/order/order-001")
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe("order-001");
  });

  test("404 cuando el id no existe", async () => {
    const res = await request(app)
      .get("/order/no-existe")
      .expect(404);

    // En el manejador de errores, puede venir como {success:false,error:...} o similar
    expect(res.body.success).toBe(false);
    expect(res.body.error || res.body.message).toBeDefined();
  });
});
