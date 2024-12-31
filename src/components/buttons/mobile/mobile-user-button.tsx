"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Github, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
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
import { Logout } from "../logout-button";
import MobileUserButtonPersonalization from "./mobile-user-button-personalization";
import MobileUserButtonPersonalData from "./mobile-user-button-personal-data";
import MobileUserButtonSecurity from "./mobile-user-button-security";
import MobileUserButtonAdminPanel from "./mobile-user-button-admin-panel";
import MobileUserButtonTickets from "./mobile-user-button-tickets";
import { env } from "@/env.config";
import { Models } from "node-appwrite";
import Image from "next/image";

interface MobileUserButtonProps {
  user: Models.User<Models.Preferences> | null;
  fileUrl: string | undefined;
  title?: string;
  subtitle?: string;
}

export default function MobileUserButton({
  user,
  fileUrl,
  title,
  subtitle,
}: MobileUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={"prose select-none"}>
        <h1
          className={
            "text-2xl xl:text-3xl font-semibold flex gap-2 items-center text-main-orange dark:text-primary"
          }>
          <Image
            src="/static/svg/mango-logo.svg"
            height={30}
            width={30}
            alt="Logo"
          />
          {title}
        </h1>
        <p className="text-xs xl:text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {user ? (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetTrigger>
            <div className="flex gap-2 items-center border rounded-full p-2 hover:bg-muted">
              <Avatar className="select-none cursor-pointer rounded-full h-8 w-8">
                <AvatarImage
                  src={fileUrl || `/static/images/happy-mango.jpg`}
                  className="object-cover"
                />
                <AvatarFallback>
                  <AvatarImage
                    src={`/static/images/happy-mango.jpg`}
                    className="object-cover"
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <div>{user?.name}</div>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent
            className="!max-w-[100vw] flex flex-col h-full max-h-screen w-screen max-w-screen"
            showClose={false}>
            <SheetTitle className="sr-only">Menú de Usuario</SheetTitle>
            <SheetHeader className="flex-shrink-0">
              <SheetDescription className="sr-only">
                Este menú tiene diversas opciones para los usuarios
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
                  title="Configuración"
                  titleClassName="font-bold text-center"
                  className="w-full flex justify-center !max-w-full"
                />
              </div>
              <div className="flex flex-col gap-8">
                <div className="bg-main-card border-main-card rounded-xl p-4 flex gap-4">
                  <Avatar className="select-none cursor-pointer rounded-full h-14 w-14">
                    <AvatarImage
                      className="object-cover"
                      src={
                        fileUrl ||
                        `https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}}`
                      }
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-xl text-left">{user?.name}</div>
                    <div className="text-base text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="grid gap-4 py-4">
                {user?.labels.includes("owner") && (
                  <>
                    <h2>Avanzado</h2>
                    <div className="bg-main-card border-main-card rounded-xl">
                      <div className="flex flex-col gap-4 p-8">
                        <MobileUserButtonAdminPanel data={user!} />
                      </div>
                    </div>
                  </>
                )}
                <h2>Mi cuenta</h2>
                <div className="bg-main-card border-main-card rounded-xl">
                  <div className="flex flex-col gap-4 p-8">
                    <MobileUserButtonPersonalData data={user!} />
                    <MobileUserButtonSecurity />
                    <MobileUserButtonPersonalization />
                  </div>
                </div>
                <h2>Soporte</h2>
                <div className="bg-main-card border-main-card rounded-xl">
                  <div className="flex flex-col gap-4 p-8">
                    <MobileUserButtonTickets />
                    <Link
                      className="w-full"
                      href={"https://github.com/mativiaggio/mangoes"}
                      onClick={handleLinkClick}>
                      <div className="w-full border-b border-white dark:border-muted pb-4">
                        <div className="flex items-center gap-2 hover:opacity-50 transition-all">
                          <div className="">
                            <div className="aspect-square rounded-full bg-muted p-3 w-fit">
                              <Github className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="w-full flex flex-col ">
                            <h3>GitHub</h3>
                            <p className="text-sm">Repositorio del proyecto</p>
                          </div>
                          <div className="">
                            <ChevronRight />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <Logout
                    className="!p-2 rounded-full transition-all"
                    textClassName="!text-base text-red-500"
                    iconClassName="text-red-500"
                  />
                </div>
                <div className="w-full flex justify-center items-center">
                  <p className="text-sm">Versión {env.APP_VERSION}</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="flex gap-4">
          <Link
            className="flex gap-2 items-center justify-center hover:text-main-oranger dark:hover:text-main-orange"
            href={"/create-account"}>
            Crear cuenta
          </Link>
          <Link
            className="flex gap-2 items-center justify-center hover:text-main-oranger dark:hover:text-main-orange"
            href={"/login"}>
            Iniciar sesión
          </Link>
        </div>
      )}
    </>
  );
}
