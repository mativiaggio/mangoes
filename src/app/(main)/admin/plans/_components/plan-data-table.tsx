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
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash,
  Download,
  RefreshCcw,
} from "lucide-react";
import { Plan, User } from "@prisma/client";
import DeletePlanButton from "./delete-button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditPlanButton from "./edit-plan-btn";
import BulkDeletePlans from "./bulk-delete-plans";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/contexts/language-context";

type Props = {
  user: User;
  plans: Plan[];
  onDelete?: (plan: Plan) => void;
};

const ITEMS_PER_PAGE = 50;

export default function PlansDataTable({ plans }: Props) {
  const [selectedPlans, setselectedPlans] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Plan;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { t } = useLanguage();

  const toggleSort = (key: keyof Plan) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    const aValue = a[sortConfig.key] ?? ""; // Replace "" with a sensible fallback
    const bValue = b[sortConfig.key] ?? ""; // Replace "" with a sensible fallback

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  const paginatedPlans = sortedPlans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedPlans.length / ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedPlans.size === paginatedPlans.length) {
      setselectedPlans(new Set());
    } else {
      setselectedPlans(new Set(paginatedPlans.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedPlans);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setselectedPlans(newSelected);
  };

  const resetselectedPlans = () => {
    setselectedPlans(new Set());
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
            {selectedPlans.size} {t.selected}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="h-8"
            disabled={selectedPlans.size == 0}>
            <Download className="" />
            {t.export}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {}}
                className="h-8"
                disabled={selectedPlans.size == 0}>
                <Trash />
                {t.delete}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <span className="text-main-secondary">{t.deletePlans}</span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t.confirmDeletePlans}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                <AlertDialogAction>
                  <BulkDeletePlans
                    selectedPlans={Array.from(selectedPlans)}
                    onDeleteComplete={resetselectedPlans}
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
                  checked={selectedPlans.size === paginatedPlans.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  {t.name}
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-12 text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.refresh();
                        }}
                        className="h-8">
                        <RefreshCcw />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80">
                      <span className="text-white text-sm w-full">
                        {t.refreshTable}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPlans.map((plan) => (
              <TableRow
                key={plan.id}
                className={`${
                  selectedPlans.has(plan.id) ? "bg-muted" : ""
                } hover:bg-muted`}>
                <TableCell>
                  <Checkbox
                    checked={selectedPlans.has(plan.id)}
                    onCheckedChange={() => toggleSelect(plan.id)}
                  />
                </TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialog>
                        <EditPlanButton
                          plan={plan}
                          className="w-[200px] self-end"
                        />
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}>
                            <div className="flex gap-2 items-center cursor-pointer text-main-secondary">
                              <Trash className="h-4 w-4 mr-2" />
                              {t.delete}
                            </div>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t.delete}
                              <span className="text-main-secondary">
                                {" "}
                                {plan.name}
                              </span>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.confirmDeletePlan}
                              <span className="text-main-primary">
                                {" "}
                                {plan.name}
                              </span>
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              <DeletePlanButton
                                planId={plan.id}
                                onDeleteComplete={resetselectedPlans}
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
          {t.showing} {(currentPage - 1) * ITEMS_PER_PAGE + 1} {t.to}{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, sortedPlans.length)} {t.of}{" "}
          {sortedPlans.length} {t.plans}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            {t.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}>
            {t.next}
          </Button>
        </div>
      </div>
    </div>
  );
}
