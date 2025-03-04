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
import { useModal } from "@/lib/providers/modal-provider";
import { ExternalLink, InfoIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
// import FileUpload from "../file-upload";
import Link from "next/link";
import { env } from "@/lib/env.config";
import { WebsiteIndustry, WebsiteTemplates } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
// import SavingButton from "../buttons/saving-button";
// import SaveButton from "../buttons/save-button";
import { Submit } from "../buttons/submit";
import { upsertWebsite } from "@/database/website/queries";
import { saveActivityLogsNotification } from "@/database/notification/queries";

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
  industry: z.enum(WebsiteIndustry),
  template: z.enum(WebsiteTemplates),
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
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      description: details?.description || "",
      domain: details?.domain || "",
      industry: details ? details.industry : "ECOMMERCE",
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
        industry: values.industry,
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
        title: "Ocurrió un error al guardar los datos.",
        description:
          "Vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico.",
        variant: "destructive",
      });
    }
  }

  // const isLoading = form.formState.isSubmitting;

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
            {/* <FormField
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
            /> */}
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
                    {/* <Input
                      required
                      placeholder="Descripción de la página"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const formattedValue = value
                          .replace(/\s+/g, "-") // Reemplaza espacios con "-"
                          .toLowerCase() // Convierte todo a minúsculas
                          .replace(/[^a-z0-9-]/g, "") // Elimina caracteres no permitidos
                          .replace(/-+/g, "-") // Reemplaza múltiples "-" consecutivos con uno solo
                          .replace(/^-/, ""); // Elimina guiones al inicio de la cadena

                        field.onChange(formattedValue);
                      }}
                    /> */}
                    <div className="flex items-center overflow-hidden rounded-md border border-input focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-[0.1px]">
                      <Input
                        className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        required
                        placeholder="Dominio"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const formattedValue = value
                            .replace(/\s+/g, "-")
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "")
                            .replace(/-+/g, "-")
                            .replace(/^-/, "");

                          field.onChange(formattedValue);
                        }}
                      />
                      <span className="bg-muted px-3 py-2 text-sm text-muted-foreground">
                        .{env.DOMAIN}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Rubro</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rubro..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ECOMMERCE">Tienda Online</SelectItem>
                      <SelectItem value="RESTAURANT">Restaurante</SelectItem>
                    </SelectContent>
                  </Select>
                  <Link
                    href={"industries"}
                    target="_blank"
                    className="text-sm text-main-primary hover:text-main-secondary flex items-center gap-1 w-fit">
                    <InfoIcon size={14} />
                    Más acerca de roles
                  </Link>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Plantilla</FormLabel>
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
              <Submit
                type="submit"
                isLoading={form.formState.isSubmitting}
                className="overflow-hidden"
              />

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
      </CardContent>
    </Card>
  );
};

export default LaunchpadForm;
