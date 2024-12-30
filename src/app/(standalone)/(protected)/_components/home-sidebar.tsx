"use client";
import { Input } from "@/components/ui/input";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React, { useState } from "react";
import Link from "next/link";

function HomeSideBar() {
  const { data, isLoading } = useGetCategories();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="hidden xl:block w-1/6 border-r pr-4 sm:pr-6 md:pr-8 lg:pr-10 pt-6">
        Cargando...
      </div>
    );
  }

  const categories = data?.categories?.documents || [];

  const parentCategories = categories.filter(
    (category) => category.parent_category_id === null
  );
  const childCategories = categories.filter(
    (category) => category.parent_category_id !== null
  );

  const filteredCategories = parentCategories.filter((category) =>
    category.labels?.some((label) =>
      label.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="hidden xl:block w-1/6 border-r pr-4 sm:pr-6 md:pr-8 lg:pr-10 pt-6">
      <Input
        placeholder="Busca una categoría"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-xs py-2 !max-h-fit placeholder:text-xs"
      />
      <Accordion type="multiple">
        {filteredCategories.map((parent) => (
          <AccordionItem key={parent.$id} value={parent.$id}>
            <AccordionTrigger className="text-left text-xs">
              {parent.name}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {childCategories
                  .filter((child) => child.parent_category_id === parent.$id)
                  .map((child) => (
                    <Link
                      href={`/category/${child.slug}`}
                      key={child.$id}
                      className="text-xs text-gray-700 hover:text-main-orange cursor-pointer">
                      {child.name}
                    </Link>
                  ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default HomeSideBar;
