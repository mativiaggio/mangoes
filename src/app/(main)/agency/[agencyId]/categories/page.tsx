import {
  deleteCategory,
  getAuthUserDetails,
  getAgencyCategories,
} from "@/lib/queries";
import React from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import CreateCategoryButton from "./_components/create-category-btn";
import { Category } from "@prisma/client";
import CategoriesDataTable from "./_components/category-data-table";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const CategoriesPage = async ({ params }: Props) => {
  const agencyId = (await params).agencyId;
  const categories = await getAgencyCategories(agencyId);
  const data = JSON.parse(JSON.stringify(categories));
  const user = await getAuthUserDetails();

  if (!user || !categories) return;

  const handleDelete = async (category: Category) => {
    "use server";
    try {
      await deleteCategory(category.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertDialog>
        <div className="flex flex-col ">
          <CreateCategoryButton user={user} className="w-[200px] self-end" />
          <CategoriesDataTable
            agencyId={agencyId}
            user={user}
            categories={data || []}
            onDelete={handleDelete}
          />
        </div>
      </AlertDialog>
    </>
  );
};

export default CategoriesPage;
