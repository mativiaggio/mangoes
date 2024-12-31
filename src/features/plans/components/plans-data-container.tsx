"use client";
import { useGetPlans } from "../api/use-get-plans";
import { PlansDataTable } from "./plans-data-table";

export default function PlansDataContainer() {
  const { data } = useGetPlans();

  return <PlansDataTable plansData={data} />;
}
