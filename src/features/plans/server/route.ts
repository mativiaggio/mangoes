import { env } from "@/env.config";
import { guestMiddleware } from "@/lib/middlwares";
import { Hono } from "hono";

const app = new Hono()
  .get("/", guestMiddleware, async (c) => {
    const databases = c.get("databases");

    const plans = await databases.listDocuments(
      env.DATABASE_ID,
      env.PLANS_ID
    );

    return c.json({ plans: plans });
  });

export default app;
