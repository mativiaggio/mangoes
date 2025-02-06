import { Prisma } from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";
import { db } from "../db";
import { z } from "zod";

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __getUsersWithAgencySubAccountPermissions = async (agencyId: string) => {
  return await db.user.findFirst({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
};
export type AuthUserSubAccounts = Prisma.PromiseReturnType<
  typeof getAuthUserDetails
>;
export type UsersWithAgencySubAccountPermissions = Prisma.PromiseReturnType<
  typeof __getUsersWithAgencySubAccountPermissions
>;

// Login Schema

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El email es obligatorio",
  }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email({
    message: "El email es obligatorio",
  }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});
