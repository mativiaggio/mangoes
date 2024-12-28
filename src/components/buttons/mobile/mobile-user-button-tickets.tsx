"use client";
import React, { useState } from "react";
import { Cable, ChevronLeft, ChevronRight } from "lucide-react";
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
import TicketsDataContainer from "@/features/ticketing-system/components/tickets-data-container";

export default function MobileUserButtonTickets() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <div className="w-full" onClick={handleLinkClick}>
          <div className="w-full border-b border-white dark:border-muted pb-4">
            <div className="flex items-center gap-2 hover:opacity-50 transition-all">
              <div className="">
                <div className="aspect-square rounded-full bg-muted p-3 w-fit">
                  <Cable className="h-5 w-5" />
                </div>
              </div>
              <div className="w-full flex flex-col ">
                <h3 className="text-left">Tickets</h3>
                <p className="text-sm text-left">
                  Acceso a los tickets para desarrollo
                </p>
              </div>
              <div className="">
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        className="!max-w-[100vw] flex flex-col h-full max-h-screen w-screen max-w-screen"
        showClose={false}>
        <SheetTitle className="sr-only">Tickets</SheetTitle>
        <SheetHeader className="flex-shrink-0">
          <SheetDescription className="sr-only">
            Acceso a los tickets para desarrollo
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
              title="Tickets"
              titleClassName="font-bold text-center text-nowrap"
              className="w-full flex justify-center"
            />
          </div>
        </SheetHeader>
        <TicketsDataContainer />
      </SheetContent>
    </Sheet>
  );
}
