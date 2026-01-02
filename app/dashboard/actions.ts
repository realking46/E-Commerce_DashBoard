"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/lib/validators/product";
// import { uploadToS3 } from "@/lib/s3";
 
export type ActionResult = {
  success: string | null;
  errors: Record<string, string> | null;
};

// CREATE
export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}) {
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Name required";
  if (!data.price) errors.price = "Price required";
  if (!data.imageUrl) errors.imageUrl = "Image required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.product.create({
    data,
  });
  revalidatePath("/dashboard");
  return { success: "Product added successfully" };
}

// DELETE
export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
}

// UPDATE
export async function updateProduct(
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  }
) {
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await prisma.product.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/dashboard");

  return { success: "Product updated successfully" };
}

