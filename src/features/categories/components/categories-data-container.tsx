"use client";
import { useGetCategories } from "../api/use-get-categories";
import { CategoriesDataTable } from "./categories-data-table";

export default function CategoriesDataContainer() {
  const { data } = useGetCategories();

  return <CategoriesDataTable categoriesData={data} />;
}
