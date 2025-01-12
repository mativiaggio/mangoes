"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { name: "Inicio", href: "#home" },
  { name: "Servicios", href: "#features" },
  { name: "Precios", href: "#pricing" },
];

interface NavbarProps {
  id: string | null;
}

export function Navbar({ id }: NavbarProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src={"/assets/svg/hexagon.svg"}
              height={25}
              width={25}
              alt="Mango"
            />
            <span className="text-2xl font-bold">Mangoes</span>
          </Link>
        </div>
        <div className="flex gap-4 justify-end">
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/60 transition-colors hover:text-foreground">
                {item.name}
              </Link>
            ))}
            {!id && (
              <>
                <Link
                  href={"/sign-up"}
                  className="text-foreground/60 transition-colors hover:text-foreground">
                  Crear cuenta
                </Link>
                <Link
                  href={"/sign-in"}
                  className="text-foreground/60 transition-colors hover:text-foreground">
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={"/agency"}
              className="text-foreground/60 transition-colors hover:text-foreground text-sm md:text-base flex items-center justify-center gap-2">
              Dashboard
              <ChevronRight size={14} />
            </Link>
          </div>
          {id && <UserButton />}
          <ModeToggle />
          {/* Mobile navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
                aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navbar</SheetTitle>
              <SheetDescription className="sr-only">
                Menú de naveación móbil
              </SheetDescription>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-1 text-lg"
                    onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                ))}
                {!id && (
                  <>
                    <Link href={"/sign-up"} className="block px-2 py-1 text-lg">
                      Crear cuenta
                    </Link>
                    <Link href={"/sign-in"} className="block px-2 py-1 text-lg">
                      Iniciar sesión
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
