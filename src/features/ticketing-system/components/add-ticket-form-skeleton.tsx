import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddTicketFormSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Cargando...</CardTitle>
        <div>
          <Skeleton className="h-[14px] w-full mt-[6px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="space-y-8">
            <div className="">
              <div className="flex flex-col mb-[30px]">
                <p className="text-sm pb-2">Título</p>
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="flex flex-col mb-[30px]">
                <p className="text-sm pb-2">Descripción</p>
                <Skeleton className="h-[60px] w-full" />
              </div>
              <div className="flex flex-col mb-[30px]">
                <p className="text-sm pb-2">Solución</p>
                <Skeleton className="h-[60px] w-full" />
              </div>
              <div className="flex flex-col mb-[30px]">
                <p className="text-sm pb-2">Estado</p>
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="pt-10">
                <Skeleton className="h-10 w-28" />
              </div>
              <div className="pt-10">
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
