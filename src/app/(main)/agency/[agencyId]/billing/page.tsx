import React from "react";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const BillingPage = async ({ params }: Props) => {
  const agencyId = (await params).agencyId;

  console.log(agencyId);

  return <div>BillingPage</div>;
};

export default BillingPage;
