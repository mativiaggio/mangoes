import { cn } from "@/lib/utils";
import React from "react";

export default function PageWrapper({
  children,
  className,
  level2,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  level2?: boolean;
}>) {
  return (
    <div className={cn("page-wrapper flex justify-center", className)}>
      <div className="w-full flex justify-between">
        {level2 ? (
          <div className="w-full flex justify-center">
            <div className="w-full xl:w-3/6">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
