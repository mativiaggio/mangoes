"use server";

import { db } from "@/database/db";
import { Product } from "@prisma/client";

export const upsertProduct = async (product: Product) => {
  if (!product.id) return null;
  console.log(product);
  try {
    const productDetails = await db.product.upsert({
      where: {
        id: product.id,
      },
      update: product,
      create: product,
    });
    return productDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

export const deleteProduct = async (productId: string) => {
  const response = await db.product.delete({
    where: {
      id: productId,
    },
  });

  return response;
};

export const deleteProducts = async (productIds: string[]) => {
  if (!productIds || productIds.length === 0) {
    throw new Error("No se proporcionaron IDs para eliminar.");
  }

  try {
    const response = await db.product.deleteMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    return response;
  } catch (error) {
    console.error("Error al eliminar productos:", error);
    throw new Error("Error al eliminar productos.");
  }
};

export const getProductDetails = async (productId: string) => {
  const response = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  return response;
};
