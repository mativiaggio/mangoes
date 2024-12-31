"use server";

import { env } from "@/env.config";
import { Client, Databases, Query } from "node-appwrite";

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

export const getUserDocument = async (
  userId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<string | any> => {
  try {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const databases = new Databases(client);

    try {
      // Buscar el documento del usuario en la colección `users`
      const response = await databases.listDocuments(
        env.DATABASE_ID, // ID de la base de datos
        env.USERS_ID, // ID de la colección `users`
        [Query.equal("user_id", userId)] // Buscar por `user_id`
      );

      if (response.documents.length === 0) {
        return [{ success: false, message: "User document not found" }, 400];
      }

      // Devolver el primer documento encontrado (asumiendo que `user_id` es único)
      return response.documents[0].$id;
    } catch (error) {
      console.error("Error fetching user document:", error);
      return [{ success: false, message: (error as Error).message }, 500];
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
