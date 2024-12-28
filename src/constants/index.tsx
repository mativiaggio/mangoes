import { Lock, ShieldCheck, User } from "lucide-react";

export const AdminSettingLinks = [
  {
    label: "Admin",
    href: `/configuracion/admin`,
    icon: (
      <ShieldCheck className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

export const SettingLinks = [
  {
    label: "Datos personales",
    href: `/configuracion/datos-personales`,
    icon: (
      <User className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Seguridad",
    href: `/configuracion/seguridad`,
    icon: (
      <Lock className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];
