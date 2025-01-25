"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";
import {
  Agency,
  Category,
  Prisma,
  Product,
  Role,
  SubAccount,
  User,
  Website,
} from "@prisma/client";
import { v4 } from "uuid";
import { ProductWithCategory } from "./types";
import { env } from "./env.config";
import { deleteFile } from "@/app/api/uploadthing/deleteFile";

/** AUTHENTICATION & USER MANAGEMENT */

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

/**  INVITATION HANDLING */

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

/** NOTIFICATION HANDLING */

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

/** AGENCY MANAGEMENT */

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
  const deleteFileIfExists = async (fileUrl: string | null) => {
    if (!fileUrl) return null;
    const fileKey = fileUrl.split("/").pop();
    if (!fileKey) return null;

    try {
      await deleteFile(fileKey);
    } catch (error) {
      console.error(`Error eliminando archivo ${fileKey}:`, error);
    }
  };

  // Obtener productos de la agencia
  const products = await db.product.findMany({
    where: { agencyId },
  });

  // Eliminar imágenes asociadas a los productos
  await Promise.all(
    products.map((product) => deleteFileIfExists(product.productImage))
  );

  // Obtener el website asociado
  const website = await db.website.findUnique({
    where: { agencyId },
  });

  // Eliminar logo del website
  if (website) await deleteFileIfExists(website?.websiteLogo);

  // Obtener la agencia
  const agency = await db.agency.findUnique({
    where: { id: agencyId },
  });

  // Eliminar logo de la agencia
  if (agency) await deleteFileIfExists(agency?.agencyLogo);

  // Eliminar registros relacionados en la base de datos usando una transacción
  const response = await db.$transaction(async (tx) => {
    // Eliminar productos
    await tx.product.deleteMany({
      where: { agencyId },
    });

    // Eliminar website
    await tx.website.deleteMany({
      where: { agencyId },
    });

    // Eliminar agencia
    return tx.agency.delete({
      where: { id: agencyId },
    });
  });

  return response;
};

export const upsertAgency = async (agency: Agency) => {
  if (!agency.companyEmail) return null;

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

    return agencyDetails;
  } catch (error) {
    console.error("Error en upsertAgency:", error);
    throw error;
  }
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

export const getAgencyWebsite = async (agencyId: string) => {
  try {
    const response = await db.website.findUnique({
      where: { agencyId },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

export const getAgencyByDomain = async (domain: string) => {
  try {
    const response = await db.agency.findFirst({
      where: {
        Website: {
          domain: domain,
        },
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

/** SUBACCOUNT MANAGEMENT */
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

/** PRODUCTS MANAGEMENT */

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

/** CATEGORIES MANAGEMENT */

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

/** CONTACTS MANAGEMENT */

export const searchContacts = async (searchTerms: string) => {
  const response = await db.contact.findMany({
    where: {
      name: {
        contains: searchTerms,
      },
    },
  });
  return response;
};

export const upsertContact = async (
  contact: Prisma.ContactUncheckedCreateInput
) => {
  const response = await db.contact.upsert({
    where: { id: contact.id || v4() },
    update: contact,
    create: contact,
  });
  return response;
};

/** WEBSITE MANAGEMENT */

export const getWebsiteByDomain = async (domain: string) => {
  if (!domain) return null;

  try {
    const response = await db.website.findUnique({
      where: {
        domain: domain,
        isActive: true,
      },
      include: {
        Agency: {
          include: {
            Products: {
              include: {
                Category: true, // Incluye la categoría asociada a cada producto
              },
            },
            Categories: true, // Incluye todas las categorías vinculadas a la agencia
          },
        },
      },
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

export const getCompleteWebsiteByAgencyId = async (agencyId: string) => {
  if (!agencyId) return null;

  try {
    const response = await db.website.findUnique({
      where: {
        agencyId: agencyId,
        isActive: true,
      },
      include: {
        Agency: {
          include: {
            Products: {
              include: {
                Category: true, // Incluye la categoría asociada a cada producto
              },
            },
            Categories: true, // Incluye todas las categorías vinculadas a la agencia
          },
        },
      },
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

export const getWebsiteByAgencyId = async (agencyId: string) => {
  if (!agencyId) return null;

  try {
    const response = await db.website.findUnique({
      where: {
        agencyId: agencyId,
      },
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};

export const upsertWebsite = async (website: Website) => {
  if (!website.id) return null;
  try {
    const websiteDetails = await db.website.upsert({
      where: {
        id: website.id,
      },
      update: website,
      create: website,
    });
    return websiteDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
};
