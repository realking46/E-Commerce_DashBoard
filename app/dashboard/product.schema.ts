import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(5, "Description too short"),
  price: z.number().positive("Price must be > 0"),
  stock: z.number().int().nonnegative("Stock must be >= 0"),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type ProductInput = z.infer<typeof productSchema>;
