import { env } from "@/env.config";
import { Tickets } from "@/lib/appwrite-types";
import { sessionMiddleware } from "@/lib/middlwares";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { ticketSchema } from "../schemas";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const tickets = await database.listDocuments(
      env.DATABASE_ID,
      env.TICKETS_ID,
      [Query.orderDesc("$createdAt")]
    );

    return c.json({ tickets: tickets });
  })
  .get("/find-by-id/:id", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const ticketId = c.req.param("id");
    const ticket: Tickets = await database.getDocument(
      env.DATABASE_ID,
      env.TICKETS_ID,
      ticketId
    );

    return c.json({ ticket });
  })
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", ticketSchema),
    async (c) => {
      const database = c.get("databases");
      const user = c.get("user");
      const data = c.req.valid("json");

      const userDocument = await database.listDocuments(
        env.DATABASE_ID,
        env.USERS_ID,
        [Query.equal("user_id", user.$id)]
      );

      if (userDocument.documents.length === 0) {
        return c.json(
          { success: false, message: "User document not found" },
          404
        );
      }

      const userDocumentId = userDocument.documents[0].$id;
      const ticketData = {
        ...data,
        users: userDocumentId,
      };

      const ticket = await database.createDocument(
        env.DATABASE_ID,
        env.TICKETS_ID,
        ID.unique(),
        ticketData
      );

      return c.json({ ticket: ticket });
    }
  )
  .put(
    "/update/:id",
    sessionMiddleware,
    zValidator("json", ticketSchema),
    async (c) => {
      const database = c.get("databases");
      const ticketId = c.req.param("id");
      const data = c.req.valid("json");

      if (!ticketId) {
        return c.json(
          { success: false, message: "Ticket ID is required" },
          400
        );
      }

      const ticketData = { ...data };

      const ticket = await database.updateDocument(
        env.DATABASE_ID,
        env.TICKETS_ID,
        ticketId,
        ticketData
      );

      return c.json({ ticket });
    }
  );

export default app;
