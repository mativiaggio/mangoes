"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, List, Store } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../../ui/button";
import { PageTitle } from "../../page-title";
import Link from "next/link";

export default function MobileBottomNavbarMore() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const links = [
    {
      href: "/",
      icon: Store,
      title: "Tiendas",
      description: "Navega entre todas las tiendas",
    },
  ];

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery) ||
      link.description.toLowerCase().includes(searchQuery)
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger className="w-full">
        <div className="w-full" onClick={handleLinkClick}>
          <div className="`w-full flex-col gap-1 font-bold rounded-full transition-all py-[1rem] flex justify-center items-center">
            <div
              className={`w-full flex flex-col gap-1 font-bold items-center rounded-full transition-all text-inactive-item`}>
              <List size={28} />
              <span className="text-xs">Más</span>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        className="!max-w-[100vw] flex flex-col h-full max-h-screen w-screen max-w-screen"
        showClose={false}>
        <SheetTitle className="sr-only">Más Accesos</SheetTitle>
        <SheetHeader className="flex-shrink-0">
          <SheetDescription className="sr-only">
            Este menú tiene diversos accesos
          </SheetDescription>
          <div className="flex flex-col h-fit items-start w-full">
            <div className="w-full flex justify-start">
              <Button
                variant={"outline"}
                className="p-0 aspect-square rounded-xl"
                onClick={handleLinkClick}>
                <ChevronLeft />
              </Button>
            </div>
            <PageTitle
              title="Más Accesos"
              titleClassName="font-bold text-center"
              className="w-full flex justify-center"
            />
          </div>
          <div className="w-full mt-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-0"
            />
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="grid gap-4 py-4">
            <div className="bg-main-card border-main-card rounded-xl">
              <div className="flex flex-col gap-4 p-8">
                {filteredLinks.map((link, index) => (
                  <Link
                    key={index}
                    className="w-full"
                    onClick={handleLinkClick}
                    href={link.href}>
                    <div className="w-full border-b border-white dark:border-muted pb-4">
                      <div className="flex items-center gap-2 hover:opacity-50 transition-all">
                        <div className="">
                          <div className="aspect-square rounded-full bg-muted p-3 w-fit">
                            <link.icon className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="w-full flex flex-col ">
                          <h3 className="text-left">{link.title}</h3>
                          <p className="text-sm text-left">
                            {link.description}
                          </p>
                        </div>
                        <div className="">
                          <ChevronRight />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
