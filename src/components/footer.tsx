"use client";
import { Separator } from "@/components/ui/separator";
import { useWindowSize } from "@/hooks/use-window-size";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  return (
    <>
      {isDesktop && (
        <footer className="py-[100px] px-4 sm:px-6 md:px-8 lg:px-10 text-white dark:text-primary print:hidden bg-main-orange dark:bg-main flex justify-center">
          <div className="w-full max-w-[63.5rem]">
            <div className="flex gap-2 text-lg font-semibold w-full justify-center items-center pb-4 sm:pb-6 md:pb-8 lg:pb-10">
              <Link className="flex items-center justify-center" href="/">
                <span className="flex items-center justify-between gap-2 w-full">
                  <span className="flex items-center gap-2">
                    <Image
                      src={"/static/svg/mango-logo.svg"}
                      height={40}
                      width={40}
                      alt="Logo"
                      className="h-[40px] max-h-[40px] w-[40px] max-w-[40px]"
                    />
                  </span>
                </span>
                <span className="flex flex-col ml-2 font-bold">
                  <h1 className="text-xl">Mangoes</h1>
                </span>
              </Link>
            </div>
            <Separator className="my-8 bg-primary-foreground/20" />
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-center md:text-left">
                © {currentYear} Mangoes. Todos los derechos reservados.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
