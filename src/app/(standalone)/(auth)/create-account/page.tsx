import { getCurrent } from "@/features/auth/actions";
import CreateAccountCard from "@/features/auth/components/create-account-card";
import { redirect } from "next/navigation";

// Forzar renderizado dinámico
export const dynamic = "force-dynamic";

export default async function SignUp() {
  const user = await getCurrent();
  if (user) redirect("/");

  return (
    <div>
      <CreateAccountCard />
    </div>
  );
}
