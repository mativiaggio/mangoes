"use client";
import { CartProvider } from "@/lib/contexts/cart-context";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Layout;
