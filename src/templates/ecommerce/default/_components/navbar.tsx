"use client";

import * as React from "react";
import Link from "next/link";
import { Contact, House, Menu, ShoppingBag, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { CompleteWebsiteInfo } from "@/lib/types";
import { CartSummary } from "./cart-summary";

const navItems = [
  { name: "Inicio", href: "/", icon: House },
  { name: "Productos", href: "/products", icon: ShoppingBag },
  { name: "Contacto", href: "/contact", icon: Contact },
  { name: "Carrito", href: "/cart", icon: ShoppingCart },
];
type Props = {
  website: CompleteWebsiteInfo;
};

export function Navbar({ website }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b flex justify-center items-center">
      <div className="container flex flex-col items-center px-3 w-full justify-center ">
        <div className="flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 h-full">
              <Image
                src={website.Agency.agencyLogo}
                alt="Website Logo"
                height={30}
                width={30}
                className="!max-h-full aspect-square"
              />
              <h1 className="text-2xl font-semibold">{website.name}</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:gap-4">
              {navItems.map((item) =>
                item.name === "Carrito" ? (
                  <CartSummary key={item.name} agency={website.Agency} />
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/60 transition-colors hover:text-foreground">
                    {item.name}
                  </Link>
                )
              )}
            </div>
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
                <SheetDescription className="sr-only">Navbar</SheetDescription>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-2 py-1 text-lg gap-2"
                      onClick={() => setIsOpen(false)}>
                      {React.createElement(item.icon, { className: "h-5 w-5" })}{" "}
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
