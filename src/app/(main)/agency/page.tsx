import AgencyForm from "@/components/forms/agency-form";
import NotFound from "@/components/pages/not-found";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ agencyId: string }>;
  searchParams: Promise<{ [plan: string]: Plan | Plan[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const plan = (await searchParams).plan;
  const agencyId = await verifyAndAcceptInvitation();

  //get the users details
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${plan}`);
      }
      return redirect(`/agency/${agencyId}`);
    } else {
      return <NotFound />;
    }
  }
  const authUser = await currentUser();
  return (
    <div className="flex justify-center items-center mt-4 w-full">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl w-full">
        <AgencyForm
          data={{
            companyEmail: authUser?.emailAddresses[0].emailAddress,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
