// Variables de entorno exportadas para la app
export const env = {
  // App URL
  PUBLIC_URL: process.env.NEXT_PUBLIC_APP_URL || "",

  // Información del proyecto
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  API_KEY: process.env.NEXT_API_KEY || "",
  ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT || "",

  // IDs de la base de datos
  DATABASE_ID: process.env.NEXT_PUBLIC_DATABASE_ID || "",
  USERS_ID: process.env.NEXT_PUBLIC_USERS_ID || "",
  STORES_ID: process.env.NEXT_PUBLIC_STORES_ID || "",
  TICKETS_ID: process.env.NEXT_PUBLIC_TICKETS_ID || "",
  SECRETS_ID: process.env.NEXT_PUBLIC_SECRETS_ID || "",
  CATEGORIES_ID: process.env.NEXT_PUBLIC_CATEGORIES_ID || "",
  PLANS_ID: process.env.NEXT_PUBLIC_PLANS_ID || "",

  // Configuración del almacenamiento (buckets)
  IMAGES_BUCKET_ID: process.env.NEXT_PUBLIC_IMAGES_BUCKET_ID || "",

  // General
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "",
  HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME || "",
  APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE || "Mangoes",

  // Mercado Pago
  MP_ACCESS_TOKEN: process.env.NEXT_MP_ACCESS_TOKEN || "",
};
