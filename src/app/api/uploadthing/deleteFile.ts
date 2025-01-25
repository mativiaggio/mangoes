"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
export const deleteFile = async (fileKey: string) => {
  try {
    await utapi.deleteFiles(fileKey);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Error deleting file"); // Lanzar el error en lugar de manejarlo aquí
  }
};
