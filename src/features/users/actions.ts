"use server";

import { env } from "@/env.config";
import { Client, Databases } from "node-appwrite";

export const getUsers = async () => {
  try {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const databases = new Databases(client);

    const result = await databases.listDocuments(
      env.DATABASE_ID, // databaseId
      env.USERS_ID, // collectionId
      [] // queries (optional)
    );

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
