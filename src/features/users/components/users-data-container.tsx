"use client";
import { useGetUsers } from "../api/use-get-users";
import { UsersDataTable } from "./users-data-table";

export default function UsersDataContainer() {
  const { data } = useGetUsers();
  return <UsersDataTable usersData={data} />;
}
