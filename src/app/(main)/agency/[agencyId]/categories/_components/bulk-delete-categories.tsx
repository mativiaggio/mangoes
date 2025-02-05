"use client";
import { deleteCategories } from "@/database/category/queries";
import { saveActivityLogsNotification } from "@/database/notification/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  agencyId: string;
  selectedCategories: string[];
  onDeleteComplete: () => void;
};

const BulkDeleteCategories = ({
  agencyId,
  selectedCategories,
  onDeleteComplete,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        let s;
        if (selectedCategories.length !== 1) {
          s = "s";
        } else {
          s = "";
        }

        await saveActivityLogsNotification({
          agencyId: agencyId,
          description: `Eliminó | ${selectedCategories.length} categoría${s}`,
        });
        await deleteCategories(selectedCategories);
        onDeleteComplete();
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default BulkDeleteCategories;
