"use client";

import { deleteAgency } from "@/database/agency/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  agencyId: string;
  onDeleteComplete: () => void;
};

const DeleteCategoryButton = ({ agencyId, onDeleteComplete }: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        await deleteAgency(agencyId);
        onDeleteComplete();
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default DeleteCategoryButton;
