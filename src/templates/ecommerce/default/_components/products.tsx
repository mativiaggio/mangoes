"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Agency, Category } from "@prisma/client";
import { ProductWithCategory } from "@/database/product/types";
import { formatPriceToARS } from "@/lib/utils";
import { useCart } from "@/lib/contexts/cart-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface ProductsProps {
  agency: Agency;
  products: ProductWithCategory[];
  categories: Category[];
}

export default function Products({
  agency,
  products,
  categories,
}: ProductsProps) {
  const { loadCart } = useCart();
  const allCategories = "Todas";
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    allCategories,
  ]);
  const productsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, selectedCategories]);

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.includes(allCategories) ||
          selectedCategories.includes(product.Category.name))
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category: string) => {
    if (category === allCategories) {
      setSelectedCategories([allCategories]);
    } else {
      setSelectedCategories((prev) => {
        const withoutAll = prev.filter((c) => c !== allCategories);
        if (withoutAll.includes(category)) {
          return withoutAll.length === 1
            ? [allCategories]
            : withoutAll.filter((c) => c !== category);
        } else {
          return [...withoutAll, category];
        }
      });
    }
  };

  const handleAddProductToCart = (product: ProductWithCategory) => {
    const cartKey = "cart";
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "{}");
    const agencyId = agency.id;

    if (!currentCart[agencyId]) {
      currentCart[agencyId] = [];
    }

    const existingProductIndex = currentCart[agencyId].findIndex(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      currentCart[agencyId][existingProductIndex].quantity += 1;
      currentCart[agencyId][existingProductIndex].totalPrice =
        currentCart[agencyId][existingProductIndex].quantity * product.price;
    } else {
      currentCart[agencyId].push({
        ...product,
        quantity: 1,
        totalPrice: product.price,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(currentCart));

    // Actualizar el contexto con los nuevos datos del carrito
    loadCart(agencyId);
    toast({
      title: "Éxito",
      description: "Se ha agregado el producto al carrito.",
      variant: "success",
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Categorías <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filtrar por categoría</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                key={allCategories}
                checked={selectedCategories.includes(allCategories)}
                onCheckedChange={() => handleCategoryChange(allCategories)}>
                {allCategories}
              </DropdownMenuCheckboxItem>
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryChange(category.name)}>
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Precio más bajo</SelectItem>
              <SelectItem value="desc">Precio más alto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center sm:justify-items-start">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden h-fit w-[300px] sm:w-full rounded-xl">
            <CardHeader className="h-full p-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl">
                <Image
                  src={product.productImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover product-images"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">{product.name}</h4>
              <p className="text-lg font-bold">
                {formatPriceToARS(product.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.Category.name}
              </p>
              <Button
                className="w-full mt-4"
                onClick={() => handleAddProductToCart(product)}>
                Agregar al carrito <ShoppingBag />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages >= 1 && (
        <div className="flex items-center justify-center mt-8 gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <ScrollArea>
            <div className="flex w-max space-x-4 p-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                  </Button>
                )
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
