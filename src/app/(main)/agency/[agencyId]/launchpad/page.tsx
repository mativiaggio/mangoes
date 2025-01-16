import LaunchpadForm from "@/components/forms/launchpad-form";
import { db } from "@/lib/db";
import { getAgencyWebsite, getAuthUserDetails } from "@/lib/queries";
import React from "react";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const LaunchPadPage = async ({ params }: Props) => {
  const agencyId = (await params).agencyId;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyId,
    },
  });

  const user = await getAuthUserDetails();
  const website = await getAgencyWebsite(agencyId);

  if (!agencyDetails || !user) return <div>Ocurrió un error</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <LaunchpadForm
          agencyDetails={agencyDetails}
          userId={user.id}
          details={website ? website : undefined}
        />
      </div>
    </div>
  );
};

export default LaunchPadPage;
