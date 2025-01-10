/* eslint-disable @typescript-eslint/no-explicit-any */
import BlurPage from "@/components/blur-page";
import InfoBar from "@/components/infobar";
import Sidebar from "@/components/sidebars";
import Unauthorized from "@/components/unauthorized";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ agencyId: string }>;
};

const Layout = async ({ children, params }: Props) => {
  // Ensure params are properly awaited if needed
  const agencyId = (await params).agencyId;
  const verifiedAgencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) return redirect("/");

  if (!verifiedAgencyId) return redirect("/agency");

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <Unauthorized />;

  let allNotifications: any = [];

  const notifications = await getNotificationAndUser(verifiedAgencyId);

  if (notifications) allNotifications = notifications;

  return (
    <div className="h-screen w-screen">
      <Sidebar id={agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <InfoBar
          notifications={allNotifications}
          role={allNotifications.User?.role}
        />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default Layout;
