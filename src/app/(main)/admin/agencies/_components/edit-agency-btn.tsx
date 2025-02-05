"use client";
import CustomModal from "@/components/custom-modal";
import AdminAgencyForm from "@/components/forms/admin-agency-form";
import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";
import { Agency, Subscription } from "@prisma/client";
import { Edit } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  agency: Agency & { Subscription?: Subscription | null };
  className: string;
};

const EditAgencyButton = ({ agency, className }: Props) => {
  const { setOpen } = useModal();

  return (
    <Button
      className={twMerge("h-8 justify-start !w-full px-2", className)}
      variant={"ghost"}
      onClick={() => {
        setOpen(
          <CustomModal
            title={`Controlador de ${agency.name}`}
            subheading="Modifica el estado de la suscripción de la agencia">
            <AdminAgencyForm agency={agency} />
          </CustomModal>
        );
      }}>
      <Edit className="h-4 w-4 mr-2" />
      Editar
    </Button>
  );
};

export default EditAgencyButton;
