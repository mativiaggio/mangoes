"use server";

import { Plan } from "@prisma/client";
import { db } from "../db";

export const deletePlan = async (planId: string) => {
  // Eliminar registros relacionados en la base de datos usando una transacción
  const response = await db.$transaction(async (tx) => {
    // Eliminar agencia
    return tx.plan.delete({
      where: { id: planId },
    });
  });

  return response;
};

export const deletePlans = async (planId: string[]) => {
  try {
    Promise.all(
      planId.map(async (id) => {
        const response = await db.$transaction(async (tx) => {
          // Eliminar agencia
          return tx.plan.delete({
            where: { id: id },
          });
        });
        return response;
      })
    );
  } catch (error) {
    console.error("Error al eliminar categorias:", error);
    throw new Error("Error al eliminar categorias.");
  }
};

export const upsertPlan = async (plan: Plan) => {
  if (!plan.id) return null;

  try {
    const planDetails = await db.plan.upsert({
      where: {
        id: plan.id,
      },
      update: plan,
      create: plan,
    });
    return planDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};
