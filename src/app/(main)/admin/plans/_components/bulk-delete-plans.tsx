"use client";
import { deletePlans } from "@/database/plan/queries";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/contexts/language-context";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  selectedPlans: string[];
  onDeleteComplete: () => void;
};

const BulkDeletePlans = ({ selectedPlans, onDeleteComplete }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();

  return (
    <div
      className="text-white"
      onClick={async () => {
        await deletePlans(selectedPlans);
        onDeleteComplete();
        toast({
          title: "Éxito",
          description: "Los planes seleccionados han sido eliminados",
          variant: "success",
        });
        router.refresh();
      }}>
      {t.delete}
    </div>
  );
};

export default BulkDeletePlans;
