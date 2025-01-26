"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 } from "uuid";
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

import { Agency, Category, Product, SubAccount, User } from "@prisma/client";
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
import { CircleHelp } from "lucide-react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Submit } from "../buttons/submit";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres."),
  description: z.string().min(1, "La descripción es obligatoria."),
  price: z.coerce.number(),
  categoryId: z.string().min(1, "La categoría es obligatoria."),
  stock: z.coerce.number(),
  unlimitedStock: z.boolean().default(false),
  productImage: z.string().optional(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
});

interface ProductFormProps {
  agencyDetails: Agency;
  categories: Category[];
  details?: Partial<Product>;
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
}

const ProductForm: React.FC<ProductFormProps> = ({
  details,
  agencyDetails,
  categories,
  user,
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
      unlimitedStock: details?.unlimitedStock,
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
        unlimitedStock: values.unlimitedStock,
        productImage: values.productImage || "",
        isActive: values.isActive,
        featured: values.featured,
        agencyId: agencyDetails.id,
        userId: user.id,
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
                          <TooltipContent className="bg-main-primary w-80">
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
              name="unlimitedStock"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <span className="text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <FormLabel className="flex gap-1 items-center w-fit">
                            Es servicio <CircleHelp size={12} />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="bg-main-primary w-80">
                          <span className="text-white text-sm w-full">
                            Es recomendable marcar un producto como stock
                            ilimitado solo en caso de que realmente lo sea.
                            Ejemplo: un plato de comida.
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value); // Actualiza el valor del formulario para "unlimitedStock"
                        if (value) {
                          form.setValue("stock", 0); // Si es ilimitado, establece el stock en 0
                        }
                      }}
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
                <FormItem
                  className={cn(
                    form.watch("unlimitedStock") &&
                      "text-muted-foreground cursor-not-allowed"
                  )}>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      placeholder="Cantidad en stock"
                      disabled={form.watch("unlimitedStock")}
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
                          <FormLabel className="flex gap-1 items-center w-fit">
                            Activo <CircleHelp size={12} />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="bg-main-primary w-80">
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
                      defaultChecked={true}
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
                          <FormLabel className="flex gap-1 items-center w-fit">
                            Destacado <CircleHelp size={12} />
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="bg-main-primary w-80">
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

            <Submit
              type="submit"
              isLoading={isLoading}
              className="overflow-hidden"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
