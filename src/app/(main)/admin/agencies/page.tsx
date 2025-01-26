import React from "react";
import AgenciesDataTable from "./_components/agency-data-table";
import { db } from "@/lib/db";
import { getAuthUserDetails } from "@/lib/queries";

const AdminPage = async () => {
  const agencies = await db.agency.findMany();
  const user = await getAuthUserDetails();

  if (!agencies || !user) return null;

  return <AgenciesDataTable user={user} agencies={agencies} />;
};

export default AdminPage;
