"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbars/navbar";
import LoadingScreen from "@/components/screens/loading-screen";
// import { getCurrent } from "@/features/auth/actions";
import { useCurrent } from "@/features/auth/api/use-current";
import { useGetFilePreviewById } from "@/features/files/api/use-get-preview";
import { useGetUserDocument } from "@/features/users/api/use-find-user-document";
// import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading } = useCurrent() || {};
  const [user, setUser] = useState<typeof data | null>(null);

  const { data: userDocument } = useGetUserDocument(data?.$id || null);

  const { data: fileUrl } = useGetFilePreviewById(
    userDocument?.document?.imageId || ""
  );

  useEffect(() => {
    setUser(data);
  }, [data]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Navbar user={user || null} fileUrl={fileUrl} />
        <div>{children}</div>
        <Footer />
      </>
    );
  }
}
