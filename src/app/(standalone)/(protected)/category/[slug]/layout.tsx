import PageWrapper from "@/components/page-wrapper";
import HomeSideBar from "../../_components/home-sidebar";

export default async function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageWrapper>
        <HomeSideBar />
        <div className="w-full xl:w-3/6 pt-6 h-fit pb-0 xl:h-[calc(100vh-66px)] overflow-auto xl:pb-[100px]">
          {children}
        </div>
        <div className="hidden xl:block w-1/6 border-l"></div>
      </PageWrapper>
    </>
  );
}
