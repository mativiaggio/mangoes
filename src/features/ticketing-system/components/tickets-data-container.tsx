"use client";
import { useGetTickets } from "../api/use-get-tickets";
import { TicketsDataTable } from "./tickets-data-table";

export default function TicketsDataContainer() {
  const { data } = useGetTickets();
  return <TicketsDataTable ticketsData={data} />;
}
