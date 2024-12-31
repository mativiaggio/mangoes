"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../buttons/theme-toggle";
import { UserDropdown } from "../dropdowns/user-dropdown";
import { Input } from "../ui/input";
import { Models } from "node-appwrite";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type DesktopNavbarProps = {
  user: Models.User<Models.Preferences> | null;
  fileUrl: string | undefined;
};
export const DesktopNavbar = ({ user, fileUrl }: DesktopNavbarProps) => {
  const path = usePathname();

  return (
    <div className="flex w-full items-center justify-between px-10 py-2 h-[56px]">
      <div className="flex w-1/6 text-main-orange dark:text-foreground">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/static/svg/mango-logo.svg"
            height={30}
            width={30}
            alt="Logo"
          />
          <span className="flex flex-col ml-2 font-bold">
            <h1 className="text-2xl font-bold text-main-oranger">Mangoes</h1>
          </span>
        </Link>
      </div>
      <nav className="w-3/6">
        <ul
          className={cn(
            `flex items-center gap-6 text-base`,
            path === "/stores" ? "justify-between" : "justify-center"
          )}>
          {path === "/stores" ? (
            <>
              <li className="w-full">
                <Input
                  placeholder="Busca lo que quieras"
                  className="h-[32px]"
                />
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          ) : (
            <>
              <li>
                <a className="hover:text-main-orange" href={"#features"}>
                  Características
                </a>
              </li>
              <li>
                <a className="hover:text-main-orange" href={"#pricing"}>
                  Precios
                </a>
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="w-1/6 flex justify-end">
        {user ? (
          <UserDropdown user={user} fileUrl={fileUrl} />
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
      </div>
    </div>
  );
};
