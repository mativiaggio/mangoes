import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f0] to-white dark:from-main dark:to-main flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Image
            className="mx-auto h-48 w-auto"
            src="/static/svg/not-found.svg"
            alt="Página no encontrada"
            height={500}
            width={500}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            ¡Oops! Página no encontrada
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            asChild
            className="w-full bg-[#f48d06] hover:bg-[#e75b04] text-white transition-colors duration-300">
            <Link href="/">Volver a la página principal</Link>
          </Button>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Necesitas ayuda?{" "}
            <a
              href="/contact"
              className="font-medium text-[#f48d06] hover:text-[#e75b04] dark:text-[#f48d06] dark:hover:text-[#e75b04]">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
