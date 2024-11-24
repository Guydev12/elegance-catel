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
    return { success: "Category create wiyh success" };
  } catch (error) {
    console.log("CREATE_CATEGORIE_ERROR", error);
    return { error: "Failed to Create category" };
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({include:{products:true,}})
    return categories;
  } catch (error) {
    console.log("CATEGORY_GET_ALL_ERROR", error);
    throw error;
  }
}
