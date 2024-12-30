"use client";

import ProfileSettingsForm from "./_components/profile-settings-form";
import { PageTitle } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCurrent } from "@/features/auth/api/use-current";
import LoadingScreen from "@/components/screens/loading-screen";

export default function ProfileSettings() {
  const { data, isLoading } = useCurrent();
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        {" "}
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
        <div className={(isClient && !isDesktop && "pt-6") || ""}>
          <ProfileSettingsForm data={data!} />
        </div>
      </>
    );
  }
}
