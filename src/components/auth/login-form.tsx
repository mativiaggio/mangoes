"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/database/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Submit } from "../buttons/submit";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { login } from "@/database/auth/queries";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");
    startTransition(async () => {
      await login(values).then((data) => {
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Éxito",
            description: data.success,
            variant: "success",
          });
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Bienvenido!"
      backButtonLabel="Todavía no tenes cuenta? Ingresa aquí"
      backButtonHref="/auth/register"
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="************"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Submit
            className="w-full"
            label="Iniciar sesión"
            type="submit"
            isLoading={isPending}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
