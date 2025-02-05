"use client";
import CustomModal from "@/components/custom-modal";
import ProductForm from "@/components/forms/product-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Agency, Category, SubAccount, User } from "@prisma/client";
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
  className: string;
  categories: Category[];
};

const CreateProductButton = ({ className, user, categories }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails || !categories) return;

  return (
    <Button
      variant={"default"}
      className={twMerge("w-full flex gap-4 mb-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un producto / servicio"
            subheading="Ingresa los detalles del producto/servicio">
            {categories && categories.length === 0 ? (
              <Card className="w-full bg-red-100 border-l-4 border-red-500 text-red-500">
                <CardHeader>
                  <CardTitle className="font-bold text-lg">Ups!</CardTitle>
                  <CardDescription className="text-red-400">
                    Te estas adelantando.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Es necesario cargar categorías antes de cargar un producto.
                </CardContent>
              </Card>
            ) : (
              <ProductForm
                agencyDetails={agencyDetails}
                user={user}
                categories={categories}
              />
            )}
          </CustomModal>
        );
      }}>
      <ArchiveRestore size={15} color="white" />
      <span className="text-white">Carga un producto</span>
    </Button>
  );
};

export default CreateProductButton;
