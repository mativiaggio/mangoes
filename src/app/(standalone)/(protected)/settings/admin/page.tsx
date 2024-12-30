"use client";

import { PageTitle } from "@/components/page-title";
import LoadingScreen from "@/components/screens/loading-screen";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useCurrent } from "@/features/auth/api/use-current";
import GenerateRegisterLink from "@/features/auth/components/generate-sign-up";
import CategoriesDataContainer from "@/features/categories/components/categories-data-container";
import UsersDataContainer from "@/features/users/components/users-data-container";
import { useWindowSize } from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileSettings() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;

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
    <div className="flex flex-col">
      {isClient && isDesktop && (
        <div className="space-y-6">
          <PageTitle
            title="Panel administrador"
            subtitle="Desde aquí puedes administrar tu cuenta de administrador"
          />
        </div>
      )}
      <div className={cn("", (isClient && !isDesktop && "pt-6") || "")}>
        <GenerateRegisterLink />
        <Separator />
        <PageTitle
          title="Categorías"
          subtitle="Lista de categorías del sistema"
        />
        <CategoriesDataContainer />
        <PageTitle title="Usuarios" subtitle="Lista de usuarios del sistema" />
        <UsersDataContainer />
      </div>
    </div>
  );
}
