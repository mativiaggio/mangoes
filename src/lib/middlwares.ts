import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  Users,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";
import "server-only";
import { env } from "../env.config";

type AditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);

export const generalMiddleware = createMiddleware<AditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID)
      .setKey(env.API_KEY);

    const users = new Users(client);

    c.set("users", users);

    await next();
  }
);

export const guestMiddleware = createMiddleware<AditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const databases = new Databases(client);

    c.set("databases", databases);

    await next();
  }
);
