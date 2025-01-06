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
  const agencyId = await verifyAndAcceptInvitation();
  console.log(agencyId);

  //get the users details
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not authorized</div>;
    }
  }
  const authUser = await currentUser();
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] p-4 rounded-xl">
        <h1 className="text-4xl font-bold"> Crea una marca en Mongoes</h1>
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
