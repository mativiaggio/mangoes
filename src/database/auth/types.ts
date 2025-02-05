import { Prisma } from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";
import { db } from "../db";

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
