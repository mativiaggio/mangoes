import { CompleteWebsiteInfo } from "@/lib/types";
import Link from "next/link";

type Props = {
  website: CompleteWebsiteInfo;
};

export function Footer({ website }: Props) {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {website.name}. Todos los derechos
              reservados.
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="/contacto"
              className="text-sm text-muted-foreground hover:text-primary">
              Contacto
            </Link>
            <Link
              href="/terminos"
              className="text-sm text-muted-foreground hover:text-primary">
              Términos y condiciones
            </Link>
            <Link
              href="/privacidad"
              className="text-sm text-muted-foreground hover:text-primary">
              Política de privacidad
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
