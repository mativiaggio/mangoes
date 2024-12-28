"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface modelToggleProps {
  buttonClasses?: string;
  iconSize?: string;
}

export function ModeToggle({ buttonClasses, iconSize }: modelToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={buttonClasses}>
          <Sun
            className={`${
              iconSize ? iconSize : "h-[1.2rem] w-[1.2rem]"
            } rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
          />
          <Moon
            className={`absolute ${
              iconSize ? iconSize : "h-[1.2rem] w-[1.2rem]"
            } rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem
          className="cursor-pointer text-xl xl:text-sm"
          onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-xl xl:text-sm"
          onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-xl xl:text-sm"
          onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileModeToggle({
  buttonClasses,
  iconSize,
}: modelToggleProps) {
  const { theme, setTheme } = useTheme();

  // Determine if the current theme is dark
  const isDarkMode = theme === "dark";

  return (
    <div className="relative flex cursor-default select-none items-center gap-2 rounded-full px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-hover">
      <div className={`flex items-center gap-2 ${buttonClasses}`}>
        {/* <p className="text-xl xl:text-sm">Tema</p> */}
        <Sun
          className={`${iconSize ? iconSize : "!w-6 !h-6"} text-yellow-500`}
        />
        <Label htmlFor="theme-switch" className="sr-only">
          Toggle theme
        </Label>
        <Switch
          id="theme-switch"
          checked={isDarkMode}
          onPointerDown={(e) => e.stopPropagation()} // Detén la propagación al interactuar con el Switch
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        <Moon className={`${iconSize ? iconSize : "!w-6 !h-6"}`} />
      </div>
    </div>
  );
}
