import "server-only";

import { Account, Client } from "node-appwrite";
import { env } from "../env.config";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.ENDPOINT)
    .setProject(env.PROJECT_ID)
    .setKey(env.API_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}
