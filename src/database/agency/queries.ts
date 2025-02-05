"use server";

import { deleteFile } from "@/app/api/uploadthing/deleteFile";
import { db } from "@/database/db";
import { Agency } from "@prisma/client";
import { ProductWithCategory } from "../product/types";

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
    // Eliminar agencia
    return tx.agency.delete({
      where: { id: agencyId },
    });
  });

  return response;
};

export const deleteAgencies = async (agencyId: string[]) => {
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

  try {
    Promise.all(
      agencyId.map(async (id) => {
        // Obtener productos de la agencia
        const products = await db.product.findMany({
          where: { agencyId: id },
        });

        // Eliminar imágenes asociadas a los productos
        await Promise.all(
          products.map((product) => deleteFileIfExists(product.productImage))
        );

        // Obtener el website asociado
        const website = await db.website.findUnique({
          where: { agencyId: id },
        });

        // Eliminar logo del website
        if (website) await deleteFileIfExists(website?.websiteLogo);

        // Obtener la agencia
        const agency = await db.agency.findUnique({
          where: { id },
        });

        // Eliminar logo de la agencia
        if (agency) await deleteFileIfExists(agency?.agencyLogo);

        // Eliminar registros relacionados en la base de datos usando una transacción
        const response = await db.$transaction(async (tx) => {
          // Eliminar agencia
          return tx.agency.delete({
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
        Subscription: {
          create: {
            price: "0.00",
            active: true,
            customerId: agency.id,
            currentPeriodEndDate: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            ),
            subscritiptionId: `trial-${agency.id}`,
          },
        },
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
