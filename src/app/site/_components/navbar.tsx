"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  console.log("id", id);
  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src={"/assets/svg/mango.svg"}
              height={25}
              width={25}
              alt="Mango"
            />
            <span className="text-2xl font-bold">Mangoes</span>
          </Link>
        </div>

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
          {id && <UserButton />}
          <ModeToggle />
        </div>

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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
