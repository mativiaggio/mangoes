"use server";

import { db } from "@/database/db";
import { Category } from "@prisma/client";

export const getCategoryDetails = async (categoryId: string) => {
  const response = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return response;
};

export const upsertCategory = async (category: Category) => {
  if (!category.id) return null;
  console.log(category);
  try {
    const categoryDetails = await db.category.upsert({
      where: {
        id: category.id,
      },
      update: category,
      create: category,
    });
    return categoryDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

export const deleteCategory = async (categoryId: string) => {
  const response = await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  return response;
};

export const deleteCategories = async (categoryId: string[]) => {
  if (!categoryId || categoryId.length === 0) {
    throw new Error("No se proporcionaron IDs para eliminar.");
  }

  try {
    const response = await db.product.deleteMany({
      where: {
        id: {
          in: categoryId,
        },
      },
    });

    return response;
  } catch (error) {
    console.error("Error al eliminar categorias:", error);
    throw new Error("Error al eliminar categorias.");
  }
};
