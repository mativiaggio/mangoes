import AdminInfoBar from "@/components/admin-infobar";
import AdminSidebar from "@/components/admin-sidebar";
import BlurPage from "@/components/blur-page";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user || !user?.privateMetadata.isAdmin) {
    return notFound();
  }

  return (
    <div className="flex items-center">
      <div className="h-screen w-screen">
        <AdminSidebar />
        <div className="md:pl-[300px]">
          <AdminInfoBar />
          <div className="relative">
            <BlurPage>{children}</BlurPage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
