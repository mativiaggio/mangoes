"use client";
import CustomModal from "@/components/custom-modal";
import ProductForm from "@/components/forms/product-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";

import {
  Agency,
  AgencySidebarOption,
  Category,
  SubAccount,
  User,
} from "@prisma/client";
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
              SideBarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  className: string;
  categories: Category[];
};

const CreateProductButton = ({ className, user, categories }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails || !categories) return;

  return (
    <Button
      className={twMerge("w-full flex gap-4 mb-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un producto / servicio"
            subheading="Ingresa los detalles del producto/servicio">
            <ProductForm
              agencyDetails={agencyDetails}
              userId={user.id}
              categories={categories}
            />
          </CustomModal>
        );
      }}>
      <ArchiveRestore size={15} color="white" />
      <span className="text-white">Carga un producto</span>
    </Button>
  );
};

export default CreateProductButton;
