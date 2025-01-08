"use client";
import {
  deleteProduct,
  getProductDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  agencyId: string;
  productId: string;
  onDeleteComplete: () => void;
};

const DeleteProductButton = ({
  agencyId,
  productId,
  onDeleteComplete,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getProductDetails(productId);
        await saveActivityLogsNotification({
          agencyId: agencyId,
          description: `Eliminó un producto | ${response?.name}`,
        });
        await deleteProduct(productId);
        onDeleteComplete();
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default DeleteProductButton;
