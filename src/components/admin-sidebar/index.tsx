import React from "react";
import MenuOptions from "./menu-options";
import { getAuthUserDetails } from "@/database/auth/queries";

const AdminSidebar = async () => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  return (
    <>
      <MenuOptions defaultOpen={true} user={user} />

      <MenuOptions user={user} />
    </>
  );
};

export default AdminSidebar;
