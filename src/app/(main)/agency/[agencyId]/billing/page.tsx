import React from "react";

type Props = {
  params: { agencyId: string };
};

const BillingPage = async ({ params }: Props) => {
  const { agencyId } = await params;

  console.log(agencyId);

  return <div>BillingPage</div>;
};

export default BillingPage;
