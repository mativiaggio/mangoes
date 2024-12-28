"use client";
import { useGetFiles } from "../api/use-get-files";

export default function FilesDataContainer() {
  const { data, isLoading } = useGetFiles();

  if (isLoading) {
    return "Cargando...";
  } else {
    console.log(data);
    return <h1>Files</h1>;
  }
}
