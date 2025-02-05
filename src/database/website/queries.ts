"use server";

import { db } from "@/database/db";
import { Website } from "@prisma/client";

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
