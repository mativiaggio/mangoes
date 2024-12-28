"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutPanelTop } from "lucide-react";
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
import GenerateRegisterLink from "@/features/auth/components/generate-sign-up";
import { Separator } from "@radix-ui/react-dropdown-menu";
import UsersDataContainer from "@/features/users/components/users-data-container";
import { useRouter } from "next/navigation";

interface Props {
  data: { name: string; email: string; labels: string[] };
}

export default function MobileUserButtonAdminPanel({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  if (!data?.labels.includes("admin")) {
    router.push("/no-autorizado");
    return null;
  }
  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <div className="w-full" onClick={handleLinkClick}>
          <div className="w-full border-b border-white dark:border-muted pb-4">
            <div className="flex items-center gap-2 hover:opacity-50 transition-all">
              <div className="">
                <div className="aspect-square rounded-full bg-muted p-3 w-fit">
                  <LayoutPanelTop className="h-5 w-5" />
                </div>
              </div>
              <div className="w-full flex flex-col ">
                <h3 className="text-left">Panel administrador</h3>
                <p className="text-sm text-left">Links de registro, usuarios</p>
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
        <SheetTitle className="sr-only">Panel Administrador</SheetTitle>
        <SheetHeader className="flex-shrink-0">
          <SheetDescription className="sr-only">
            Links de registro, usuarios
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
              title="Panel administrador"
              titleClassName="font-bold text-center text-nowrap"
              className="w-full flex justify-center"
            />
          </div>
        </SheetHeader>
        <GenerateRegisterLink />
        <Separator />
        <UsersDataContainer />
      </SheetContent>
    </Sheet>
  );
}
