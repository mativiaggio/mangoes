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
import { useSignUp } from "../api/use-sign-up";
import { ErrorAlert } from "@/components/alerts/error-alert";
import Image from "next/image";
import { registerSchema } from "../schemas";
import { useFindSecretBySecret } from "../api/use-get-secret-by-secret";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/screens/loading-screen";

type SignUpFormValues = z.infer<typeof registerSchema>;

type SignUptFormProps = {
  secret: string;
};

export default function CreateStoreAccountCard({ secret }: SignUptFormProps) {
  const { mutate } = useSignUp();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showNoSecretError, setShowNoSecretError] = useState<boolean>(false);
  const [showSecretError, setShowSecretError] = useState<boolean>(false);
  const router = useRouter();

  const {
    data: secretData,
    isLoading: isLoadingSecret,
    isFetching: isFetchingSecret,
  } = useFindSecretBySecret(secret);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      secretId: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setSubmitting(true);
    if (!secretData) {
      setShowNoSecretError(true);
      setSubmitting(false);
      setTimeout(() => {
        setShowNoSecretError(false);
      }, 5000);
      return;
    } else if (secretData && secretData?.documents.length != 1) {
      setShowSecretError(true);
      setSubmitting(false);
      setTimeout(() => {
        setShowSecretError(false);
      }, 5000);
      return;
    } else {
      if (secretData?.documents[0].used) {
        setShowSecretError(true);
        setSubmitting(false);
        setTimeout(() => {
          setShowSecretError(false);
        }, 10000);
        return;
      } else {
        const completeValues = {
          ...values,
          secretId: secretData?.documents[0].$id || "",
        };
        mutate(
          { json: completeValues },
          {
            onError: () => {
              setShowError(true);
              setSubmitting(false);
              form.setValue("password", "");
            },
          }
        );
      }
    }
  }

  if (!secret) {
    router.push("/acceso-denegado");
    return <LoadingScreen />;
  }

  if (isLoadingSecret || isFetchingSecret) {
    <LoadingScreen />;
  }

  return (
    <>
      <Card className="w-full h-full md:w-[487px] border bg-[#fafafa] dark:bg-black dark:border-neutral-800 shadow-none">
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
            Crear cuenta en Mangoes
          </CardTitle>
          <CardDescription className="text-center"> </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="name"
                label=""
                placeholder="Ingresa tu nombre completo"
                control={form.control}
              />
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
                  "Crear cuenta"}
              </Button>
            </form>
          </Form>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary/80 hover:underline">
                Ya tenes una cuenta?
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
      {showNoSecretError && (
        <ErrorAlert
          title="No existe un token de registro."
          message="No estas autorizado a registrar tu cuenta. Solicite al administrador un link de registro."
          onClose={() => setShowError(false)}
        />
      )}
      {showSecretError && (
        <ErrorAlert
          title="El token de registro es incorrecto."
          message="Esto sucede si el mismo ya fue utilizado para crear una cuenta. Solicite al administrador un nuevo link de registro."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
}
