"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPriceToARS } from "@/lib/utils";
import { Agency } from "@prisma/client";
import { useCart } from "@/lib/contexts/cart-context";
import Image from "next/image";

type Props = {
  agency: Agency;
};

export function CartSummary({ agency }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, totalQuantity, loadCart, updateQuantity, deleteProduct } =
    useCart();

  const handleUpdateQuantity = (id: string, change: number) => {
    updateQuantity(id, change, agency.id);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id, agency.id);
  };

  // Cargar el carrito de la agencia cuando se abre el Sheet
  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      loadCart(agency.id);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-main-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <div className="h-full">
        <SheetContent className="py-8 flex flex-col justify-between h-full">
          <div className="h-full">
            <SheetHeader>
              <SheetTitle>Tu carrito</SheetTitle>
            </SheetHeader>
            {cartItems.length === 0 ? (
              <ul className="h-full">
                <li className="flex flex-col items-center justify-center w-full h-full">
                  <Image
                    src={"/assets/svg/empty.svg"}
                    height={1000}
                    width={1000}
                    alt="Empty cart"
                  />
                  <p>Ups! Tu carrito está vacío.</p>
                </li>
              </ul>
            ) : (
              <ScrollArea className="flex-grow">
                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPriceToARS(item.price)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total: {formatPriceToARS(item.totalPrice)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                {formatPriceToARS(
                  cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
                )}
              </span>
            </div>
            {totalQuantity == 0 ? (
              <>
                <Button
                  variant={"outline"}
                  className="w-full mb-2 cursor-not-allowed select-none hover:bg-transparent"
                  asChild>
                  <span className="cursor-default">Ir al checkout</span>
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full cursor-not-allowed select-none hover:bg-transparent"
                  asChild>
                  <span className="cursor-default">Ver carrito completo</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full mb-2"
                  asChild
                  onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Ir al checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full select-none"
                  asChild
                  onClick={() => setIsOpen(false)}>
                  <Link href="/cart">Ver carrito completo</Link>
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </div>
    </Sheet>
  );
}
