import { getCurrent } from "@/features/auth/actions";
import CreateStoreAccountCard from "@/features/auth/components/create-store-account-card";
import { redirect } from "next/navigation";

// Forzar renderizado dinámico
export const dynamic = "force-dynamic";

export default async function SignUp({
  searchParams,
}: {
  searchParams: { secret?: string };
}) {
  const user = await getCurrent();
  if (user) redirect("/");

  const secret = searchParams.secret || "";

  return (
    <div>
      <CreateStoreAccountCard secret={secret} />
    </div>
  );
}
