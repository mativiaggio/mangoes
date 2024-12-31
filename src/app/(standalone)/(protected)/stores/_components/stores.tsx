import React from "react";
import LoadingStores from "./loading-stores";
import { Croissant, ShoppingBag, Star } from "lucide-react";

export default function Stores() {
  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 flex flex-col gap-6">
      <span>
        <h1 className="text-xl font-bold flex gap-2 items-center">
          Más buscadas
          <Star />
        </h1>
        <LoadingStores />
      </span>
      <span>
        <h1 className="text-xl font-bold flex gap-2 items-center">
          Moda y Estética <ShoppingBag />
        </h1>
        <LoadingStores />
      </span>
      <span>
        <h1 className="text-xl font-bold flex gap-2 items-center">
          Patio de comidas
          <Croissant />
        </h1>
        <LoadingStores />
      </span>
    </div>
  );
}
