"use client";
import { useFindCategoryBySlug } from "@/features/categories/api/use-find-by-slug";
import { Loader2, ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Banner from "../../_components/banner";

function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const { data, isLoading } = useFindCategoryBySlug(params.slug);

  if (isLoading) {
    return <Loader2 className="text-main-orange" />;
  } else {
    return (
      <>
        <Banner
          title={data?.name || ""}
          subtitle={data?.description}
          subtitleClassName="text-xs"
          image={`/static/svg/${data?.banner_image}`}
        />
        <div className="py-4 sm:py-6 md:py-8 lg:py-10 flex flex-col gap-6">
          <h1 className="text-xl font-bold flex gap-2 items-center">
            Tiendas <ShoppingBag />
          </h1>
        </div>
      </>
    );
  }
}

export default CategoryPage;
