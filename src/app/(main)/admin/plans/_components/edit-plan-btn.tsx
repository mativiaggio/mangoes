"use client";
import CustomModal from "@/components/custom-modal";
// import AdminPlanForm from "@/components/forms/admin-plan-form";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/contexts/language-context";
import { useModal } from "@/lib/providers/modal-provider";
import { Plan, Subscription } from "@prisma/client";
import { Edit } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  plan: Plan & { Subscription?: Subscription | null };
  className: string;
};

const EditPlanButton = ({ plan, className }: Props) => {
  const { setOpen } = useModal();
  const { t } = useLanguage();

  return (
    <Button
      className={twMerge("h-8 justify-start !w-full px-2", className)}
      variant={"ghost"}
      onClick={() => {
        setOpen(
          <CustomModal
            title={`Editar ${plan.name}`}
            subheading="Edita los detalles de este plan.">
            {/* <AdminPlanForm plan={plan} /> */}
            <p></p>
          </CustomModal>
        );
      }}>
      <Edit className="h-4 w-4 mr-2" />
      {t.edit}
    </Button>
  );
};

export default EditPlanButton;
