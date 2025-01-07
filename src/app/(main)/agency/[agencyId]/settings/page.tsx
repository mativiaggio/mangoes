import AgencyForm from "@/components/forms/agency-form";
import UserForm from "@/components/forms/user-form";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  params: { agencyId: string };
};

const SettingsPage = async ({ params }: Props) => {
  const { agencyId } = await params;

  const authUser = await currentUser();
  if (!authUser) return null;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  if (!userDetails) return null;

  const subAccounts = agencyDetails.SubAccount;
  return (
    <div className="flex lg:!flex-row flex-col gap-4 justify-center">
      <Tabs defaultValue="account" className="w-full md:w-[50vw]">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AgencyForm data={agencyDetails} />
        </TabsContent>
        <TabsContent value="password">
          <UserForm
            type="agency"
            id={agencyId}
            subAccounts={subAccounts}
            userData={userDetails}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
