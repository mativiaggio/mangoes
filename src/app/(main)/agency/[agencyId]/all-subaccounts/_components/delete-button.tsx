"use client";
import { saveActivityLogsNotification } from "@/database/notification/queries";
import {
  deleteSubAccount,
  getSubaccountDetails,
} from "@/database/subaccount/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  subAccountId: string;
};

const DeleteButton = ({ subAccountId }: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getSubaccountDetails(subAccountId);
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Eliminó una subcuenta | ${response?.name}`,
          subAccountId,
        });
        await deleteSubAccount(subAccountId);
        router.refresh();
      }}>
      Eliminar subcuenta
    </div>
  );
};

export default DeleteButton;
