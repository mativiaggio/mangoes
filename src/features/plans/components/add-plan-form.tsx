"use client";

import { useEffect, useState } from "react";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SelectItem } from "@/components/ui/select";
import { categorySchema } from "../schemas";
import { CategoriesApiResponse } from "@/lib/appwrite-types";
import { Loader2 } from "lucide-react";
import { useNewCategory } from "@/features/categories/api/use-new-category";
import { useGetParentCategories } from "@/features/categories/api/use-get-parents";

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AddCategoryForm() {
  const { mutate } = useNewCategory();
  const { data, isLoading } = useGetParentCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<CategoriesApiResponse>({
    categories: {
      total: 0,
      documents: [],
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parent_category_id: null,
      is_active: true,
      labels: "",
      banner_image: "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    setIsSubmitting(true);

    const formattedValues = {
      ...values,
      slug: values.slug.toLowerCase().replace(/ /g, "-"),
      labels: values.labels?.toLowerCase().replace(/ /g, ","),
    };

    console.log(formattedValues);
    mutate({ json: formattedValues });
    setIsSubmitting(false);
    router.push("/settings/admin");
  }

  if (isLoading) {
    <div className="w-full flex justify-center items-center h-full">
      <Loader2 className="text-main-orange animate-spin" />
    </div>;
  } else {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="name"
              label="Nombre"
              placeholder="Nombre de la categoría"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="slug"
              label="Slug"
              placeholder="slug-de-la-categoria"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="description"
              label="Descripción"
              placeholder="Descripción de la categoría"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="parent_category_id"
              label="Categoría Padre"
              control={form.control}
              defaultValue={null}>
              {categories.categories.documents.map((category) => (
                <SelectItem key={category.$id} value={category.$id}>
                  {category.name}
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="banner_image"
              label="Imagen del Banner"
              placeholder="URL de la imagen"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              name="is_active"
              label="¿Está activa?"
              control={form.control}
              defaultValue={true}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="labels"
              label="Etiquetas"
              placeholder="Agrega etiquetas separadas por comas"
              control={form.control}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              variant={"outline"}
              onClick={() => router.push("/categorias")}>
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    );
  }
}
