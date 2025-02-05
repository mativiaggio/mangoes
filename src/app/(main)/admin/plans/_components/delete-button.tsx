"use client";

import { deletePlan } from "@/database/plan/queries";
import { useLanguage } from "@/lib/contexts/language-context";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  planId: string;
  onDeleteComplete: () => void;
};

const DeletePlanButton = ({ planId, onDeleteComplete }: Props) => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div
      className="text-white"
      onClick={async () => {
        await deletePlan(planId);
        onDeleteComplete();
        router.refresh();
      }}>
      {t.delete}
    </div>
  );
};

export default DeletePlanButton;
