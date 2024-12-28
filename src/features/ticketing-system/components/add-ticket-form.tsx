"use client";

import { useState } from "react";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNewTicket } from "../api/use-new-ticket";
import { useCurrent } from "@/features/auth/api/use-current";
import AddTicketFormSkeleton from "./add-ticket-form-skeleton";
import { useGetUserDocument } from "@/features/users/api/use-find-user-document";
import { SelectItem } from "@/components/ui/select";
import { TicketStatus } from "@/constants/appwrite";
import { ticketSchema } from "../schemas";

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function AddTicketForm() {
  const { mutate } = useNewTicket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrent();
  const { data: userDocument, isLoading: isLoadingDocument } =
    useGetUserDocument(currentUser?.$id || null);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
    },
  });

  async function onSubmit(values: TicketFormValues) {
    setIsSubmitting(true);

    if (!userDocument?.documentId) {
      console.error("User document ID not found");
      setIsSubmitting(false);
      return;
    }

    const formattedValues = {
      ...values,
      users: [userDocument.documentId],
    };

    mutate({ json: formattedValues });
    setIsSubmitting(false);
    router.push("/soporte");
  }

  if (isLoadingUser || isLoadingDocument) {
    return <AddTicketFormSkeleton />;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Nuevo ticket</CardTitle>
        <CardDescription>
          Completa el formulario para cargar un nuevo ticket
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="title"
                label="Título"
                placeholder="Título"
                control={form.control}
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="description"
                label="Descripción"
                placeholder="Descripción"
                control={form.control}
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="status"
                label="Estado"
                control={form.control}
                defaultValue="open"
                disabled>
                {TicketStatus.map((index, i) => (
                  <SelectItem key={index.id + i} value={index.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{index.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting || !userDocument?.documentId}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
              <Button
                variant={"outline"}
                onClick={() => router.push("/soporte")}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
