/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SubAccount, Website } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ExternalLink, Menu } from "lucide-react";
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
import { env } from "@/lib/env.config";
import { useLanguage } from "@/lib/contexts/language-context";

type Props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarLogo: string;
  details: any;
  website?: Website;
  user: any;
  id: string;
};

const linkOrder = [
  "dashboard",
  "launchpad",
  "categories",
  "products",
  "inventory",
  "sales",
  "salesInvoices",
  "purchases",
  "purchasesInvoices",
  "settings",
  "contacts",
  "team",
];

const sidebarOptions = [
  {
    id: "dashboard",
    translationKey: "dashboard",
    link: "/agency/:id",
    icon: "category",
  },
  {
    id: "launchpad",
    translationKey: "launchpad",
    link: "/agency/:id/launchpad",
    icon: "rocket",
  },
  {
    id: "categories",
    translationKey: "categories",
    link: "/agency/:id/categories",
    icon: "list",
  },
  {
    id: "products",
    translationKey: "products",
    link: "/agency/:id/products",
    icon: "archive",
  },
  {
    id: "inventory",
    translationKey: "inventory",
    link: "/agency/:id/inventory",
    icon: "packageOpen",
  },
  {
    id: "sales",
    translationKey: "sales",
    link: "/agency/:id/sales",
    icon: "wallet",
  },
  {
    id: "sales-invoices",
    translationKey: "salesInvoices",
    link: "/agency/:id/sales-invoices",
    icon: "fileInput",
  },
  {
    id: "purchases",
    translationKey: "purchases",
    link: "/agency/:id/purchases",
    icon: "handCoins",
  },
  {
    id: "purchases-invoices",
    translationKey: "purchasesInvoices",
    link: "/agency/:id/purchases-invoices",
    icon: "fileOutput",
  },
  {
    id: "settings",
    translationKey: "settings",
    link: "/agency/:id/settings",
    icon: "settings",
  },
  {
    id: "team",
    translationKey: "team",
    link: "/agency/:id/team",
    icon: "shield",
  },
  {
    id: "contacts",
    translationKey: "contacts",
    link: "/agency/:id/contacts",
    icon: "person",
  },
];

const MenuOptions = ({ defaultOpen, details, website }: Props) => {
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
            {details.agencyLogo && (
              <Image
                src={details.agencyLogo}
                height={30}
                width={30}
                alt="Agency Logo"
              />
            )}
            {details.name}
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
                            "md:w-[320px] w-full hover:bg-red-500/20 dark:hover:bg-red-500/30 !p-0",
                            currentPath ===
                              sidebarOption.link.replace(":id", details.id)
                              ? "!bg-main-primary dark:!bg-main-secondary !text-white hover:!text-white"
                              : ""
                          )}>
                          <Link
                            href={sidebarOption.link.replace(":id", details.id)}
                            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px] px-2 py-1.5">
                            {IconComponent && <IconComponent />}
                            <span>{t[sidebarOption.translationKey]}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  {website && (
                    <CommandItem className="md:w-[320px] w-full hover:bg-red-500/20 dark:hover:bg-red-500/30 !p-0">
                      <Link
                        href={`${env.SCHEME}${website.domain}.${env.DOMAIN}/`}
                        target="_blank"
                        className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px] px-2 py-1.5">
                        <ExternalLink />
                        <span>{t.goToWebsite}</span>
                      </Link>
                    </CommandItem>
                  )}
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
