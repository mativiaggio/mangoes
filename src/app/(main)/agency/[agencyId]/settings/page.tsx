import AgencyForm from "@/components/forms/agency-form";
import UserForm from "@/components/forms/user-form";
import { db } from "@/database/db";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const SettingsPage = async ({ params }: Props) => {
  const agencyId = (await params).agencyId;

  const authUser = await currentUser();
  if (!authUser) return notFound();

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

  if (!agencyDetails) return notFound();

  if (!userDetails) return notFound();

  const subAccounts = agencyDetails.SubAccount;
  return (
    <div className="flex lg:!flex-row flex-col gap-4 justify-center">
      <Tabs defaultValue="agency" className="w-full md:w-[50vw]">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="agency">Agencia</TabsTrigger>
          <TabsTrigger value="personal-account">Cuenta</TabsTrigger>
        </TabsList>
        <TabsContent value="agency">
          <AgencyForm data={agencyDetails} />
        </TabsContent>
        <TabsContent value="personal-account">
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
