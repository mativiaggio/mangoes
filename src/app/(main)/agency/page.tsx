import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import AgencyForm from "./_components/agency-form";

const Page = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) => {
  const { plan } = await searchParams;
  const agencyId = await verifyAndAcceptInvitation();
  console.log(agencyId);

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
      return <div>Not authorized</div>;
    }
  }
  const authUser = await currentUser();
  return (
    <div className="!w-full flex justify-center items-center my-4">
      <div className="!w-full max-w-[850px] rounded-xl">
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
