"use client";
import React, { useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { saveActivityLogsNotification, sendInvitation } from "@/lib/queries";
import { ErrorAlert } from "../alerts/error-alert";
import { SuccessAlert } from "../alerts/success-alert";
import { Loader } from "lucide-react";

interface SendInvitationProps {
  agencyId: string;
}

const SendInvitation: React.FC<SendInvitationProps> = ({ agencyId }) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const userDataSchema = z.object({
    email: z.string().email(),
    role: z.enum(["AGENCY_ADMIN", "SUBACCOUNT_USER", "SUBACCOUNT_GUEST"]),
  });

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      role: "SUBACCOUNT_USER",
    },
  });

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    try {
      const res = await sendInvitation(values.role, values.email, agencyId);
      await saveActivityLogsNotification({
        agencyId: agencyId,
        description: `Invited ${res?.email}`,
        subAccountId: undefined,
      });
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitación</CardTitle>
        <CardDescription>
          Se enviará una invitación al usuario. Los usuarios que ya hayan
          recibido una invitación enviada a su correo electrónico no recibirán
          otra invitación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>User role</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AGENCY_ADMIN">
                        Administrador
                      </SelectItem>
                      <SelectItem value="SUBACCOUNT_USER">
                        Subcuenta tipo usuario
                      </SelectItem>
                      <SelectItem value="SUBACCOUNT_GUEST">
                        Subcuenta tipo invitado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                "Enviar invitación"
              )}
            </Button>
          </form>
        </Form>
        {showError && (
          <ErrorAlert
            title="Ocurrió un error al enviar la invitación."
            message="Intente nuevamente."
            onClose={() => setShowError(false)}
          />
        )}
        {showSuccess && (
          <SuccessAlert
            title="Éxito."
            message="Invitación enviada con éxito."
            onClose={() => setShowSuccess(false)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SendInvitation;
