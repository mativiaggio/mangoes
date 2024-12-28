"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, UsersApiResponse } from "@/lib/appwrite-types";
import { Copy, FileX2, Filter } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";

export const columns: ColumnDef<Users>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("user_id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "labels",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Roles
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const labels = row.getValue("labels") as string[] | undefined;
      return (
        <div className="flex flex-wrap gap-2">
          {labels && labels.length > 0 ? (
            labels.map((label, index) => {
              let badgeClass = "";
              switch (label) {
                case "admin":
                  badgeClass =
                    "bg-inactive border-inactive dark:bg-inactive-dark dark:border-inactive-dark text-inactive-text-light dark:text-inactive-text-dark";
                  break;
                case "developer":
                  badgeClass =
                    "bg-active border-active dark:bg-active-dark dark:border-active-dark text-active-text-light dark:text-active-text-dark";
                  break;
                default:
                  badgeClass =
                    "bg-solved border-solved dark:bg-solved-dark dark:border-solved-dark text-solved-text-light dark:text-solved-text-dark";
              }
              return (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs font-medium rounded-md ${badgeClass}`}>
                  {capitalizeFirstLetter(label)}
                </span>
              );
            })
          ) : (
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-solved border-solved dark:bg-solved-dark dark:border-solved-dark text-solved-text-light dark:text-solved-text-dark">
              Usuario
            </span>
          )}
        </div>
      );
    },
  },
];

interface UsersDataTableProps {
  usersData?: UsersApiResponse;
}

export function UsersDataTable({ usersData }: UsersDataTableProps) {
  // Declaraciones de estado
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const users = usersData;

  // Uso de useMemo para memoizar los datos
  const data = React.useMemo(() => users?.users.documents ?? [], [users]);

  // Inicializar la tabla
  const table = useReactTable<Users>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <div className="flex lg:hidden">
          <Dialog modal={true}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:block">Filtros</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-md">
              <DialogHeader>
                <DialogTitle>Filtros</DialogTitle>
              </DialogHeader>
              <div className="w-full flex flex-col gap-2 items-center">
                <Input
                  placeholder="Filtrar por nombre..."
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-1/2 gap-2 hidden lg:flex items-center">
          <Input
            placeholder="Filtrar por nombre..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-main-blue dark:bg-transparent text-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="!text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="select-none">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-0">
                      <ContextMenu modal={false}>
                        <ContextMenuTrigger>
                          {cell.column.id === "age" ? (
                            <div className="flex gap-1">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}{" "}
                              años
                            </div>
                          ) : (
                            <div className="py-4 px-2">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          )}
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(row.original.$id)
                            }>
                            <span className="flex items-center gap-1">
                              ID
                              <Copy size={12} />
                            </span>
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem>
                            {row.original.labels?.includes("admin")
                              ? "Quitar rol admin"
                              : "Dar rol admin"}
                          </ContextMenuItem>
                          <ContextMenuItem>
                            {row.original.labels?.includes("admin")
                              ? "Quitar rol developer"
                              : "Dar rol developer"}
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users && users.users ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center hover:text-[#991b1b] dark:hover:text-[#f87171] py-4 px-2">
                  <div className="flex gap-2 items-center justify-center w-full">
                    <FileX2 />
                    No hay datos disponibles.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} className="py-4 px-2">
                    <Skeleton className="h-5" />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
