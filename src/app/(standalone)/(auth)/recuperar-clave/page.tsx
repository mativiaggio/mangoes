import { getCurrent } from "@/features/auth/actions";
import PasswordRecoveryForm from "@/features/auth/components/password-recovery";
import { redirect } from "next/navigation";

// Forzar renderizado dinámico
export const dynamic = "force-dynamic";

export default async function SignIn() {
  const user = await getCurrent();

  if (user) redirect("/");

  return (
    <div>
      <PasswordRecoveryForm />
    </div>
  );
}
