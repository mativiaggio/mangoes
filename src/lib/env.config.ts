// Variables de entorno exportadas para la app
export const env = {
  //APP, DOMAINS & URL
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "",
  URL: process.env.NEXT_PUBLIC_URL || "",
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || "",
  SCHEME: process.env.NEXT_PUBLIC_SCHEME || "",

  //DATABASES
  DATABASE_URL: process.env.DATABASE_URL || "",
  PROD_DATABASE_URL: process.env.PROD_DATABASE_URL || "",
  LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL || "",

  //UPLOADTHING
  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET || "",
  UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID || "",

  // ENVIROMENT
  NODE_ENV: process.env.NODE_ENV || "",
};
