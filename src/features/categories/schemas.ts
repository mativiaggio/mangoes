import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"), // Campo requerido de tipo String
  slug: z.string().min(1, "El slug es requerido"), // Campo requerido de tipo String
  description: z.string().min(1, "La descripción es requerida"), // Campo requerido de tipo String
  parent_category_id: z.string().nullable(), // Campo opcional de tipo String o null
  is_active: z.boolean().default(true), // Campo opcional de tipo Boolean con valor por defecto true
  labels: z.string().optional(),
  banner_image: z.string().optional(), // Campo opcional de tipo String
});
