import express from "express";
import cors from "cors";
import { orderRoutes } from "../../../src/routes/orderRoutes";
import { orderSingleRoutes } from "../../../src/routes/orderSingleRoutes";
import { errorHandler } from "../../../src/middleware/errorHandler";

export function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Montamos únicamente las rutas necesarias para pruebas de órdenes
  app.use("/orders", orderRoutes);
  app.use("/order", orderSingleRoutes);

  // Middleware global de manejo de errores para mapear 404/409/422 correctamente
  app.use(errorHandler);

  return app;
}
