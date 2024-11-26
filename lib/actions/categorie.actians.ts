"use server";

import { auth } from "@/auth";

import { getUserById } from "./user.actions";
import prisma from "../prisma";
import { z } from "zod";
import { categoryFormSchema } from "@/types";

export async function createCategorie(
  value: z.infer<typeof categoryFormSchema>,
) {
  const session = await auth();
  if (!session) {
    return { authError: "Unauthorize" };
  } else if (session && !session.user) {
    return { authError: "Unauthorize" };
  }

  const candidate = await getUserById(session?.user?.id);
  const isAdmin = candidate?.isAdmin;

  if (!isAdmin) {
    return { authError: "Unauthorize" };
  }
  const validateFields = categoryFormSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "Invalid Field" };
  }
  try {
    const { name } = validateFields.data;
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    console.log({ "CATEGORY CREATE": category });
    return { success: "Category create with success" };
  } catch (error) {
    console.log("CREATE_CATEGORIE_ERROR", error);
    return { error: "Failed to Create category" };
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    return categories;
  } catch (error) {
    console.log("CATEGORY_GET_ALL_ERROR", error);
    throw error;
  }
}
export async function editCategory(
  id: string,
  value: z.infer<typeof categoryFormSchema>,
) {
  const session = await auth();
  if (!session) {
    return { authError: "Unauthorized" };
  } else if (session && !session.user) {
    return { authError: "Unauthorized" };
  }

  const candidate = await getUserById(session?.user?.id);
  const isAdmin = candidate?.isAdmin;

  if (!isAdmin) {
    return { authError: "Unauthorized" };
  }
  const validateFields = categoryFormSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "Invalid Field" };
  }
  try {
    const { name } = validateFields.data;
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
    console.log({ "CATEGORY UPDATE": category });
    return { success: "Category update with success" };
  } catch (error) {
    console.log("CREATE_CATEGORIE_ERROR", error);
    return { error: "Failed to Create category" };
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findFirst({
      where: { id },
      include: { products: true },
    });
    return category;
  } catch (error) {
    console.log("CATEGORY_GET_SINGLE_ERROR", error);
    throw error;
  }
}


export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session) {
    return { authError: "Unauthorized" };
  } else if (!session.user) {
    return { authError: "Unauthorized" };
  }

  const candidate = await getUserById(session.user.id);
  const isAdmin = candidate?.isAdmin;

  if (!isAdmin) {
    return { authError: "Unauthorized" };
  }

  try {
    // First, check if the category has products linked to it
    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        products: true, // Retrieve related products
      },
    });

    if (!category) {
      return { error: "Category not found" };
    }

    if (category.products.length > 0) {
      return { error: "This category can't be deleted because it has products" };
    }

    // If no products, proceed to delete the category
    await prisma.category.delete({
      where: { id },
    });

    return { success: "Category Deleted" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete category" };
  }
}

