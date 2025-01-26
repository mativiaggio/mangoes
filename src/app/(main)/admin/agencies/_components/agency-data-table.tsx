/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Agency, User } from "@prisma/client";
import DeleteAgencyButton from "./delete-button";
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
import EditAgencyButton from "./edit-agency-btn";
import BulkDeleteAgencies from "./bulk-delete-agencies";

type Props = {
  user: User;
  agencies: Agency[];
  onDelete?: (agency: Agency) => void;
};

const ITEMS_PER_PAGE = 50;

export default function AgenciesDataTable({ user, agencies }: Props) {
  const [selectedAgencies, setselectedAgencies] = useState<Set<string>>(
    new Set()
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Agency;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSort = (key: keyof Agency) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    const aValue = a[sortConfig.key] ?? ""; // Replace "" with a sensible fallback
    const bValue = b[sortConfig.key] ?? ""; // Replace "" with a sensible fallback

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  const paginatedAgencies = sortedAgencies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedAgencies.length / ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedAgencies.size === paginatedAgencies.length) {
      setselectedAgencies(new Set());
    } else {
      setselectedAgencies(new Set(paginatedAgencies.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedAgencies);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setselectedAgencies(newSelected);
  };

  const resetselectedAgencies = () => {
    setselectedAgencies(new Set());
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-end justify-between gap-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:block">
            {selectedAgencies.size} seleccionado
            {selectedAgencies.size !== 1 && "s"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="h-8"
            disabled={selectedAgencies.size == 0}>
            <Download className="" />
            Exportar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {}}
                className="h-8"
                disabled={selectedAgencies.size == 0}>
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
                    {selectedAgencies.size} agencia
                    {selectedAgencies.size !== 1 && "s"}
                  </span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Estás seguro/a de querer eliminar{" "}
                  {selectedAgencies.size !== 1 ? "las agencias" : "la agencia"}{" "}
                  seleccionada
                  {selectedAgencies.size !== 1 && "s"}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <BulkDeleteAgencies
                    selectedAgencies={Array.from(selectedAgencies)}
                    onDeleteComplete={resetselectedAgencies}
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
                  checked={selectedAgencies.size === paginatedAgencies.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  Nombre
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAgencies.map((agency) => (
              <TableRow
                key={agency.id}
                className={`${
                  selectedAgencies.has(agency.id) ? "bg-muted" : ""
                } hover:bg-muted`}>
                <TableCell>
                  <Checkbox
                    checked={selectedAgencies.has(agency.id)}
                    onCheckedChange={() => toggleSelect(agency.id)}
                  />
                </TableCell>
                <TableCell>{agency.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialog>
                        {/* <EditAgencyButton
                          details={agency}
                          user={user}
                          className="w-[200px] self-end"
                        /> */}
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
                                {agency.name}
                              </span>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Estás seguro/a de querer eliminar la agencia{" "}
                              <span className="text-main-primary">
                                {" "}
                                {agency.name}
                              </span>
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              <DeleteAgencyButton
                                agencyId={agency.id}
                                onDeleteComplete={resetselectedAgencies}
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
          {Math.min(currentPage * ITEMS_PER_PAGE, sortedAgencies.length)} de{" "}
          {sortedAgencies.length} agencias
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
