"use client";
import { redirect } from "next/navigation";

const SettingsPage = () => {
  redirect("/configuracion/datos-personales");
};

export default SettingsPage;
