"use client";

import * as React from "react";
import Link from "next/link";

import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src={"/assets/svg/mango.svg"}
              height={25}
              width={25}
              alt="Mango"
            />
            <span className="text-2xl font-bold">Mangoes</span>
          </Link>
        </div>
        <div className="flex gap-4 justify-end">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
