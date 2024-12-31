import { getCurrent } from "@/features/auth/actions";
import api from "@/features/mercadopago/api/api";
import { getPlanById } from "@/features/plans/actions";
import { redirect } from "next/navigation";
import React from "react";
import { updateUserPlan } from "@/features/plans/actions";

export default async function CheckoutLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { planId: string };
}>) {
  const { planId } = params;
  const userFromServer = await getCurrent();
  const plan = await getPlanById(planId);

  if (!userFromServer) {
    redirect("/login");
  }

  // Función de suscripción
  const { url, suscription } = await api.user.suscribe(
    plan?.name as string,
    userFromServer?.email as string,
    plan?.price as number
  );

  const user = await getCurrent();
  if (user) {
    await updateUserPlan(user?.$id, suscription.id || "", false);
    redirect(url);
  }

  return <>{children}</>;
}
