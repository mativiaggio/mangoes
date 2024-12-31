// import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";
import Stores from "./_components/stores";
import HomeSideBar from "./_components/home-sidebar";
import Banner from "./_components/banner";

export default async function Home() {
  return (
    <>
      <PageWrapper>
        <HomeSideBar />
        <div className="w-full xl:w-3/6 pt-6 h-fit pb-0 xl:h-[calc(100vh-66px)] overflow-auto xl:pb-[100px]">
          <Banner
            title="Bienvenido a Mangoes"
            subtitle="Tu shopping online"
            image="/static/svg/shopping-banner.svg"
          />
          <Stores />
        </div>
        <div className="hidden xl:block w-1/6 border-l"></div>
      </PageWrapper>
    </>
  );
}
