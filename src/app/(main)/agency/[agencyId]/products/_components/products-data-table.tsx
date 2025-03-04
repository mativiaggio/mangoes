"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Trash, Download } from "lucide-react";
import { Agency, Category, Product, SubAccount, User } from "@prisma/client";
import { formatPriceToARS } from "@/lib/utils";
import Image from "next/image";
import DeleteProductButton from "./delete-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditProductButton from "./edit-product-btn";
import BulkDeleteProducts from "./bulk-delete-products";
import { ProductWithCategory } from "@/database/product/types";
import { useLanguage } from "@/lib/contexts/language-context";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
            })
        )
      | null;
  };
  agencyId: string;
  products: ProductWithCategory[];
  categories: Category[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

const ITEMS_PER_PAGE = 50;

export default function ProductsDataTable({
  user,
  agencyId,
  products,
  categories,
}: Props) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();

  const toggleSort = (key: keyof Product) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedProducts.size === paginatedProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(paginatedProducts.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const resetSelectedProducts = () => {
    setSelectedProducts(new Set());
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-end justify-between gap-2">
        <Input
          placeholder={t.filterByName + "..."}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:block">
            {selectedProducts.size} seleccionado
            {selectedProducts.size !== 1 && "s"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="h-8"
            disabled={selectedProducts.size == 0}>
            <Download className="" />
            Exportar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {}}
                className="h-8"
                disabled={selectedProducts.size == 0}>
                <Trash />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Eliminar{" "}
                  <span className="text-main-secondary">
                    {" "}
                    {selectedProducts.size} producto
                    {selectedProducts.size !== 1 && "s"}
                  </span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Estás seguro/a de querer eliminar{" "}
                  {selectedProducts.size !== 1
                    ? "los productoss"
                    : "el producto"}{" "}
                  seleccionado
                  {selectedProducts.size !== 1 && "s"}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <BulkDeleteProducts
                    agencyId={agencyId}
                    selectedProducts={Array.from(selectedProducts)}
                    onDeleteComplete={resetSelectedProducts}
                  />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProducts.size === paginatedProducts.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="!w-28"></TableHead>
              <TableHead className="w-/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  Nombre
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  Categoría
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-1/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("price")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  Precio
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-1/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("stock")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  Stock
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow
                key={product.id}
                className={`${
                  selectedProducts.has(product.id) ? "bg-muted" : ""
                } hover:bg-muted`}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.has(product.id)}
                    onCheckedChange={() => toggleSelect(product.id)}
                  />
                </TableCell>
                <TableCell>
                  {product.productImage && (
                    <Image
                      src={product.productImage}
                      alt="Product Image"
                      height={40}
                      width={40}
                      className="rounded-md !aspect-square object-contain"
                    />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.Category.name}</TableCell>
                <TableCell>
                  {formatPriceToARS(product.price.toString())}
                </TableCell>
                <TableCell>
                  {product.unlimitedStock ? "Ilimitado" : product.stock}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialog>
                        <EditProductButton
                          details={product}
                          user={user}
                          categories={categories}
                          className="w-[200px] self-end"
                        />
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}>
                            <div className="flex gap-2 items-center cursor-pointer text-main-secondary">
                              <Trash className="h-4 w-4 mr-2" />
                              Eliminar
                            </div>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Eliminar{" "}
                              <span className="text-main-secondary">
                                {" "}
                                {product.name}
                              </span>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Estás seguro/a de querer eliminar el producto{" "}
                              <span className="text-main-primary">
                                {" "}
                                {product.name}
                              </span>
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              <DeleteProductButton
                                agencyId={agencyId}
                                productId={product.id}
                                onDeleteComplete={resetSelectedProducts}
                              />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)} de{" "}
          {sortedProducts.length} productos
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
