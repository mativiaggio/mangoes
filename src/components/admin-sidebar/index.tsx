import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

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
