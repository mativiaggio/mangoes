"use client";
import PageWrapper from "@/components/page-wrapper";
import LoadingScreen from "@/components/screens/loading-screen";
import { useCurrent } from "@/features/auth/api/use-current";
// import { getCurrent } from "@/features/auth/actions";
import AuthNavbar from "@/features/auth/components/auth-navbar";

interface AuthLayuotProps {
  children: React.ReactNode;
}

const AuthLayuot = ({ children }: AuthLayuotProps) => {
  const { data, isLoading } = useCurrent();

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    if (data) {
      window.location.replace("/");
    } else {
      return (
        <main className="bg-neutral-100 dark:bg-main min-h-screen">
          <AuthNavbar />
          <PageWrapper>
            <div className="mx-auto max-w-screen-2xl">
              <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                {children}
              </div>
            </div>
          </PageWrapper>
        </main>
      );
    }
  }
};

export default AuthLayuot;
