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
import { Textarea } from "@/components/ui/textarea";
import { Submit } from "../buttons/submit";
import { useModal } from "@/lib/providers/modal-provider";
import { useToast } from "@/hooks/use-toast";
import { Plan } from "@prisma/client";
import { upsertPlan } from "@/database/plan/queries";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del plan debe tener al menos 2 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres."),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "El precio debe ser un número válido."),
  features: z.string(), // Aceptamos el campo como string inicialmente
});

interface PlanFormProps {
  details?: Partial<Plan>;
  userId: string;
}

const PlanForm: React.FC<PlanFormProps> = ({ details }) => {
  const { setClose } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      description: details?.description || "",
      price: details?.price || "",
      features: details?.features?.join(", ") || "", // Convertimos el array a string separada por comas
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const featuresArray = values.features
        .split(",")
        .map((feature) => feature.trim()) // Convertimos la string en un array
        .filter((feature) => feature.length > 0); // Eliminamos valores vacíos

      const response = await upsertPlan({
        id: details?.id || v4(),
        name: values.name,
        description: values.description,
        price: values.price,
        features: featuresArray,
        createdAt: details?.createdAt || new Date(),
        updatedAt: new Date(),
      });
      if (!response) throw new Error("No response from server");

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
        <CardTitle className="sr-only">Información del plan</CardTitle>
        <CardDescription className="sr-only">
          Ingresa los detalles del plan
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
                    <Input required placeholder="Nombre del plan" {...field} />
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
                      placeholder="Descripción del plan"
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
                      required
                      placeholder="Precio del plan"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Características</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Ingrese características separadas por comas"
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

export default PlanForm;
