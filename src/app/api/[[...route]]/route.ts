import auth from "@/features/auth/server/route";
import users from "@/features/users/server/route";
import tickets from "@/features/ticketing-system/server/route";
import files from "@/features/files/server/route";
import categories from "@/features/categories/server/route";
import plans from "@/features/plans/server/route";
import mercadopago from "@/features/mercadopago/server/route";

import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/users", users)
  .route("/tickets", tickets)
  .route("/files", files)
  .route("/categories", categories)
  .route("/plans", plans)
  .route("/mercadopago", mercadopago);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
