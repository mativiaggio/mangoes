import { getAgencyProducts } from "@/lib/queries";
import React from "react";
import ProductsDataTable from "./_components/products-data-table";

type Props = {
  params: { agencyId: string };
};

const ProductsPage = async ({ params }: Props) => {
  const { agencyId } = await params;
  const products = await getAgencyProducts(agencyId);

  const data = JSON.parse(JSON.stringify(products));

  return <ProductsDataTable products={data || []} />;
};

export default ProductsPage;
