import { Lock, ShieldCheck, Store, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Logout } from "../buttons/logout-button";
import { useState } from "react";
import { MobileModeToggle } from "../buttons/theme-toggle";
import { useWindowSize } from "@/hooks/use-window-size";
import Image from "next/image";
import { Models } from "node-appwrite";

interface UserDropdownProps {
  user: Models.User<Models.Preferences> | null;
  fileUrl: string | undefined;
  width?: number;
}

export function UserDropdown({ user, fileUrl }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="select-none cursor-pointer hover:outline-4 hover:outline hover:outline-gray-200">
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 w-fit">
        <DropdownMenuLabel>
          <span className="flex gap-2">
            <Image
              src={"/static/svg/mango-logo.svg"}
              height={20}
              width={20}
              alt="Mango Logo"
            />
            <p className="text-2xl xl:text-lg">{user?.name}</p>
          </span>
          <p className="text-sm xl:text-xs text-muted-foreground">
            {user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.labels.includes("owner") && (
            <>
              <DropdownMenuItem>
                <Link
                  className="!w-full text-xl xl:text-sm flex gap-3 items-center"
                  href={"/settings/admin"}
                  onClick={handleLinkClick}>
                  <ShieldCheck className="!w-6 !h-6" />
                  <span className="w-full flex">Admin</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem>
            <Link
              className="!w-full text-xl xl:text-sm flex gap-3 items-center"
              href={"/settings/datos-personales"}
              onClick={handleLinkClick}>
              <User className="!w-6 !h-6" />
              <span className="w-full flex">Datos personales</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="!w-full text-xl xl:text-sm flex gap-3 items-center"
              href={"/settings/seguridad"}
              onClick={handleLinkClick}>
              <Lock className="!w-6 !h-6" />
              <span className="w-full flex">Seguridad</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {!user?.labels.includes("seller") ? (
          <>
            <DropdownMenuItem>
              <Link
                className="!w-full text-xl xl:text-sm flex gap-3 items-center"
                href={"/pricing"}
                onClick={handleLinkClick}>
                <Store className="!w-6 !h-6" />
                <span className="w-full flex">Abrí tu tienda</span>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link
                className="!w-full text-xl xl:text-sm flex gap-3 items-center"
                href={"/pricing"}
                onClick={handleLinkClick}>
                <Store className="!w-6 !h-6" />
                <span className="w-full flex">Ir a mi tienda</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        {!isDesktop && <MobileModeToggle />}
        <DropdownMenuItem onClick={handleLinkClick}>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
