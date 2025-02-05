import { Category, Product } from "@prisma/client";

export type ProductWithCategory = Product & {
  Category: Category;
};
