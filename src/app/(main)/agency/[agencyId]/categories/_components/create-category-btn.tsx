"use client";
import CustomModal from "@/components/custom-modal";
import CategoryForm from "@/components/forms/category-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";

import { Agency, SubAccount, User } from "@prisma/client";
import { ArchiveRestore } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
            })
        )
      | null;
  };
  className?: string;
};

const CreateCategoryButton = ({ className, user }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge("w-full flex gap-4 mb-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga una categoría"
            subheading="Ingresa los detalles de la categoría">
            <CategoryForm agencyDetails={agencyDetails} userId={user.id} />
          </CustomModal>
        );
      }}>
      <ArchiveRestore size={15} color="white" />
      <span className="text-white">Carga una categoría</span>
    </Button>
  );
};

export default CreateCategoryButton;
