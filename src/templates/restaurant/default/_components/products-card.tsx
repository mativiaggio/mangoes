import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/products/${id}`}>
          <div className="aspect-square relative">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 p-4">
        <Link href={`/products/${id}`} className="font-semibold">
          {name}
        </Link>
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <Button size="sm">Agregar al carrito</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
