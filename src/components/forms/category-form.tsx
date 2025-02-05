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

import { Agency, Category } from "@prisma/client";
import { useModal } from "@/lib/providers/modal-provider";
import { useToast } from "@/hooks/use-toast";
import { Submit } from "../buttons/submit";
import { upsertCategory } from "@/database/category/queries";
import { saveActivityLogsNotification } from "@/database/notification/queries";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres."),
  isActive: z.boolean().optional(),
});

interface CategoryFormProps {
  agencyDetails: Agency;
  details?: Partial<Category>;
  userId: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  details,
  agencyDetails,
  userId,
}) => {
  const { setClose } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      isActive: details?.isActive || true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await upsertCategory({
        id: details?.id || v4(),
        name: values.name,
        isActive: values.isActive || false,
        createdAt: details?.createdAt || new Date(),
        updatedAt: new Date(),
        agencyId: agencyDetails.id,
        userId: userId,
      });
      if (!response) throw new Error("No response from server");

      if (details?.id) {
        await saveActivityLogsNotification({
          agencyId: response.agencyId,
          description: `Categoría actualizada | ${response.name}`,
        });
      } else {
        await saveActivityLogsNotification({
          agencyId: response.agencyId,
          description: `Categoría cargada | ${response.name}`,
        });
      }

      toast({
        title: "Éxito",
        description: "Datos cargados con éxito.",
        variant: "success",
      });

      setClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un error al guardar los datos, vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico.",
        variant: "destructive",
      });
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="w-full border-none !p-0">
      <CardHeader>
        <CardTitle className="sr-only">Información de la categoría</CardTitle>
        <CardDescription className="sr-only">
          Ingresa los detalles de la categoría
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Nombre de la categoría"
                      {...field}
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

export default CategoryForm;
