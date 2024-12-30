"use client";

import { PageTitle } from "@/components/page-title";
import ProfilePasswordForm from "./_components/profile-password-form";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";

export default function ProfilePassword() {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;

  return (
    <>
      {" "}
      {isClient && isDesktop && (
        <>
          <PageTitle
            title="Seguridad"
            subtitle="Gestione la seguridad de su cuenta"
          />
          <Separator />
        </>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <ProfilePasswordForm />
      </div>
    </>
  );
}
