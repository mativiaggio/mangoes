import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingStores() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
      <span className="flex flex-col gap-1">
        <Skeleton className="h-auto w-full aspect-square" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </span>
      <span className="flex flex-col gap-1">
        <Skeleton className="h-auto w-full aspect-square" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </span>
      <span className="flex flex-col gap-1">
        <Skeleton className="h-auto w-full aspect-square" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </span>
      <span className="flex flex-col gap-1">
        <Skeleton className="h-auto w-full aspect-square" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </span>
    </div>
  );
}
