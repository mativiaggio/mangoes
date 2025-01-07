"use client";
import CustomModal from "@/components/custom-modal";
import SubAccountForm from "@/components/forms/subaccount-form";

import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";

import { Agency, AgencySidebarOption, SubAccount, User } from "@prisma/client";
import { PlusCircleIcon } from "lucide-react";
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
  id: string;
  className: string;
};

const CreateSubaccountButton = ({ className, user }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge("w-full flex gap-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Crea una subcuenta"
            subheading="Ingresa los detalles de la subcuenta">
            <SubAccountForm
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        );
      }}>
      <PlusCircleIcon size={15} color="white" />
      <span className="text-white">Crea una subcuenta</span>
    </Button>
  );
};

export default CreateSubaccountButton;
