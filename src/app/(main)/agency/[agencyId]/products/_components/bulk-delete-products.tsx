"use client";
import { saveActivityLogsNotification } from "@/database/notification/queries";
import { deleteProducts } from "@/database/product/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  agencyId: string;
  selectedProducts: string[];
  onDeleteComplete: () => void;
};

const BulkDeleteProducts = ({
  agencyId,
  selectedProducts,
  onDeleteComplete,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        let s;
        if (selectedProducts.length !== 1) {
          s = "s";
        } else {
          s = "";
        }

        await saveActivityLogsNotification({
          agencyId: agencyId,
          description: `Eliminó | ${selectedProducts.length} producto${s}`,
        });
        await deleteProducts(selectedProducts);
        onDeleteComplete();
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default BulkDeleteProducts;
