"use client";
import { Button } from "@/components/ui/button";
import { CartProvider } from "@/lib/contexts/cart-context";
import { CompleteWebsiteInfo } from "@/lib/types";
import { Footer } from "@/templates/ecommerce/default/_components/footer";
import { Navbar } from "@/templates/ecommerce/default/_components/navbar";
import Products from "@/templates/ecommerce/default/_components/products";
import { ArrowRight, Stars } from "lucide-react";
import Link from "next/link";
import React from "react";

type Params = {
  website: CompleteWebsiteInfo;
};

const Mock = ({ website }: Params) => {
  return (
    <CartProvider>
      <div className="flex flex-col">
        <Navbar website={website} />
        <main className={"w-full flex flex-col items-center py-12"}>
          <div className="container flex flex-col items-center px-3">
            <section className="py-20 text-center bg-card w-full rounded-xl border">
              <h2 className="text-4xl font-bold mb-4">
                Bienvenido a {website.name}
              </h2>
              <p className="text-xl mb-8">{website.description}</p>
              <Link href={"/products"}>
                <Button size="lg" className="font-semibold">
                  Comprar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>
          </div>

          <div className="container flex flex-col items-center px-3 w-full">
            <div className="w-full flex gap-2 items-center py-6">
              <h1 className="text-xl font-bold">Productos destacados</h1>
              <Stars size={18} />
            </div>
            <Products
              agency={website.Agency}
              products={website.Agency.Products.filter(
                (product) => product.isActive && product.featured
              )}
              categories={website.Agency.Categories}
            />
          </div>
        </main>
        <Footer website={website} />
      </div>
    </CartProvider>
  );
};

export default Mock;
