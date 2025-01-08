"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { db } from "./db";
import { redirect } from "next/navigation";
import {
  Agency,
  Category,
  Icon,
  Product,
  Role,
  SubAccount,
  User,
} from "@prisma/client";
import { v4 } from "uuid";
import { ProductWithCategory } from "./types";

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
          SidebarOption: true,
          SubAccount: { include: { SidebarOption: true } },
        },
      },
      Permissions: true,
    },
  });

  return userData;
};

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

export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;

  const response = await db.user.create({ data: { ...user } });

  return response;
};

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

export const updateAgencyDetails = async (
  agencyId: string,
  agencyDetails: Partial<Agency>
) => {
  const response = await db.agency.update({
    where: { id: agencyId },
    data: {
      ...agencyDetails,
    },
  });

  return response;
};

export const deleteAgency = async (agencyId: string) => {
  const response = await db.agency.delete({
    where: {
      id: agencyId,
    },
  });

  return response;
};

export const initUser = async (newUser: Partial<User>) => {
  const user = await currentUser();

  if (!user) return;

  const userData = await db.user.upsert({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    update: newUser,
    create: {
      id: user.id,
      avatarUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      role: newUser.role || "SUBACCOUNT_USER",
    },
  });

  const client = clerkClient();
  (await client).users.updateUserMetadata(user.id, {
    privateMetadata: {
      role: newUser.role || "SUBACCOUNT_USER",
    },
  });

  return userData;
};

