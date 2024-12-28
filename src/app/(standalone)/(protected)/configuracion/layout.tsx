import PageWrapper from "@/components/page-wrapper";

import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <div className="hidden xl:block w-1/6 border-r"></div>
      {children}
      <div className="hidden xl:block w-1/6 border-l"></div>
    </PageWrapper>
  );
}
