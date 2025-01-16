import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { CompleteWebsiteInfo } from "@/lib/types";
import Products from "./_components/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stars } from "lucide-react";
import Link from "next/link";

type Props = {
  website: CompleteWebsiteInfo;
};

export default function HomeDefault({ website }: Props) {
  return (
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
  );
}
