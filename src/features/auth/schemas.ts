import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Campo obligatorio"),
});

export const createAccountSchema = z.object({
  name: z.string().trim().min(1, "Campo obligatorio"),
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Campo obligatorio"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Campo obligatorio"),
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Campo obligatorio"),
  secretId: z.string().optional(),
});

export const PasswordRecoverySchema = z.object({
  email: z.string().min(1, "Este campo es obligatorio"),
});

export const PasswordResetSchema = z.object({
  user_id: z.string().min(1, "Este campo es obligatorio"),
  secret: z.string().min(1, "Este campo es obligatorio"),
  password: z.string().min(1, "Este campo es obligatorio"),
  confirmPassword: z.string().min(1, "Este campo es obligatorio"),
});

export const SecretSchema = z.object({
  secret: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(64, "Este campo es muy largo"),
  used: z.boolean(),
});
