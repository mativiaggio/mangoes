import { env } from "@/env.config";
import { Categories } from "@/lib/appwrite-types";
import { sessionMiddleware } from "@/lib/middlwares";
import { Hono } from "hono";
import { Query } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const categories = await databases.listDocuments(
      env.DATABASE_ID,
      env.CATEGORIES_ID
    );

    return c.json({ categories: categories });
  })
  .get("/find-by-slug/:slug", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const slug = c.req.param("slug");
    const categories = await database.listDocuments(
      env.DATABASE_ID,
      env.CATEGORIES_ID,
      [Query.equal("slug", slug)]
    );

    const category: Categories = categories.documents[0];

    return c.json({ category });
  });

export default app;
