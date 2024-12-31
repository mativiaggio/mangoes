"use server";

import { env } from "@/env.config";
import { Client, Databases, Query } from "node-appwrite";
import { getUserDocument } from "../users/actions";

export const getPlanById = async (planId: string) => {
  try {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const databases = new Databases(client);

    const plan = await databases.getDocument(
      env.DATABASE_ID,
      env.PLANS_ID,
      planId
    );

    return plan;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUserPlan = async (
  userId: string,
  suscriptionId: string | null,
  suscription_status: boolean
) => {
  try {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const databases = new Databases(client);

    const documentId = await getUserDocument(userId);

    console.log(userId);
    console.log(suscriptionId);
    console.log(suscription_status);
    const user = await databases.updateDocument(
      env.DATABASE_ID,
      env.USERS_ID,
      documentId,
      {
        suscriptionId: suscriptionId,
        suscription_status: suscription_status,
      }
    );

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const activateUserPlan = async (
  suscriptionId: string | null,
  suscription_status: boolean
) => {
  try {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const databases = new Databases(client);

    const userDoc = await databases.listDocuments(
      env.DATABASE_ID,
      env.USERS_ID,
      [Query.equal("suscriptionId", suscriptionId || "")]
    );

    const user = await databases.updateDocument(
      env.DATABASE_ID,
      env.USERS_ID,
      userDoc.documents[0].$id,
      {
        suscriptionId: suscriptionId,
        suscription_status: suscription_status,
      }
    );

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
