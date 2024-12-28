"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PasswordResetSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePasswordReset } from "../api/use-password-reset";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessAlert } from "@/components/alerts/success-alert";

type PasswordResetFormValues = z.infer<typeof PasswordResetSchema>;

type PasswordResetFormProps = {
  userId: string;
  secret: string;
};

export default function PasswordResetForm({
  userId,
  secret,
}: PasswordResetFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [validPasswords, setValidPasswords] = useState<boolean>(false);
  const { mutate } = usePasswordReset();

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      user_id: userId, // Parámetros proporcionados directamente
      secret: secret,
      password: "",
      confirmPassword: "",
    },
  });

  const checkDisabled = useCallback(() => {
    const password = form.getValues("password");
    const confirmPassword = form.getValues("confirmPassword");

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setValidPasswords(true);
    } else {
      setValidPasswords(false);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch(() => {
      checkDisabled();
    });
    return () => subscription.unsubscribe();
  }, [form, checkDisabled]);

  async function onSubmit(values: PasswordResetFormValues) {
    setIsSubmitting(true);
    mutate(
      { json: values },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setValidPasswords(false);
          setShowSuccess(true);
          setTimeout(() => {
            window.location.replace("login");
          }, 5000);
        },
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
        },
      }
    );
  }

  return (
    <Card className="w-full h-full md:w-[487px] border bg-[#fafafa] dark:bg-black dark:border-neutral-800 shadow-none">
      <CardHeader>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <span className="flex items-center justify-center gap-2 w-full">
              <span className="flex items-center gap-2">
                <Image
                  src={"/static/svg/mango-logo.svg"}
                  height={50}
                  width={50}
                  alt="Logo"
                  className="h-[50px] max-h-[50px] w-[50px] max-w-[50px]"
                />
              </span>
            </span>
          </div>
          <CardTitle className="text-2xl text-center">
            Restablece tu contraseña
          </CardTitle>
          <CardDescription className="text-center">Mangoes</CardDescription>
        </CardHeader>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Nueva Contraseña</Label>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="currentPassword"
                        placeholder="Ingresa la nueva contraseña"
                        onInput={() => checkDisabled()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                Confirmar Nueva Contraseña
              </Label>
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="confirmPassword"
                        placeholder="Repite la nueva contraseña"
                        onInput={() => checkDisabled()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-between mt-4 px-0">
              <Button type="submit" disabled={!validPasswords || isSubmitting}>
                {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
              </Button>
            </CardFooter>
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
            title="Contraseña actualizada con éxito."
            message="Te estamos redirigiendo al inicio de sesión."
            onClose={() => setShowError(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}
