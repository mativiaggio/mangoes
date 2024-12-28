"use client";
import { PageTitle } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";

export default function ProfilePasswordSkeleton() {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;

  return (
    <div className="w-full max-w-2xl mx-auto ">
      {isClient && isDesktop && (
        <>
          <div className="space-y-6">
            <PageTitle
              title="Datos personales"
              subtitle="Administre la configuración de su cuenta y establezca las preferencias de correo electrónico."
            />
          </div>
          <Separator />
        </>
      )}

      <div className="space-y-6">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      <Separator />

      <section className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center space-x-4">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      </section>

      <Separator />

      <Skeleton className="h-10 w-full" />
    </div>
  );
}
