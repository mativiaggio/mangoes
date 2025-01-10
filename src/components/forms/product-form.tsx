"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Agency, Category, Product } from "@prisma/client";
import { saveActivityLogsNotification, upsertProduct } from "@/lib/queries";
import { useModal } from "@/lib/providers/modal-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import FileUpload from "../file-upload";
import { CircleHelp, Loader, Stars } from "lucide-react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres."),
  description: z.string().min(1, "La descripción es obligatoria."),
  price: z.coerce.number(),
  categoryId: z.string().min(1, "La categoría es obligatoria."),
  stock: z.coerce.number(),
  productImage: z.string().optional(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
});

interface ProductFormProps {
  agencyDetails: Agency;
  categories: Category[];
  details?: Partial<Product>;
  userId: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  details,
  agencyDetails,
  categories,
  userId,
}) => {
  const { setClose } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      description: details?.description || "",
      price: details?.price ? Number(details.price) : 0,
      categoryId: details?.categoryId || "",
      stock: details?.stock || 0,
      productImage: details?.productImage || "",
      isActive: details?.isActive,
      featured: details?.featured,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await upsertProduct({
        id: details?.id || v4(),
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.categoryId,
        stock: values.stock,
        productImage: values.productImage || "",
        isActive: values.isActive,
        featured: values.featured,
        agencyId: agencyDetails.id,
        userId,
        createdAt: details?.createdAt || new Date(),
        updatedAt: new Date(),
      });
      if (!response) throw new Error("No response from server");

      if (details?.id) {
        await saveActivityLogsNotification({
          agencyId: response.agencyId,
          description: `Producto actualizado | ${response.name}`,
        });
      } else {
        await saveActivityLogsNotification({
          agencyId: response.agencyId,
          description: `Producto cargado | ${response.name}`,
        });
      }


      setClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Información del Producto</CardTitle>
        <CardDescription>Ingresa los detalles del producto</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-sm">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex gap-1 items-center w-fit">
                              Imagen del Producto <CircleHelp size={12} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-main-primary">
                            <span className="text-white text-sm w-full">
                              Es de suma importancia que intentes subir imagenes
                              cuadradas
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="products"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Nombre del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Precio del producto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      placeholder="Cantidad en stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <span className="text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex gap-1 items-center w-fit">
                            Activo <CircleHelp size={12} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-main-primary">
                          <span className="text-white text-sm w-full">
                            Los productos marcados como inactivos no se
                            mostrarán en tu página.
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <span className="text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex gap-1 items-center w-fit">
                            Destacado <CircleHelp size={12} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-main-primary">
                          <span className="text-white text-sm w-full">
                            Los productos destacados se mostrarán en la página
                            principal.
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {isLoading ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                <span className="text-white flex items-center gap-1">
                  Guardar
                  <Stars />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
