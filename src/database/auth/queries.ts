"use server";

import { db } from "@/database/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "./types";
import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/middleware";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./functions";

export const getAuthUserDetails = async () => {
  const user = await currentUser();

  if (!user) return;

  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        include: {
          SubAccount: true,
        },
      },
      Permissions: true,
    },
  });

  return userData;
};

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

// export const initUser = async (newUser: Partial<User>) => {
//   // const user = await currentUser();

//   if (!user) return;

//   const userData = await db.user.upsert({
//     where: {
//       email: user.emailAddresses[0].emailAddress,
//     },
//     update: newUser,
//     create: {
//       id: user.id,
//       image: user.imageUrl,
//       email: user.emailAddresses[0].emailAddress,
//       name: `${user.firstName} ${user.lastName}`,
//       role: newUser.role || "SUBACCOUNT_USER",
//     },
//   });

//   const client = clerkClient();
//   (await client).users.updateUserMetadata(user.id, {
//     privateMetadata: {
//       role: newUser.role || "SUBACCOUNT_USER",
//     },
//   });

//   return userData;
// };

export const updateUser = async (user: Partial<User>) => {
  const response = await db.user.update({
    where: { email: user.email },
    data: { ...user },
  });

  const client = clerkClient();
  (await client).users.updateUserMetadata(response.id, {
    privateMetadata: {
      role: user.role || "SUBACCOUNT_USER",
    },
  });

  return response;
};

export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;

  const response = await db.user.create({ data: { ...user } });

  return response;
};

export const deleteUser = async (userId: string) => {
  const client = clerkClient();
  (await client).users.updateUserMetadata(userId, {
    privateMetadata: {
      role: undefined,
    },
  });
  const deletedUser = await db.user.delete({ where: { id: userId } });

  return deletedUser;
};

export const getUserPermissions = async (userId: string) => {
  const response = await db.user.findUnique({
    where: { id: userId },
    select: { Permissions: { include: { SubAccount: true } } },
  });

  return response;
};

export const changeUserPermissions = async (
  permissionId: string | undefined,
  userEmail: string,
  subAccountId: string,
  permission: boolean
) => {
  try {
    const response = await db.permissions.upsert({
      where: { id: permissionId },
      update: { access: permission },
      create: {
        access: permission,
        email: userEmail,
        subAccountId: subAccountId,
      },
    });
    return response;
  } catch (error) {
    console.log("🔴Could not change persmission", error);
  }
};

// Custom Auth Protocols
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Información incorrecta" };

        default:
          return { error: "Ocurrió un error" };
      }
    }
    throw error;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Los datos ingresados son inválidos" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Este mail ya esta en uso" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Usuario creado con éxito" };
};
