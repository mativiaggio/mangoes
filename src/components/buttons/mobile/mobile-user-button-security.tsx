"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
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
import ProfilePasswordForm from "@/app/(standalone)/(protected)/configuracion/seguridad/_components/profile-password-form";

interface Props {
  textButton?: boolean;
}
export default function MobileUserButtonSecurity({ textButton }: Props) {
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
        {!textButton ? (
          <div className="w-full" onClick={handleLinkClick}>
            <div className="w-full border-b border-white dark:border-muted pb-4">
              <div className="flex items-center gap-2 hover:opacity-50 transition-all">
                <div className="">
                  <div className="aspect-square rounded-full bg-muted p-3 w-fit">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div className="w-full flex flex-col ">
                  <h3 className="text-left">Seguridad</h3>
                  <p className="text-sm text-left">Contraseña, 2FA</p>
                </div>
                <div className="">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm hover:underline font-semibold mt-2">
            ¿Desea cambiar la contraseña? Click aquí
          </p>
        )}
      </SheetTrigger>
      <SheetContent
        className="!max-w-[100vw] flex flex-col h-full max-h-screen w-screen max-w-screen"
        showClose={false}>
        <SheetTitle className="sr-only">Seguridad</SheetTitle>
        <SheetHeader className="flex-shrink-0">
          <SheetDescription className="sr-only">
            Contraseña, 2FA
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
              title="Seguridad"
              titleClassName="font-bold text-center"
              className="w-full flex justify-center"
            />
          </div>
        </SheetHeader>
        <ProfilePasswordForm />
      </SheetContent>
    </Sheet>
  );
}
