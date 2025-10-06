import request from "supertest";
import { createTestApp } from "../utils/testApp";

describe("GET /orders - integration", () => {
  const app = createTestApp();

  test("200 lista todas las órdenes", async () => {
    const res = await request(app)
      .get("/orders")
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("200 filtra por status = preparing (seed order-002)", async () => {
    const res = await request(app)
      .get("/orders?status=preparing")
      .expect(200);

    expect(res.body.success).toBe(true);
    const arr = res.body.data as any[];
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBeGreaterThan(0);
    for (const o of arr) {
      expect(String(o.status).toLowerCase()).toBe("preparing");
    }
  });
});
