import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Navbar } from "./_components/navbar";
import { currentUser } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <div className="min-h-screen bg-background w-full">
        <Navbar id={user?.id || null} />
        {children}
      </div>
    </ClerkProvider>
  );
};

export default Layout;
