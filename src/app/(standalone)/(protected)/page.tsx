import { Welcome } from "@/components/welcome";
import { getCurrent } from "@/features/auth/actions";
// import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";

export default async function Home() {
  const user = await getCurrent();

  // if (!user) redirect("/login");

  return (
    <>
      <PageWrapper>
        <Welcome user={user || null} />
      </PageWrapper>
    </>
  );
}
