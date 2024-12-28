import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().trim().min(1, "Campo obligatorio"),
  description: z.string().min(1, "Campo obligatorio"),
  solution: z.string().optional(),
  status: z
    .enum(["open", "in-progress", "solved", "closed", "under-review", ""])
    .optional(),
});
