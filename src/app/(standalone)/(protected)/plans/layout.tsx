import PageWrapper from "@/components/page-wrapper";

import React from "react";

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
