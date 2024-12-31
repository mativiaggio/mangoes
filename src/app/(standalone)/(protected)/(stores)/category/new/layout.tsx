import PageWrapper from "@/components/page-wrapper";

import React from "react";

export default function AddNewCategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper level2={true}>{children}</PageWrapper>;
}
