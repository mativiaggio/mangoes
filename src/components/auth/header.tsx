import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <span className="flex">
        <Image
          src={"/assets/svg/hexagon.svg"}
          height={30}
          width={30}
          alt="Mango"
        />
        <h1 className={cn("text-3xl font-bold")}>Mangoes</h1>
      </span>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
