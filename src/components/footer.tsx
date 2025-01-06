"use client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#fff8f0] dark:bg-background border-t border-[#f48d06]/20 dark:border-[#f48d06]/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="flex items-center gap-2">
                <Image
                  src={"/assets/svg/mango.svg"}
                  height={40}
                  width={40}
                  alt="Mango"
                />
                <h1 className="text-2xl font-bold text-main-oranger">
                  Mangoes
                </h1>
              </span>
              <p className="text-muted-foreground text-base">
                Empoderando a pymes y emprendedores con soluciones de e-commerce
                fáciles de usar.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#e75b04]">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#e75b04]">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#e75b04]">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#e75b04]">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-[#e75b04] tracking-wider uppercase">
                    Soluciones
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {[
                      "Tienda Online",
                      "Marketing",
                      "Analíticas",
                      "Integraciones",
                    ].map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-muted-foreground hover:text-[#f48d06]">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-[#e75b04] tracking-wider uppercase">
                    Soporte
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {["Precios", "Documentación", "Guías", "API Status"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="text-base text-muted-foreground hover:text-[#f48d06]">
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-[#e75b04] tracking-wider uppercase">
                    Compañía
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {["Sobre Nosotros", "Blog", "Trabajos", "Prensa"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="text-base text-muted-foreground hover:text-[#f48d06]">
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-[#e75b04] tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {["Privacidad", "Términos", "Cookies"].map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-muted-foreground hover:text-[#f48d06]">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-[#f48d06]/20 pt-8">
            <p className="text-base text-muted-foreground xl:text-center">
              &copy; {new Date().getFullYear()} Mangoes, Inc. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
