import { Agency, Category, Product, Website } from "@prisma/client";

export type CompleteWebsiteInfo = Website & {
  Agency: Agency & {
    Products: (Product & {
      Category: Category;
    })[];
    Categories: Category[];
  };
};
