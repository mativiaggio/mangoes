"use server";

import { db } from "@/database/db";
import { SubAccount } from "@prisma/client";
import { v4 } from "uuid";

export const getSubaccountDetails = async (subAccountId: string) => {
  const response = await db.subAccount.findUnique({
    where: {
      id: subAccountId,
    },
  });
  return response;
};

export const createSubAccount = async (subAccount: SubAccount) => {
  if (!subAccount.companyEmail) return null;

  const agencyOwner = await db.user.findFirst({
    where: {
      Agency: {
        id: subAccount.agencyId,
      },
      role: "AGENCY_OWNER",
    },
  });

  if (!agencyOwner) {
    console.log("🔴 Error: could not create subaccount");
    return null;
  }

  const permissionId = v4();

  try {
    // Crear el subaccount
    const newSubAccount = await db.subAccount.create({
      data: {
        ...subAccount,
        Permissions: {
          create: {
            access: true,
            email: agencyOwner.email,
            id: permissionId,
          },
        },
      },
    });

    console.log(newSubAccount);

    return newSubAccount;
  } catch (error) {
    console.error("Error en createSubAccount:", error);
    throw error;
  }
};

export const updateSubAccount = async (subAccount: SubAccount) => {
  if (!subAccount.companyEmail) return null;

  try {
    // Actualizar el subaccount
    const updatedSubAccount = await db.subAccount.update({
      where: { id: subAccount.id },
      data: { ...subAccount },
    });

    console.log(updatedSubAccount);

    return updatedSubAccount;
  } catch (error) {
    console.error("Error en updateSubAccount:", error);
    throw error;
  }
};

export const deleteSubAccount = async (subAccountId: string) => {
  const response = await db.subAccount.delete({
    where: {
      id: subAccountId,
    },
  });
  return response;
};

export const getSubAccountTeamMembers = async (subAccountId: string) => {
  const subaccountUsersWithAccess = await db.user.findMany({
    where: {
      Agency: {
        SubAccount: {
          some: {
            id: subAccountId,
          },
        },
      },
      role: "SUBACCOUNT_USER",
      Permissions: {
        some: {
          subAccountId: subAccountId,
          access: true,
        },
      },
    },
  });
  return subaccountUsersWithAccess;
};
