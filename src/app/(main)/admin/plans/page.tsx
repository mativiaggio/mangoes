import React from "react";
import { db } from "@/database/db";
import { getAuthUserDetails } from "@/database/auth/queries";
import PlansDataTable from "./_components/plan-data-table";
import CreatePlanButton from "./_components/create-plan-btn";
import { AlertDialog } from "@/components/ui/alert-dialog";

const PlansPage = async () => {
  const plans = await db.plan.findMany();
  const user = await getAuthUserDetails();

  if (!plans || !user) return null;

  return (
    <AlertDialog>
      <div className="flex flex-col ">
        <CreatePlanButton user={user} className="w-[200px] self-end" />
        <PlansDataTable user={user} plans={plans} />
      </div>
    </AlertDialog>
  );
};

export default PlansPage;
