import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export default AdminLayout;
