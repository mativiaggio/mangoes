"use server";

import { db } from "@/database/db";
import { env } from "@/lib/env.config";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { createTeamUser } from "../auth/queries";
import { redirect } from "next/navigation";
import { saveActivityLogsNotification } from "../notification/queries";

export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  const invitationExist = await db.invitation.findUnique({
    where: { email: user.emailAddresses[0].emailAddress, status: "PENDING" },
  });

  if (invitationExist) {
    const userDetails = await createTeamUser(invitationExist.agencyId, {
      email: invitationExist.email,
      agencyId: invitationExist.agencyId,
      avatarUrl: user.imageUrl,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: invitationExist.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await saveActivityLogsNotification({
      agencyId: invitationExist?.agencyId,
      description: "Se ha unido a la agencia",
    });

    if (userDetails) {
      const client = clerkClient();
      (await client).users.updateUserMetadata(user.id, {
        privateMetadata: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });

      await db.invitation.delete({ where: { email: userDetails.email } });

      return userDetails.agencyId;
    } else {
      return null;
    }
  } else {
    const agency = await db.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    return agency ? agency.agencyId : null;
  }
};

export const sendInvitation = async (
  role: Role,
  email: string,
  agencyId: string
) => {
  const resposne = await db.invitation.create({
    data: { email, agencyId, role },
  });

  try {
    const client = await clerkClient();

    if (!env.URL) {
      throw new Error("La variable NEXT_PUBLIC_URL no está definida.");
    }

    await client.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: env.URL + "/agency/",
      publicMetadata: {
        throughInvitation: true,
        role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }

  return resposne;
};
