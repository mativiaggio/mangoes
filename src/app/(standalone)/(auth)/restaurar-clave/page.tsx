import { getCurrent } from "@/features/auth/actions";
import PasswordResetForm from "@/features/auth/components/password-reset";
import { redirect } from "next/navigation";

// Forzar renderizado dinámico
export const dynamic = "force-dynamic";

export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: { userId?: string; secret?: string };
}) {
  const user = await getCurrent();
  if (user) redirect("/");

  const userId = searchParams.userId || "";
  const secret = searchParams.secret || "";

  return (
    <div>
      <PasswordResetForm userId={userId} secret={secret} />
    </div>
  );
}
