import { env } from "@/env.config";
import { loginSchema, registerSchema, SecretSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { guestMiddleware, sessionMiddleware } from "@/lib/middlwares";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { ID, Query } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";
import { PasswordRecoverySchema, PasswordResetSchema } from "../schemas";

const app = new Hono()
  .post(
    "/sign-up",
    zValidator("json", registerSchema),
    guestMiddleware,
    async (c) => {
      try {
        const { name, email, password, secretId } = c.req.valid("json");

        const { account } = await createAdminClient();

        const database = c.get("databases");

        await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(
          email,
          password
        );

        await database.createDocument(
          env.DATABASE_ID,
          env.USERS_ID,
          ID.unique(),
          {
            user_id: session.userId,
            name: name,
            email: email,
          }
        );
        await database.updateDocument(
          env.DATABASE_ID,
          env.SECRETS_ID,
          secretId || "",
          {
            used: true,
          }
        );
        return c.json({ success: true });
      } catch (error) {
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .post(
    "/create-account",
    zValidator("json", registerSchema),
    guestMiddleware,
    async (c) => {
      console.log("entramos al crear cuenta");
      try {
        const { name, email, password } = c.req.valid("json");

        const { account } = await createAdminClient();

        const database = c.get("databases");

        await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(
          email,
          password
        );

        console.log("session", session);

        await database.createDocument(
          env.DATABASE_ID,
          env.USERS_ID,
          ID.unique(),
          {
            user_id: session.userId,
            name: name,
            email: email,
            imageId: "677064b3002498a4549a",
          }
        );
        return c.json({ success: true });
      } catch (error) {
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");

    return c.json({ data: user });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  })
  .post(
    "/password-recovery",
    zValidator("json", PasswordRecoverySchema),
    async (c) => {
      const { email } = c.req.valid("json");

      const { account } = await createAdminClient();

      await account.createRecovery(email, `${env.HOSTNAME}/restaurar-clave`);

      return c.json({ success: true });
    }
  )
  .post(
    "/password-reset",
    zValidator("json", PasswordResetSchema),
    async (c) => {
      try {
        const { user_id, secret, password } = c.req.valid("json");

        const { account } = await createAdminClient();

        await account.updateRecovery(user_id, secret, password);

        return c.json({ success: true });
      } catch (error) {
        return c.json(
          { success: false, message: (error as Error).message },
          500
        );
      }
    }
  )
  .get("/secrets", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const secrets = await database.listDocuments(
      env.DATABASE_ID,
      env.SECRETS_ID,
      [Query.orderDesc("$createdAt"), Query.equal("used", [false])]
    );

    return c.json({ secrets: secrets });
  })
  .post(
    "/create-secret",
    sessionMiddleware,
    zValidator("json", SecretSchema),
    async (c) => {
      const database = c.get("databases");

      const data = c.req.valid("json");

      const secret = await database.createDocument(
        env.DATABASE_ID,
        env.SECRETS_ID,
        ID.unique(),
        data
      );

      return c.json({ secret: secret });
    }
  )
  .get("/find-secret-by-secret/:secret", guestMiddleware, async (c) => {
    const database = c.get("databases");
    const secret = c.req.param("secret");
    const secrets = await database.listDocuments(
      env.DATABASE_ID,
      env.SECRETS_ID,
      [Query.equal("secret", [secret])]
    );

    return c.json({ secrets });
  });

export default app;
