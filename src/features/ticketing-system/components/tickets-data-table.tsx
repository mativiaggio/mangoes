"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Tickets, TicketsApiResponse } from "@/lib/appwrite-types";
import { ChevronDownIcon, Copy, FileX2, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/use-window-size";

export const columns: ColumnDef<Tickets>[] = [
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
    accessorKey: "$id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("$id")}</div>
    ),
  },
  {
    accessorKey: "authorName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Autor
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("authorName")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Título
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Estado
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <StatusBadge status={row.getValue("status")} />
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Pasar a inactivo</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(ticket.$id)}>
              <span className="flex items-center gap-1">
                ID
                <Copy size={12} />
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver más</DropdownMenuItem>
            {/* Agrega más acciones según sea necesario */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const statusMapping: { [key: string]: string | null } = {
  Abierto: "open",
  "En progreso": "in-progress",
  Resuelto: "solved",
  Cerrado: "closed",
  "En revisión": "under-review",
};

const statusMappingInverse: { [key: string]: string | null } = {
  open: "Abierto",
  "in-progress": "En progreso",
  solved: "Resuelto",
  closed: "Cerrado",
  "under-review": "En revisión",
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "",
        status === "open" &&
          "bg-active border-active dark:bg-active-dark dark:border-active-dark text-active-text-light dark:text-active-text-dark",
        status === "in-progress" &&
          "bg-pending border-pending dark:bg-pending-dark dark:border-pending-dark text-pending-text-light dark:text-pending-text-dark",
        status === "solved" &&
          "bg-solved border-solved dark:bg-solved-dark dark:border-solved-dark text-solved-text-light dark:text-solved-text-dark",
        status === "closed" &&
          "bg-inactive border-inactive dark:bg-inactive-dark dark:border-inactive-dark text-inactive-text-light dark:text-inactive-text-dark",
        status === "under-review" &&
          "bg-under-review border-under-review dark:bg-under-review-dark dark:border-under-review-dark text-under-review-text-light dark:text-under-review-text-dark"
      )}>
      {statusMappingInverse[status]}
    </Badge>
  );
};

interface TicketsDataTableProps {
  ticketsData?: TicketsApiResponse;
}

export function TicketsDataTable({ ticketsData }: TicketsDataTableProps) {
  // Declaraciones de estado
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Todos");
  const tickets = ticketsData;
  const router = useRouter();

  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  // Uso de useMemo para memoizar los datos
  const data = React.useMemo(() => {
    return (
      tickets?.tickets.documents.map((ticket) => ({
        ...ticket,
        authorName: ticket.users?.name || "Desconocido", // Aplana el campo users.name a authorName
      })) ?? []
    );
  }, [tickets]);

  // Inicializar la tabla
  const table = useReactTable<Tickets>({
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

  React.useEffect(() => {
    const currentFilters = table.getColumn("status")?.getFilterValue() as
      | string[]
      | undefined;

    if (!currentFilters || currentFilters.length === 0) {
      setSelectedFilter("Todos");
    } else {
      const mapped = currentFilters
        .map((s) => statusMappingInverse[s] || s)
        .join(", ");
      setSelectedFilter(mapped);
    }
  }, [columnFilters, table]);

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
                  placeholder="Filtrar por autor..."
                  value={
                    (table
                      .getColumn("authorName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("authorName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Input
                  placeholder="Filtrar por título..."
                  value={
                    (table.getColumn("title")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-1/2 gap-2 hidden lg:flex items-center">
          <Input
            placeholder="Filtrar por autor..."
            value={
              (table.getColumn("authorName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("authorName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtrar por título..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedFilter} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[
                "Abierto",
                "En progreso",
                "Resuelto",
                "Cerrado",
                "En revisión",
              ].map((status) => {
                const status2 = statusMapping[status];

                const currentFilters = table
                  .getColumn("status")
                  ?.getFilterValue() as string[] | undefined;

                if (status === "Todos") {
                  const isChecked =
                    !currentFilters || currentFilters.length === 0;
                  return (
                    <DropdownMenuCheckboxItem
                      key={status}
                      className="capitalize"
                      checked={isChecked}
                      onCheckedChange={(value) => {
                        if (value) {
                          table.getColumn("status")?.setFilterValue(undefined);
                        }
                      }}>
                      {status}
                    </DropdownMenuCheckboxItem>
                  );
                }

                const isChecked = currentFilters
                  ? currentFilters.includes(status2!)
                  : false;

                return (
                  <DropdownMenuCheckboxItem
                    key={status2}
                    className="capitalize"
                    checked={isChecked}
                    onCheckedChange={(value) => {
                      let newFilters: string[] = [];

                      if (value) {
                        if (!newFilters.includes(status2!)) {
                          newFilters.push(status2!);
                        }
                      } else {
                        newFilters = newFilters.filter((s) => s !== status2);
                      }

                      if (newFilters.length > 0) {
                        table.getColumn("status")?.setFilterValue(newFilters);
                      } else {
                        table.getColumn("status")?.setFilterValue(undefined);
                      }
                    }}>
                    {status}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="soporte/nuevo">
            <Button>
              <Plus className={isDesktop ? "mr-2 h-4 w-4" : "h-4 w-4"} />
              {isDesktop && "Nuevo Ticket"}
            </Button>
          </Link>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onDoubleClick={() =>
                    router.push(`/soporte/ticket/${row.original.$id}`)
                  }
                  data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-0">
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
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : tickets && tickets.tickets ? (
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
