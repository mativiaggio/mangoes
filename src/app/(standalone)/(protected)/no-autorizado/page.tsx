import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Acceso No Autorizado
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Lo sentimos, no tienes permiso para acceder a esta página. Por favor,
          verifica tus credenciales o contacta al administrador si crees que
          esto es un error.
        </p>
        <Button asChild className="w-full">
          <Link href="/">Volver a la Página de Inicio</Link>
        </Button>
      </div>
    </div>
  );
}
