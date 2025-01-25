/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Agency,
  Category,
  Contact,
  Notification,
  Prisma,
  Product,
  Role,
  User,
  Website,
} from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";
import { db } from "./db";
import { z } from "zod";

export type NotificationWithUser =
  | ({
      User: {
        id: string;
        name: string;
        avatarUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        agencyId: string | null;
      };
    } & Notification)[]
  | undefined;

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>;

const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
  agencyId: string
) => {
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

export type UsersWithAgencySubAccountPermissionsSidebarOptions =
  Prisma.PromiseReturnType<
    typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
  >;

export type ProductWithCategory = Product & {
  Category: Category;
};

export const ContactUserFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
});

export type CompleteWebsiteInfo = Website & {
  Agency: Agency & {
    Products: (Product & {
      Category: Category;
    })[];
    Categories: Category[];
  };
};
