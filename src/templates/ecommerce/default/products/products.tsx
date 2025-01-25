"use client";
import { CompleteWebsiteInfo } from "@/lib/types";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import Products from "../_components/products";
type Props = {
  website: CompleteWebsiteInfo;
};
export default function DefaultProductsPage({ website }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar website={website} />
      <main className="flex-grow container mx-auto px-3 h-screen py-6">
        <Products
          agency={website.Agency}
          products={website.Agency.Products.filter(
            (product) => product.isActive
          )}
          categories={website.Agency.Categories.filter(
            (category) => category.isActive
          )}
        />
      </main>
      <Footer website={website} />
    </div>
  );
}
