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

import { Agency, Website } from "@prisma/client";
import { saveActivityLogsNotification, upsertWebsite } from "@/lib/queries";
import { useModal } from "@/lib/providers/modal-provider";
import { ExternalLink, Loader, Stars } from "lucide-react";
import { ErrorAlert } from "../alerts/error-alert";
import { SuccessAlert } from "../alerts/success-alert";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import FileUpload from "../file-upload";
import Link from "next/link";
import { env } from "@/lib/env.config";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres."),
  description: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres."),
  domain: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres."),
  template: z.enum(["DEFAULT"]),
  isActive: z.boolean(),
  websiteLogo: z.string().optional(),
});

interface LaunchpadFormProps {
  agencyDetails: Agency;
  details?: Partial<Website>;
  userId: string;
}

const LaunchpadForm: React.FC<LaunchpadFormProps> = ({
  details,
  agencyDetails,
  userId,
}) => {
  const { setClose } = useModal();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      description: details?.description || "",
      domain: details?.domain || "",
      template: details ? details.template : "DEFAULT",
      isActive: details?.isActive || true,
      websiteLogo: details?.websiteLogo || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await upsertWebsite({
        id: details?.id || v4(),
        name: values.name,
        description: values.description,
        domain: values.domain,
        template: values.template,
        createdAt: details?.createdAt || new Date(),
        updatedAt: new Date(),
        agencyId: agencyDetails.id,
        userId: userId,
        isActive: values.isActive,
        websiteLogo: values?.websiteLogo || "",
      });
      if (!response) throw new Error("No response from server");

      if (details?.id) {
        await saveActivityLogsNotification({
          agencyId: response.agencyId,
          description: `Website actualizada | ${response.name}`,
        });
      } else {
        await saveActivityLogsNotification({
          agencyId: response.agencyId,
          description: `Website creada | ${response.name}`,
        });
      }

      setShowSuccess(true);

      setClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Publica tu página web</CardTitle>
        <CardDescription>
          Llena todos los datos y selecciona la plantilla que más te guste.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="websiteLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo de la página</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="websiteLogo"
                      onChange={field.onChange}
                      value={field.value}
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
                      placeholder="Nombre de la página"
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
                      placeholder="Descripción de la página"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dominio</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Descripción de la página"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Reemplaza espacios por "-", convierte a minúsculas,
                        // elimina caracteres no permitidos, reemplaza guiones consecutivos
                        // y asegura que no comience con "-"
                        const formattedValue = value
                          .replace(/\s+/g, "-") // Reemplaza espacios con "-"
                          .toLowerCase() // Convierte todo a minúsculas
                          .replace(/[^a-z0-9-]/g, "") // Elimina caracteres no permitidos
                          .replace(/-+/g, "-") // Reemplaza múltiples "-" consecutivos con uno solo
                          .replace(/^-/, ""); // Elimina guiones al inicio de la cadena

                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una plantilla..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DEFAULT">Predeterminada</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Activo</FormLabel>
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

            <div className="flex gap-2">
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
              {details?.domain && (
                <Link
                  href={`${env.SCHEME}${details.domain}.${env.DOMAIN}/`}
                  target="_blank">
                  <Button type="button">
                    <span className="text-white flex items-center gap-1">
                      Ir a la página
                      <ExternalLink />
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </Form>
        {showError && (
          <ErrorAlert
            title="Ocurrió un error al guardar los datos."
            message="Vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico."
            onClose={() => setShowError(false)}
          />
        )}
        {showSuccess && (
          <SuccessAlert
            title="Éxito."
            message="Datos cargados con éxito."
            onClose={() => setShowSuccess(false)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LaunchpadForm;
