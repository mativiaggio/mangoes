import { env } from "@/env.config";
import { Categories } from "@/lib/appwrite-types";
import { sessionMiddleware } from "@/lib/middlwares";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { categorySchema } from "../schemas";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const categories = await databases.listDocuments(
      env.DATABASE_ID,
      env.CATEGORIES_ID
    );

    return c.json({ categories: categories });
  })
  .get("/parents", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const categories = await databases.listDocuments(
      env.DATABASE_ID,
      env.CATEGORIES_ID,
      [Query.isNull("parent_category_id")]
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
  })
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", categorySchema),
    async (c) => {
      const database = c.get("databases");
      const data = c.req.valid("json");

      const formattedData = {
        ...data,
        labels: data.labels
          ? data.labels.split(",").map((label) => label.trim())
          : [],
      };

      const category = await database.createDocument(
        env.DATABASE_ID,
        env.CATEGORIES_ID,
        ID.unique(),
        formattedData
      );

      return c.json({ category: category });
    }
  );

export default app;
