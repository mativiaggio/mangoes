import {
  deleteProduct,
  getAgencyProducts,
  getAuthUserDetails,
  getCategories,
} from "@/lib/queries";
import React from "react";
import ProductsDataTable from "./_components/products-data-table";
import { AlertDialog } from "@/components/ui/alert-dialog";
import CreateProductButton from "./_components/create-product-btn";
import { Product } from "@prisma/client";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const ProductsPage = async ({ params }: Props) => {
  const agencyId = (await params).agencyId;
  const products = await getAgencyProducts(agencyId);
  const data = JSON.parse(JSON.stringify(products));
  const user = await getAuthUserDetails();
  const categories = await getCategories();

  if (!user || !categories) return;

  const handleDelete = async (product: Product) => {
    "use server";
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertDialog>
        <div className="flex flex-col ">
          <CreateProductButton
            user={user}
            categories={categories}
            className="w-[200px] self-end"
          />
          <ProductsDataTable
            agencyId={agencyId}
            user={user}
            categories={categories}
            products={data || []}
            onDelete={handleDelete}
          />
        </div>
      </AlertDialog>
    </>
  );
};

export default ProductsPage;
