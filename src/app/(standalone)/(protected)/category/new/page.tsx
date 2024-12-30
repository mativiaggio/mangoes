"use client";
import { PageTitle } from "@/components/page-title";
import LoadingScreen from "@/components/screens/loading-screen";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCurrent } from "@/features/auth/api/use-current";
import AddCategoryForm from "@/features/categories/components/add-category-form";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewCategory() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!data?.labels.includes("owner")) {
    router.push("/no-autorizado");
    return null;
  }

  if (!data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Ocurrió un error y no podemos encontrar tu cuenta. Si el error
          persiste, comunicate con soporte.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <PageTitle
        title="Nueva categoría"
        subtitle="Completa los campos para agregar una nueva categoría"
      />
      <AddCategoryForm />
    </>
  );
}
