"use client";

import MobileUserButtonSecurity from "@/components/buttons/mobile/mobile-user-button-security";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetUserDocument } from "@/features/users/api/use-find-user-document";
import { useUpdateProfileDocument } from "@/features/users/api/use-update-user-document";
import { useUpdateProfileEmail } from "@/features/users/api/use-update-user-email";
import { useUpdateProfileImage } from "@/features/users/api/use-update-user-image";
import { useUpdateProfileName } from "@/features/users/api/use-update-user-name";
import { userSchema } from "@/features/users/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileSettingsSkeleton from "../../seguridad/_components/profile-password-skeleton";
import { useGetFilePreviewById } from "@/features/files/api/use-get-preview";

interface Props {
  data: { $id: string; name: string; email: string };
  sheet?: boolean;
}
export default function ProfileSettingsForm({ data, sheet = false }: Props) {
  const { data: userDocument, isLoading: isLoadingDocument } =
    useGetUserDocument(data?.$id || null);
  const [imageId, setImageId] = useState("");

  const { data: fileUrl } = useGetFilePreviewById(
    userDocument?.document?.imageId || ""
  );

  const [formIsLoading, setFormIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: mutateImage } = useUpdateProfileImage();
  const { mutate: mutateName } = useUpdateProfileName();
  const { mutate: mutateEmail } = useUpdateProfileEmail();
  const { mutate: mutateDocument } = useUpdateProfileDocument();

  // const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      password: "",
      image: imageId,
    },
  });

  useEffect(() => {
    setImageId(userDocument?.document?.imageId || "");

    form.setValue("name", data?.name || "");
    form.setValue("email", data?.email || "");
  }, [userDocument, isLoadingDocument, form, data?.name, data?.email]);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     form.setValue("image", file);
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      setFormIsLoading(true);

      await new Promise<void>((resolve, reject) => {
        const finalValues = {
          ...values,
          image: values.image instanceof File ? values.image : "",
        };
        mutateImage(
          {
            form: {
              ...finalValues,
            },
          },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      if (values.name !== data?.name) {
        await new Promise<void>((resolve, reject) => {
          mutateName(
            { json: values },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      if (values.email !== data?.email) {
        await new Promise<void>((resolve, reject) => {
          mutateEmail(
            { json: values },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      if (values.name !== data?.name || values.email !== data?.email) {
        await new Promise<void>((resolve, reject) => {
          mutateDocument(
            { json: values },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      setShowSuccess(true);
      setFormIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar los datos personales:", error);
    } finally {
      setFormIsLoading(false);
      form.resetField("password");
    }
  };

  if (!userDocument || isLoadingDocument) {
    return (
      <>
        <ProfileSettingsSkeleton />
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Información Personal</h2>
          <div className="flex items-center space-x-4">
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          className="object-cover"
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="Foto de perfil"
                        />
                        <AvatarFallback>{data?.name}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          className="object-cover"
                          src={
                            fileUrl ||
                            `https://api.dicebear.com/6.x/initials/svg?seed=${data?.name}}`
                          }
                          alt="Foto de perfil"
                        />
                        <AvatarFallback>{data?.name}</AvatarFallback>
                      </Avatar>
                    )}
                    {/* <div className="flex flex-col">
                      <Label htmlFor="name">Foto de Perfil</Label>
                      <p className="text-sm trext-hover">
                        JPG, PNG, SVG, JPEG o WEBP, max 15MB
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg, .png, .svg, .jpeg, .webp"
                        ref={inputRef}
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant={"primary"}
                        className="w-fit mt-2"
                        onClick={() => inputRef.current?.click()}>
                        Subir Imagen
                      </Button>
                    </div> */}
                  </div>
                </div>
              )}
            />
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="name" placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Contraseña</Label>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Es necesaria la contraseña para guardar"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            {!sheet ? (
              <Link
                href={"/configuracion/seguridad"}
                className="text-sm hover:underline font-semibold mt-2">
                ¿Desea cambiar la contraseña? Click aquí
              </Link>
            ) : (
              <MobileUserButtonSecurity textButton={true} />
            )}
          </div>
        </section>

        <Separator />

        <Button
          variant={!form.getValues("password") ? "outline" : "primary"}
          type="submit"
          className="w-full"
          disabled={formIsLoading || !form.getValues("password")}>
          {formIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {formIsLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>

        {showSuccess && (
          <Alert className="fixed bottom-4 right-4 w-96">
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>
              Sus datos personales se ha sido actualizado con éxito.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
