"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../buttons/theme-toggle";
import { UserDropdown } from "../dropdowns/user-dropdown";
import { Input } from "../ui/input";
import { Models } from "node-appwrite";
import { LogIn } from "lucide-react";

type DesktopNavbarProps = {
  user: Models.User<Models.Preferences> | null;
};
export const DesktopNavbar = ({ user }: DesktopNavbarProps) => {
  return (
    <div className="flex w-full items-center justify-between px-10 py-2">
      <div className="flex w-1/6 text-main-blue dark:text-foreground">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/static/svg/mango-logo.svg"
            height={30}
            width={30}
            alt="Logo"
          />
          <span className="flex flex-col ml-2 font-bold">
            <h1 className="text-2xl">Mangoes</h1>
          </span>
        </Link>
      </div>
      <nav className="w-3/6">
        <ul className="flex items-center justify-between gap-6">
          <li className="w-full">
            <Input placeholder="Busca lo que quieras" />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
      <div className="w-1/6 flex justify-end">
        {user ? (
          <UserDropdown />
        ) : (
          <Link
            className="text-base flex gap-2 items-center justify-center hover:text-main-oranger dark:hover:text-main-orange"
            href={"/login"}>
            Iniciar sesión <LogIn size={18} />
          </Link>
        )}
      </div>
    </div>
  );
};
