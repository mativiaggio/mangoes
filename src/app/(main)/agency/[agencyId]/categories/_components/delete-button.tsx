"use client";
import {
  deleteCategory,
  getProductDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  agencyId: string;
  categoryId: string;
  onDeleteComplete: () => void;
};

const DeleteCategoryButton = ({
  agencyId,
  categoryId,
  onDeleteComplete,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getProductDetails(categoryId);
        await saveActivityLogsNotification({
          agencyId: agencyId,
          description: `Eliminó una categoría | ${response?.name}`,
        });
        await deleteCategory(categoryId);
        onDeleteComplete();
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default DeleteCategoryButton;
