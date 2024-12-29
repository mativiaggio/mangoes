"use client";
import { useGetCategories } from "../api/use-get-categories";

export default function FilesDataContainer() {
  const { data, isLoading } = useGetCategories();

  if (isLoading) {
    return "Cargando...";
  } else {
    console.log(data);
    return <h1>Categories</h1>;
  }
}
