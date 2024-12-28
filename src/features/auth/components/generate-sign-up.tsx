"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Loader2 } from "lucide-react";
import { SuccessAlert } from "@/components/alerts/success-alert";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { env } from "@/env.config";
import { useNewSecret } from "../api/use-create-secret";
import { useGetSecrets } from "../api/use-get-secrets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GenerateRegisterLink() {
  const [loginLink, setLoginLink] = useState("");
  const [secret, setSecret] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCopiedSuccess, setShowCopiedSuccess] = useState<boolean>(false);
  const [showCopiedError, setShowCopiedError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useNewSecret();
  const { data, isLoading } = useGetSecrets();

  const generateLink = () => {
    setIsSubmitting(true);
    const secret =
      crypto.randomUUID().replace(/-/g, "") +
      crypto.randomUUID().replace(/-/g, "");
    const link = `${env.HOSTNAME}/create-store-account?secret=${secret}`;

    setSecret(secret);
    const values = {
      secret: secret,
      used: false,
    };

    mutate(
      { json: values },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setIsGenerated(true);
          setShowSuccess(true);
          setLoginLink(link);
        },
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        },
      }
    );
  };

  const copyToClipboard = (data: string | undefined) => {
    navigator.clipboard
      .writeText(
        `${env.HOSTNAME}/create-store-account?secret=${data ? data : ""}`
      )
      .then(() => {
        setShowCopiedSuccess(true);
      })
      .catch((err) => {
        console.error("Error al copiar: ", err);
        setShowCopiedError(true);
      });
  };

  return (
    <>
      <div className="space-y-4 w-full">
        <Button
          onClick={generateLink}
          className="w-full"
          disabled={isSubmitting}>
          Generar Enlace de Inicio de Sesión
        </Button>
        <div className="space-y-2">
          <div className="flex relative">
            <Input
              readOnly
              value={loginLink}
              className="flex-grow"
              placeholder="El enlace se generará aquí"
              disabled={!isGenerated}
            />
            <Button
              onClick={() => copyToClipboard(secret)}
              className="ml-2 !h-[48px] w-[48px] p-3"
              variant={isGenerated ? "primary" : "outline"}
              disabled={!isGenerated}>
              <Copy className="h-6 w-6" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {isGenerated
              ? "Este enlace es de un solo uso y expirará después de ser utilizado."
              : "Se creará un enlace único de un solo uso para registro."}
          </p>
          <Dialog modal={false}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full"
                disabled={data?.secrets.total === 0 ? true : false}>
                {data?.secrets.total === 0
                  ? "No hay enlaces activos"
                  : `Ver enlaces activos ${data?.secrets.total}`}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Enlaces Activos ({data?.secrets.total})
                </DialogTitle>
              </DialogHeader>
              {isLoading ? (
                <Loader2 className="w-8 h-8" />
              ) : (
                <ScrollArea className="h-[200px] w-96 whitespace-nowrap rounded-md">
                  <ul className="space-y-2">
                    {data?.secrets.documents.map((secret) => (
                      <li
                        key={secret.$id}
                        className="flex items-center justify-between">
                        <span className="text-sm truncate mr-2">
                          {`${env.HOSTNAME}/create-store-account?secret=${secret.secret}`}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(secret.secret)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </DialogContent>
          </Dialog>
        </div>
        {showSuccess && (
          <SuccessAlert
            title="Enlace generado con éxito."
            message="Hemos generado un enlace de único uso para que se lo envíes a tu próximo usuario."
            onClose={() => setShowSuccess(false)}
            timeToClose={5000}
          />
        )}
        {showError && (
          <ErrorAlert
            title="Ocurrió un error al generar el enlace."
            message="Vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico."
            onClose={() => setShowCopiedError(false)}
            timeToClose={5000}
          />
        )}
        {showCopiedSuccess && (
          <SuccessAlert
            title="Enlace copiado con éxito."
            message="Hemos copiado el enlace de registro único a tu portapapeles."
            onClose={() => setShowCopiedSuccess(false)}
            timeToClose={5000}
          />
        )}
        {showCopiedError && (
          <ErrorAlert
            title="Ocurrió un error al copiar el enlace."
            message="Vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico."
            onClose={() => setShowCopiedError(false)}
            timeToClose={5000}
          />
        )}
      </div>
    </>
  );
}
