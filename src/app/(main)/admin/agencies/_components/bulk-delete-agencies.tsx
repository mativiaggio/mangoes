"use client";
import { deleteAgencies } from "@/database/agency/queries";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  selectedAgencies: string[];
  onDeleteComplete: () => void;
};

const BulkDeleteAgencies = ({ selectedAgencies, onDeleteComplete }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div
      className="text-white"
      onClick={async () => {
        await deleteAgencies(selectedAgencies);
        onDeleteComplete();
        toast({
          title: "Éxito",
          description: "Las agencias seleccionadas han sido eliminadas",
          variant: "success",
        });
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default BulkDeleteAgencies;
