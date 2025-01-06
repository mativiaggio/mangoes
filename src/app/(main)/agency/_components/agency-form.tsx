/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useToast } from "@/hooks/use-toast";
import { Agency } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "@tremor/react";
import * as z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/global/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleHelp, Loader, Stars, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteAgency,
  initUser,
  saveActivityLogsNotification,
  updateAgencyDetails,
  upsertAgency,
} from "@/lib/queries";
import { v4 } from "uuid";

interface Props {
  data: Partial<Agency>;
}

const FormSchema = z.object({
  name: z.string().min(2, { message: "Agency name must be atleast 2 chars." }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean().default(false),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().optional(),
});

const AgencyForm = ({ data }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [deletingAgency, SetDeletingAgency] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provinces, setProvinces] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [municipios, setMunicipios] = useState<any>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name || "",
      companyEmail: data?.companyEmail || "",
      companyPhone: data?.companyPhone || "",
      whiteLabel: false,
      address: data?.address || "",
      city: data?.city || "",
      zipCode: data?.zipCode || "",
      state: data?.state || "",
      country: "Argentina",
      agencyLogo: data?.agencyLogo || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleMunicipios = (value: string) => {
    fetch(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${value}&max=1000`
    )
      .then((response) => response.json())
      .then((data) => setMunicipios(data));
  };

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    // console.log("Entramos al submit");
    try {
      if (!data?.id) {
        const bodyData = {
          email: values.companyEmail,
          name: values.name,
          shipping: {
            address: {
              city: values.city,
              country: values.country,
              line1: values.address,
              postal_code: values.zipCode,
              state: values.zipCode,
            },
            name: values.name,
          },
          address: {
            city: values.city,
            country: values.country,
            line1: values.address,
            postal_code: values.zipCode,
            state: values.zipCode,
          },
        };
      }

      await initUser({ role: "AGENCY_OWNER" });
      if (!data?.id) {
        const response = await upsertAgency({
          id: data?.id ? data.id : v4(),
          address: values.address,
          agencyLogo: values.agencyLogo || "",
          city: values.city,
          companyPhone: values.companyPhone,
          country: values.country,
          name: values.name,
          state: values.state,
          whiteLabel: false,
          zipCode: values.zipCode,
          createdAt: new Date(),
          updatedAt: new Date(),
          companyEmail: values.companyEmail,
          connectAccountId: "",
          goal: 5,
        });
        toast({
          title: "Created Agency",
        });
        if (data?.id) return router.refresh();
        if (response) {
          return router.refresh();
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Ocurrió un error y no pudimos crear tu marca.",
      });
    }
  };

  const handleDeleteAgency = async () => {
    if (!data?.id) return;
    SetDeletingAgency(true);
    try {
      await deleteAgency(data?.id);
      toast({
        title: "Marca eliminada",
        description: "Se eliminó la marca y toda su información con éxito.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Ocurrió un error al eliminar la marca.",
        variant: "destructive",
      });
    }
    SetDeletingAgency(false);
  };

  return (
    <AlertDialog>
      <Card className="mt-4 w-full max-w-7xl">
        <CardHeader>
          <CardTitle>Información de la marca.</CardTitle>
          <CardDescription>
            Completa el formulario para crear una marca dentro de Mangoes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                console.error("Validation errors:", errors);
              })}
              className="space-y-4">
              <FormField
                control={form.control}
                name="agencyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo de la marca</FormLabel>
                    <FormControl>
                      <FileUpload
                        apiEndpoint="agencyLogo"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nombre de la marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la marca" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email de la marca</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="Email de marca"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="companyPhone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Número de teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      <span className="text-xs">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex gap-1 items-center w-fit">
                                País <CircleHelp size={12} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Actualmente Mangoes solo tiene soporte en
                                Argentina
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        placeholder="Country"
                        {...field}
                        value={"Argentina"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Provincia</FormLabel>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleMunicipios(value);
                        }}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Provincia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provinces?.provincias?.length > 0 ? (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            provinces.provincias.map((province: any) => (
                              <SelectItem
                                key={province.id}
                                value={province.nombre}>
                                <div className="flex cursor-pointer items-center gap-2">
                                  <p>{province.nombre}</p>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <p>No se encontraron provincias</p>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Ciudad</FormLabel>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <FormControl>
                            <SelectValue placeholder="Ciudad" />
                          </FormControl>
                        </SelectTrigger>
                        <SelectContent>
                          {municipios?.municipios?.length > 0 ? (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            municipios.municipios.map((municipio: any) => (
                              <SelectItem
                                key={municipio.id}
                                value={municipio.nombre}>
                                <div className="flex cursor-pointer items-center gap-2">
                                  <p>{municipio.nombre}</p>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <p>No se encontraron municipios</p>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Código postal</FormLabel>
                      <FormControl>
                        <Input placeholder="Código postal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {data?.id && (
                <div className="flex flex-col gap-2">
                  <FormLabel className="flex gap-1 items-center">
                    <span className="text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex gap-1 items-center w-fit">
                              Objetivo de productos/servicios{" "}
                              <CircleHelp size={12} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Establece un objetivo de productos/servicios.{" "}
                              <br />
                              Recuerda que esto puede ser modificado en
                              cualquier momento!
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </FormLabel>
                  <FormDescription className="sr-only">
                    ✨ Establece un objetivo de productos/servicios. Recuerda
                    que esto puede ser modificado en cualquier momento!
                  </FormDescription>
                  <NumberInput
                    defaultValue={data?.goal}
                    onValueChange={async (val) => {
                      if (!data?.id) return;
                      await updateAgencyDetails(data.id, { goal: val });
                      await saveActivityLogsNotification({
                        agencyId: data.id,
                        description: `Se actualizó el objetivo de la marca a | ${val} productos vendidos`,
                        subAccountId: undefined,
                      });
                      router.refresh();
                    }}
                    min={1}
                    className="!h-9 w-full rounded-md border !border-input !bg-transparent py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:!ring-ring md:text-sm"
                    placeholder="Objetivo de productos/servicios vendidos en el mes."
                  />
                </div>
              )}
              <Button type="submit">
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <span className="flex gap-2 text-white">
                    Crear marca <Stars />
                  </span>
                )}
              </Button>
            </form>
          </Form>
          {data?.id && (
            <div className="border-l-4 border-red-500 rounded-md border p-4 mt-4 bg-red-50">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-bold text-red-800">
                    Zona de peligro
                  </p>
                  <p className="text-sm font-medium text-red-800">
                    Eliminar una marca de Mongoes es una acción irreversible.{" "}
                    <br /> Esta acción eliminara todas las subcuentas junto con
                    toda la Información. Ya no tendrás acceso a las webs
                    creadas.
                  </p>
                  <AlertDialogTrigger
                    disabled={isLoading || deletingAgency}
                    className="bg-[#ef4444] p-1 rounded-md text-white text-sm mt-2">
                    {deletingAgency ? "Eliminando..." : "Eliminar marca"}
                  </AlertDialogTrigger>
                </div>
              </div>
            </div>
          )}
          <AlertDialogContent className="rounded-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left">
                Estás seguro/a?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Esta acción es irreversible. Estás a punto de eliminar la marca
                y toda su información.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row w-full items-center justify-end gap-2">
              <AlertDialogCancel className="mb-2">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                disabled={deletingAgency}
                className="bg-destructive hover:bg-destructive"
                onClick={handleDeleteAgency}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default AgencyForm;
