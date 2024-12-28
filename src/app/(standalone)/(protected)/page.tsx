import { getCurrent } from "@/features/auth/actions";
// import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";
import Image from "next/image";
import Stores from "./_components/stores";

export default async function Home() {
  const user = await getCurrent();
  console.log(user);
  // if (!user) redirect("/login");

  return (
    <>
      <PageWrapper>
        <div className="hidden xl:block w-1/6 border-r"></div>
        <div className="w-full xl:w-3/6 pt-6">
          <div className="border w-full min-h-[100px] h-fit rounded-xl bg-main-orange flex flex-col xl:flex-row justify-between items-center xl:items-start p-10">
            <span className="flex flex-col gap-2 text-primary-foreground">
              <h1 className="text-4xl font-bold text-center xl:text-left">
                Bienvenido a Mangoes
              </h1>
              <p className="text-center xl:text-left">
                Tu lugar de shopping online
              </p>
            </span>
            <Image
              src={"/static/svg/shopping-banner.svg"}
              height={250}
              width={250}
              alt="Shopping Banner"
            />
          </div>
          <Stores />
        </div>
        <div className="hidden xl:block w-1/6 border-l"></div>
      </PageWrapper>
    </>
  );
}
