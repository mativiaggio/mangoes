"use client";

import { useState } from "react";
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
import Link from "next/link";
import { Check, ChevronLeftIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordRecoverySchema } from "../schemas";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { usePasswordRecovery } from "../api/use-password-recovery";
import { cn } from "@/lib/utils";

type PasswordRecoveryFormValues = z.infer<typeof PasswordRecoverySchema>;

export default function PasswordRecoveryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setIsDone] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const { mutate } = usePasswordRecovery();

  const form = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: PasswordRecoveryFormValues) {
    setIsSubmitting(true);

    mutate(
      { json: values },
      {
        onSuccess: () => {
          setIsDone(true);
          setIsSubmitting(false);
        },
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
        },
      }
    );
  }

  return (
    <>
      <Card
        className={cn(
          "w-full h-full md:w-[487px] border bg-[#fafafa] dark:bg-black dark:border-neutral-800 shadow-none",
          done ? "hidden" : "block"
        )}>
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
              className="">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <CustomFormField
                    fieldType={FormFieldType.EMAIL}
                    name="email"
                    label="Correo electrónico"
                    placeholder="tu@email.com"
                    control={form.control}
                  />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4 px-0">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Recuperar contraseña"}
                </Button>
              </CardFooter>
            </form>
          </Form>
          {showError && (
            <ErrorAlert
              title="Ocurrió un error al enviar los datos."
              message="Vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico."
              onClose={() => setShowError(false)}
            />
          )}
          <Link
            href={"/login"}
            className="text-base flex gap-2 hover:underline font-bold">
            <ChevronLeftIcon />
            Volver
          </Link>
        </CardContent>
      </Card>
      <Card
        className={cn(
          "w-full h-full md:w-[487px] border bg-[#fafafa] dark:bg-black dark:border-neutral-800 shadow-none",
          done ? "block" : "hidden"
        )}>
        <CardHeader>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <span className="flex items-center justify-center gap-2 w-full">
                <span className="flex items-center gap-2">
                  <Check className="h-[50px] w-[50px]" strokeWidth={3} />
                </span>
              </span>
            </div>
            <CardTitle className="text-2xl text-center">
              Operación exitosa
            </CardTitle>
            <CardDescription className="text-center">
              Se ha enviado un correo electrónico con las instrucciones para
              restablecer tu contraseña.
            </CardDescription>
          </CardHeader>
        </CardHeader>
        <CardContent>
          <Link
            href={"/login"}
            className="text-base flex gap-2 hover:underline font-bold">
            <ChevronLeftIcon />
            Volver al inicio de sesión
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
