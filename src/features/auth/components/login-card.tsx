"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../api/use-login";
import { ErrorAlert } from "@/components/alerts/error-alert";
import Image from "next/image";
import { loginSchema } from "../schemas";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";

export const LoginCard = () => {
  const { mutate } = useLogin();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setSubmitting(true);
    mutate(
      { json: values },
      {
        onError: () => {
          setShowError(true);
          setSubmitting(false);
          form.setValue("password", "");
        },
      }
    );
  };

  return (
    <>
      <Card className="w-full h-full md:w-[487px] border bg-[#fafafa] dark:bg-black dark:border-neutral-800 shadow-none">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            {/* <HeartPulse size={42} /> */}
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
            Ingresa a Mangoes
          </CardTitle>
          <CardDescription className="text-center"> </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField
                fieldType={FormFieldType.EMAIL}
                name="email"
                label=""
                placeholder="Ingresa tu correo electrónico"
                control={form.control}
              />
              <CustomFormField
                fieldType={FormFieldType.PASSWORD}
                name="password"
                label=""
                placeholder="Ingresa tu contraseña"
                control={form.control}
              />
              <Button
                disabled={submitting ? true : false}
                size={"lg"}
                className="w-full">
                {(submitting && (
                  <>
                    <Loader2 className="animate-spin" />
                    Cargando...
                  </>
                )) ||
                  "Ingresar"}
              </Button>
            </form>
          </Form>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/recuperar-clave"
                className="font-semibold text-primary hover:text-primary/80 hover:underline">
                Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="text-sm">
              <Link
                href="/create-account"
                className="font-semibold text-primary hover:text-primary/80 hover:underline">
                No tienes una cuenta?
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-center text-muted-foreground">
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="underline hover:text-primary">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline hover:text-primary">
              Política de Privacidad.
            </a>
          </p>
        </CardFooter>
      </Card>
      {showError && (
        <ErrorAlert
          title="Ocurrió un error al iniciar sesión."
          message="Revise la dirección de correo electrónico y la contraseña."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
};
