"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useState } from "react";
import LoadingScreen from "../screens/loading-screen";

interface LogoutProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

export const Logout = ({
  className,
  textClassName,
  iconClassName,
}: LogoutProps) => {
  const { mutate } = useLogout();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          mutate();
        }}
        variant={"inherit"}
        className={cn("[&>svg]:size-4 [&>svg]:shrink-0", className)}>
        {loading ? (
          // <Loader2 className={cn("!w-6 !h-6 animate-spin", iconClassName)} />
          <LoadingScreen />
        ) : (
          <LogOut className={cn("!w-6 !h-6", iconClassName)} />
        )}
        <span className={cn("text-xl xl:text-sm", textClassName)}>
          {loading ? " Cerrando sesión" : "Cerrar sesión"}
        </span>
      </Button>
    </div>
  );
};
