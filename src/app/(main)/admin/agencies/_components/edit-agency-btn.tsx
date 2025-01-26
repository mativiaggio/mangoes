"use client";
import CustomModal from "@/components/custom-modal";
import CategoryForm from "@/components/forms/category-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";

import { Agency, Category, SubAccount, User } from "@prisma/client";
import { Edit } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className: string;
  details: Category;
};

const EditAgencyButton = ({ className }: Props) => {
  const { setOpen } = useModal();

  return (
    <Button
      className={twMerge("h-8 justify-start !w-full px-2", className)}
      variant={"ghost"}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un producto / servicio"
            subheading="Ingresa los detalles del producto/servicio">
            <p></p>
          </CustomModal>
        );
      }}>
      <Edit className="h-4 w-4 mr-2" />
      Editar
    </Button>
  );
};

export default EditAgencyButton;
