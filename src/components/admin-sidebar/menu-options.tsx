/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import clsx from "clsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/language-context";

type Props = {
  defaultOpen?: boolean;
  user: any;
};

const linkOrder = ["dashboard", "plans", "agencies"];

const sidebarOptions = [
  {
    id: "dashboard",
    translationKey: "dashboard",
    link: "/admin",
    icon: "category",
  },
  {
    id: "plans",
    translationKey: "plans",
    link: "/admin/plans",
    icon: "payment",
  },
  {
    id: "agencies",
    translationKey: "agencies",
    link: "/admin/agencies",
    icon: "person",
  },
];

const MenuOptions = ({ defaultOpen }: Props) => {
  const { t }: { t: Record<string, string> } = useLanguage(); // Contexto de traducción
  const [isMounted, setIsMounted] = useState(false);
  const currentPath = usePathname();

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 md:!hidden flex z-50">
        <Button variant={"outline"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}>
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SheetDescription className="sr-only">
          This is the sidebar
        </SheetDescription>
        <div>
          <div className="w-full text-2xl font-extrabold px-3 flex items-center gap-2">
            <Image
              src={"/assets/svg/hexagon.svg"}
              height={30}
              width={30}
              alt="Agency Logo"
            />
            Mangoes Admin
          </div>
          <Separator className="mt-8" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder={t.search + "..."} />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>{t.noResults}</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOptions
                    .sort(
                      (a, b) =>
                        linkOrder.indexOf(a.translationKey) -
                        linkOrder.indexOf(b.translationKey)
                    )
                    .map((sidebarOption) => {
                      const IconComponent =
                        icons.find((icon) => icon.value === sidebarOption.icon)
                          ?.path || null;

                      return (
                        <CommandItem
                          key={sidebarOption.id}
                          className={cn(
                            "w-full hover:bg-red-500/20 dark:hover:bg-red-500/30 !p-0 mb-1",
                            currentPath === sidebarOption.link
                              ? "!bg-main-primary dark:!bg-main-secondary !text-white hover:!text-white"
                              : ""
                          )}>
                          <Link
                            href={sidebarOption.link}
                            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-full px-2 py-1.5">
                            {IconComponent && <IconComponent />}
                            <span>{t[sidebarOption.translationKey]}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
