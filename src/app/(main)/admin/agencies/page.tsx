import React from "react";
import AgenciesDataTable from "./_components/agency-data-table";
import { db } from "@/database/db";
import { getAuthUserDetails } from "@/database/auth/queries";

const AdminPage = async () => {
  const agencies = await db.agency.findMany({
    include: {
      Subscription: true,
    },
  });
  const user = await getAuthUserDetails();

  if (!agencies || !user) return null;

  return <AgenciesDataTable user={user} agencies={agencies} />;
};

export default AdminPage;
