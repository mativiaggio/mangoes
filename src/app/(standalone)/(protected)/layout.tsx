import Footer from "@/components/footer";
import Navbar from "@/components/navbars/navbar";
import { getCurrent } from "@/features/auth/actions";
// import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrent();
  // if (!user) {
  //   redirect("/login");
  // }
  return (
    <>
      <Navbar user={user} />
      <div>{children}</div>
      <Footer />
    </>
  );
}
