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

import { Agency, SubAccount } from "@prisma/client";
import { useEffect, useState } from "react";
import { useModal } from "@/lib/providers/modal-provider";
import FileUpload from "../file-upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CircleHelp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PhoneInput from "react-phone-number-input";
import { useToast } from "@/hooks/use-toast";
import { Submit } from "../buttons/submit";
import {
  createSubAccount,
  updateSubAccount,
} from "@/database/subaccount/queries";
import { saveActivityLogsNotification } from "@/database/notification/queries";

const formSchema = z.object({
  name: z.string().min(2, "El subnombre debe tener al menos 2 caracteres."),
  companyEmail: z.string().min(1, "Este campo es obligatorio"),
  companyPhone: z.string().min(1, "Este campo es obligatorio"),
  address: z.string().min(1, "Este campo es obligatorio"),
  subAccountLogo: z.string().optional(),
  country: z.string().min(1, "Este campo es obligatorio"),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().min(1, "Este campo es obligatorio"),
});

interface SubAccountFormProps {
  //To add the sub account to the agency
  agencyDetails: Agency;
  details?: Partial<SubAccount>;
  userId: string;
  userName: string;
}

const SubAccountForm: React.FC<SubAccountFormProps> = ({
  details,
  agencyDetails,
}) => {
  const { setClose } = useModal();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provinces, setProvinces] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [municipios, setMunicipios] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      companyEmail: details?.companyEmail || "",
      companyPhone: details?.companyPhone,
      address: details?.address || "",
      city: details?.city || "",
      zipCode: details?.zipCode || "",
      state: details?.state || "",
      country: "Argentina",
      subAccountLogo: details?.subAccountLogo || undefined,
    },
  });

  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())
      .then((data) => setProvinces(data));

    if (details?.state) {
      setSelectedProvince(details.state);
    }
  }, [details?.state]);

  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${selectedProvince}&max=1000`
      )
        .then((response) => response.json())
        .then((data) => {
          setMunicipios(data);
          // Verifica si `details.city` está en la lista de municipios y selecciónala
          if (details?.city) {
            const ciudadEncontrada = data.municipios.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (municipio: any) => municipio.nombre === details.city
            );
            if (ciudadEncontrada) {
              form.setValue("city", ciudadEncontrada.nombre);
            }
          }
        })
        .catch((error) => console.error("Error fetching municipios:", error));
    }
  }, [selectedProvince, details?.city, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let response;

      if (details?.id) {
        response = await updateSubAccount({
          id: details?.id ? details.id : v4() || "",
          address: values.address || "",
          subAccountLogo: values.subAccountLogo || "",
          city: values.city || "",
          companyPhone: values.companyPhone || "",
          country: values.country || "",
          name: values.name || "",
          state: values.state || "",
          zipCode: values.zipCode || "",
          createdAt: new Date(),
          updatedAt: new Date(),
          companyEmail: values.companyEmail || "",
          agencyId: agencyDetails.id || "",
          connectAccountId: "",
          goal: 5000,
        });
      } else {
        response = await createSubAccount({
          id: details?.id ? details.id : v4() || "",
          address: values.address || "",
          subAccountLogo: values.subAccountLogo || "",
          city: values.city || "",
          companyPhone: values.companyPhone || "",
          country: values.country || "",
          name: values.name || "",
          state: values.state || "",
          zipCode: values.zipCode || "",
          createdAt: new Date(),
          updatedAt: new Date(),
          companyEmail: values.companyEmail || "",
          agencyId: agencyDetails.id || "",
          connectAccountId: "",
          goal: 5000,
        });
      }

      if (!response) throw new Error("No response from server");
      console.log("response", response);
      await saveActivityLogsNotification({
        agencyId: response.agencyId,
        description: `Subcuenta actualizada | ${response.name}`,
        subAccountId: response.id,
      });

      toast({
        title: "Éxito",
        description: "Datos cargados con éxito.",
        variant: "success",
      });

      setClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un error al guardar los datos, vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (details) {
      form.reset(details);
    }
  }, [details, form]);

  const isLoading = form.formState.isSubmitting;
  //CHALLENGE Create this form.
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Información de Subcuenta</CardTitle>
        <CardDescription>Ingresa los detalles de la subcuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subAccountLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo de la cuenta</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="subaccountLogo"
                      value={field.value}
                      onChange={field.onChange}
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
                    <FormLabel>Nombre de la cuenta</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Nombre de la cuenta"
                        {...field}
                      />
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
                    <FormLabel>Email de la cuenta</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                      <PhoneInput
                        defaultCountry="AR"
                        placeholder="Teléfono"
                        international
                        withCountryCallingCode
                        onChange={field.onChange}
                        value={field.value}
                        className="input-phone"
                      />
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
                    <Input required placeholder="Calle 123 4567" {...field} />
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
                            <FormLabel className="flex gap-1 items-center w-fit">
                              País <CircleHelp size={12} />
                            </FormLabel>
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
                        setSelectedProvince(value);
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
                      <Input required placeholder="Código postal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default SubAccountForm;
