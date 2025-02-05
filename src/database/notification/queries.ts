"use server";
import { db } from "@/database/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subAccountId,
}: {
  agencyId?: string;
  description: string;
  subAccountId?: string;
}) => {
  const authUser = await currentUser();

  let userData;

  if (!authUser) {
    const response = await db.user.findFirst({
      where: {
        Agency: { SubAccount: { some: { id: subAccountId } } },
      },
    });

    if (response) {
      userData = response;
    }
  } else {
    userData = await db.user.findUnique({
      where: { email: authUser?.emailAddresses[0].emailAddress },
    });
  }

  if (!userData) {
    console.log("No se encontró el usuario");
    return;
  }

  let foundAgencyId = agencyId;
  console.log("foundAgencyId", foundAgencyId);
  console.log("agencyId", agencyId);
  if (!foundAgencyId) {
    if (!subAccountId) {
      throw new Error(
        "Es necesario tener un id de agencia o un id de subcuenta"
      );
    }

    const response = await db.subAccount.findUnique({
      where: { id: subAccountId },
    });

    if (response) foundAgencyId = response.agencyId;
  }

  if (subAccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
        SubAccount: {
          connect: {
            id: subAccountId,
          },
        },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
      },
    });
  }
};

export const getNotificationAndUser = async (agencyId: string) => {
  try {
    const response = await db.notification.findMany({
      where: { agencyId },
      include: { User: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
