"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbars/navbar";
// import { getCurrent } from "@/features/auth/actions";
import { useCurrent } from "@/features/auth/api/use-current";
// import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getCurrent();
  // if (!user) {
  //   redirect("/login");
  // }

  const { data } = useCurrent() || {};
  const [user, setUser] = useState<typeof data | null>(null);

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <>
      <Navbar user={user || null} />
      <div>{children}</div>
      <Footer />
    </>
  );
}
