import SubAccountForm from "@/components/forms/subaccount-form";
import UserForm from "@/components/forms/user-form";
import BlurPage from "@/components/blur-page";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  params: Promise<{ subAccountId: string }>;
};

const SubaccountSettingPage = async ({ params }: Props) => {
  const subAccountId = (await params).subAccountId;
  const authUser = await currentUser();
  if (!authUser) return;
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) return;

  const subAccount = await db.subAccount.findUnique({
    where: { id: subAccountId },
  });
  if (!subAccount) return;

  const agencyDetails = await db.agency.findUnique({
    where: { id: subAccount.agencyId },
    include: { SubAccount: true },
  });

  if (!agencyDetails) return;
  const subAccounts = agencyDetails.SubAccount;

  return (
    <BlurPage>
      <div className="flex lg:!flex-row flex-col gap-4 w-full">
        <div className="flex lg:!flex-row flex-col gap-4 justify-center items-center  w-full">
          <Tabs defaultValue="agency" className="w-full md:w-[50vw]">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="agency">Agencia</TabsTrigger>
              <TabsTrigger value="personal-account">Cuenta</TabsTrigger>
            </TabsList>
            <TabsContent value="agency">
              <SubAccountForm
                agencyDetails={agencyDetails}
                details={subAccount}
                userId={userDetails.id}
                userName={userDetails.name}
              />
            </TabsContent>
            <TabsContent value="personal-account">
              <UserForm
                type="subaccount"
                id={subAccountId}
                subAccounts={subAccounts}
                userData={userDetails}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BlurPage>
  );
};

export default SubaccountSettingPage;
