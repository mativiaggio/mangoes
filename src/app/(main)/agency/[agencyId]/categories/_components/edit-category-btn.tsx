"use client";
import CustomModal from "@/components/custom-modal";
import CategoryForm from "@/components/forms/category-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";

import {
  Agency,
  AgencySidebarOption,
  Category,
  SubAccount,
  User,
} from "@prisma/client";
import { Edit } from "lucide-react";
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
  details: Category;
};

const EditCategoryButton = ({ className, user, details }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge("h-8 justify-start !w-full px-2", className)}
      variant={"ghost"}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un producto / servicio"
            subheading="Ingresa los detalles del producto/servicio">
            <CategoryForm
              details={details}
              agencyDetails={agencyDetails}
              userId={user.id}
            />
          </CustomModal>
        );
      }}>
      <Edit className="h-4 w-4 mr-2" />
      Editar
    </Button>
  );
};

export default EditCategoryButton;
