"use client";
import CustomModal from "@/components/custom-modal";
import PlanForm from "@/components/forms/plan-form";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/contexts/language-context";
import { useModal } from "@/lib/providers/modal-provider";

import { User } from "@prisma/client";
import { ArchiveRestore } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User;
  className?: string;
};

const CreatePlanButton = ({ className, user }: Props) => {
  const { setOpen } = useModal();
  const { t } = useLanguage();

  return (
    <Button
      className={twMerge("w-full flex gap-4 mb-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un plan"
            subheading="Ingresa los detalles del plan">
            <PlanForm userId={user.id} />
          </CustomModal>
        );
      }}>
      <ArchiveRestore size={15} color="white" />
      <span className="text-white">{t.createPlan}</span>
    </Button>
  );
};

export default CreatePlanButton;
