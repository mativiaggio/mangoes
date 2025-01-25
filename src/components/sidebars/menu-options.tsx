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
// import { useModal } from "@/lib/providers/modal-provider";
import { icons } from "@/lib/constants";
import { Button } from "@/components/ui/button";
// import CustomModal from "../custom-modal";
// import SubAccountForm from "../forms/subaccount-form";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { env } from "@/lib/env.config";

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
  "Dashboard",
  "Launchpad",
  "Categorías",
  "Productos",
  "Inventario",
  "Ingresos",
  "Facturas de venta",
  "Egresos",
  "Facturas de compra",
  "Facturación",
  "Configuración",
  "Subcuentas",
  "Equipo",
  "Contactos",
];

const sidebarOptions = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "/agency/:id",
    icon: "category",
  },
  {
    id: "launchpad",
    name: "Launchpad",
    link: "/agency/:id/launchpad",
    icon: "rocket",
  },
  {
    id: "categories",
    name: "Categorías",
    link: "/agency/:id/categories",
    icon: "list",
  },
  {
    id: "products",
    name: "Productos",
    link: "/agency/:id/products",
    icon: "archive",
  },
  {
    id: "inventory",
    name: "Inventario",
    link: "/agency/:id/inventory",
    icon: "packageOpen",
  },
  {
    id: "sales",
    name: "Ingresos",
    link: "/agency/:id/sales",
    icon: "wallet",
  },
  {
    id: "sales-invoices",
    name: "Facturas de venta",
    link: "/agency/:id/sales-invoices",
    icon: "fileInput",
  },
  {
    id: "purchases",
    name: "Egresos",
    link: "/agency/:id/purchases",
    icon: "handCoins",
  },
  {
    id: "purchases-invoices",
    name: "Facturas de compra",
    link: "/agency/:id/purchases-invoices",
    icon: "fileOutput",
  },
  {
    id: "billing",
    name: "Facturación",
    link: "/agency/:id/billing",
    icon: "payment",
  },
  {
    id: "settings",
    name: "Configuración",
    link: "/agency/:id/settings",
    icon: "settings",
  },
  {
    id: "team",
    name: "Equipo",
    link: "/agency/:id/team",
    icon: "shield",
  },
  {
    id: "contacts",
    name: "Contactos",
    link: "/agency/:id/contacts",
    icon: "person",
  },
];

const MenuOptions = ({
  defaultOpen,
  // subAccounts,
  // sidebarOptions,
  details,
  website,
}: // user,
Props) => {
  // const { setOpen } = useModal();
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
              src={details.agencyLogo}
              height={30}
              width={30}
              alt="Agency Logo"
            />
            {details.name}
          </div>
          <Separator className="mt-8" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Buscar..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOptions
                    .sort(
                      (a, b) =>
                        linkOrder.indexOf(a.name) - linkOrder.indexOf(b.name)
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
                            <span>{sidebarOption.name}</span>
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
                        <span>Ir a la página</span>
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
