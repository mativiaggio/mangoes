"use client";
import TicketsDataContainer from "@/features/ticketing-system/components/tickets-data-container";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { TicketIcon } from "lucide-react";
import { PageTitle } from "@/components/page-title";

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;
  return (
    <>
      {isClient && isDesktop && (
        <>
          <PageTitle
            title="Tickets"
            icon={
              <TicketIcon className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
            }
            subtitle="Comienza a gestionar los tickets para soporte"
          />
        </>
      )}

      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <TicketsDataContainer />
      </div>
    </>
  );
}