export const upsertAgency = async (agency: Agency) => {
  if (!agency.companyEmail) return null;

  // Definimos las opciones de Sidebar
  const agencySidebarOptions = [
    { name: "Dashboard", icon: Icon.category, link: `/agency/${agency.id}` },
    {
      name: "Launchpad",
      icon: Icon.rocket,
      link: `/agency/${agency.id}/launchpad`,
    },
    {
      name: "Categorías",
      icon: Icon.list,
      link: `/agency/${agency.id}/categories`,
    },
    {
      name: "Productos",
      icon: Icon.archive,
      link: `/agency/${agency.id}/products`,
    },
    {
      name: "Inventario",
      icon: Icon.packageOpen,
      link: `/agency/${agency.id}/inventory`,
    },
    { name: "Ingresos", icon: Icon.wallet, link: `/agency/${agency.id}/sales` },
    {
      name: "Facturas de venta",
      icon: Icon.fileInput,
      link: `/agency/${agency.id}/sales-invoices`,
    },
    {
      name: "Egresos",
      icon: Icon.handCoins,
      link: `/agency/${agency.id}/purchases`,
    },
    {
      name: "Facturas de compra",
      icon: Icon.fileOutput,
      link: `/agency/${agency.id}/purchases-invoices`,
    },
    {
      name: "Facturación",
      icon: Icon.payment,
      link: `/agency/${agency.id}/billing`,
    },
    {
      name: "Configuración",
      icon: Icon.settings,
      link: `/agency/${agency.id}/settings`,
    },
    {
      name: "Subcuentas",
      icon: Icon.person,
      link: `/agency/${agency.id}/all-subaccounts`,
    },
    { name: "Equipo", icon: Icon.shield, link: `/agency/${agency.id}/team` },
  ];

  console.log("entramos al upsertAgency");

  try {
    // Realizar el upsert de la agencia
    const agencyDetails = await db.agency.upsert({
      where: { id: agency.id },
      update: { ...agency },
      create: {
        users: { connect: { email: agency.companyEmail } },
        ...agency,
      },
    });

    // Obtener las opciones existentes de la barra lateral
    const existingSidebarOptions = await db.agencySidebarOption.findMany({
      where: { agencyId: agency.id },
    });

    // Crear o actualizar opciones
    for (const option of agencySidebarOptions) {
      const existingOption = existingSidebarOptions.find(
        (o) => o.name === option.name
      );

      if (existingOption) {
        // Actualizar si existe pero cambió algún valor
        if (
          existingOption.icon !== option.icon ||
          existingOption.link !== option.link
        ) {
          await db.agencySidebarOption.update({
            where: { id: existingOption.id },
            data: {
              icon: option.icon,
              link: option.link,
            },
          });
        }
      } else {
        // Crear si no existe
        await db.agencySidebarOption.create({
          data: {
            ...option,
            agencyId: agency.id,
          },
        });
      }
    }

    // Eliminar opciones antiguas que no están en agencySidebarOptions
    const optionNames = agencySidebarOptions.map((o) => o.name);
    const optionsToDelete = existingSidebarOptions.filter(
      (o) => !optionNames.includes(o.name)
    );

    for (const option of optionsToDelete) {
      await db.agencySidebarOption.delete({
        where: { id: option.id },
      });
    }

    return agencyDetails;
  } catch (error) {
    console.error("Error en upsertAgency:", error);
    throw error;
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

export const _getTicketsWithAllRelations = async (laneId: string) => {
  const response = await db.ticket.findMany({
    where: { laneId: laneId },
    include: {
      Assigned: true,
      Customer: true,
      Lane: true,
      Tags: true,
    },
  });
  return response;
};

export const upsertSubAccount = async (subAccount: SubAccount) => {
  if (!subAccount.companyEmail) return null;
  const agencyOwner = await db.user.findFirst({
    where: {
      Agency: {
        id: subAccount.agencyId,
      },
      role: "AGENCY_OWNER",
    },
  });
  if (!agencyOwner) return console.log("🔴Erorr could not create subaccount");
  const permissionId = v4();
  const response = await db.subAccount.upsert({
    where: { id: subAccount.id },
    update: subAccount,
    create: {
      ...subAccount,
      Permissions: {
        create: {
          access: true,
          email: agencyOwner.email,
          id: permissionId,
        },
        connect: {
          subAccountId: subAccount.id,
          id: permissionId,
        },
      },
      Pipeline: {
        create: { name: "Lead Cycle" },
      },
      SidebarOption: {
        create: [
          {
            name: "Launchpad",
            icon: "clipboardIcon",
            link: `/subaccount/${subAccount.id}/launchpad`,
          },
          {
            name: "Configuración",
            icon: "settings",
            link: `/subaccount/${subAccount.id}/settings`,
          },
          {
            name: "Páginas",
            icon: "pipelines",
            link: `/subaccount/${subAccount.id}/funnels`,
          },
          {
            name: "Adjuntos",
            icon: "database",
            link: `/subaccount/${subAccount.id}/media`,
          },
          {
            name: "Automatizaciones",
            icon: "chip",
            link: `/subaccount/${subAccount.id}/automations`,
          },
          {
            name: "Pipelines",
            icon: "flag",
            link: `/subaccount/${subAccount.id}/pipelines`,
          },
          {
            name: "Contactos",
            icon: "person",
            link: `/subaccount/${subAccount.id}/contacts`,
          },
          {
            name: "Dashboard",
            icon: "category",
            link: `/subaccount/${subAccount.id}`,
          },
        ],
      },
    },
  });
  return response;
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

export const getSubaccountDetails = async (subaccountId: string) => {
  const response = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  });
  return response;
};

export const deleteSubAccount = async (subaccountId: string) => {
  const response = await db.subAccount.delete({
    where: {
      id: subaccountId,
    },
  });
  return response;
};

export const getAgencyProducts = async (
  agencyId: string
): Promise<ProductWithCategory[]> => {
  try {
    const response = await db.product.findMany({
      where: { agencyId },
      include: {
        Category: true, // Incluye la categoría
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    throw error; // Lanza el error para manejo adicional
  }
};

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

export const getAgencyCategories = async (agencyId: string) => {
  try {
    const response = await db.category.findMany({
      where: { agencyId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
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

export const getCategoryDetails = async (categoryId: string) => {
  const response = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return response;
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

    if (!process.env.NEXT_PUBLIC_URL) {
      throw new Error("La variable NEXT_PUBLIC_URL no está definida.");
    }

    await client.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: process.env.NEXT_PUBLIC_URL,
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

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
