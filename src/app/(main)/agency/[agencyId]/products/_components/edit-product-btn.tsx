"use client";
import CustomModal from "@/components/custom-modal";
import ProductForm from "@/components/forms/product-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";

import {
  Agency,
  AgencySidebarOption,
  Category,
  Product,
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
  categories: Category[];
  details: Product;
};

const EditProductButton = ({ className, user, categories, details }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails || !categories) return;

  return (
    <Button
      className={twMerge("h-8 justify-start !w-full px-2", className)}
      variant={"ghost"}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un producto / servicio"
            subheading="Ingresa los detalles del producto/servicio">
            <ProductForm
              details={details}
              agencyDetails={agencyDetails}
              userId={user.id}
              categories={categories}
            />
          </CustomModal>
        );
      }}>
      <Edit className="h-4 w-4 mr-2" />
      Editar
    </Button>
  );
};

export default EditProductButton;
