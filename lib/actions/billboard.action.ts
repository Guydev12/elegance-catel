"use server";

import { auth } from "@/auth";
import { bilboardFormSchema } from "@/types";
import { z } from "zod";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function createBillboard(
  value: z.infer<typeof bilboardFormSchema>,
) {
  const session = await auth();

  if (!session) {
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };
  }

  const validateFields = bilboardFormSchema.safeParse(value);
  if (!validateFields.success) {
    return {
      success: false,
      error: "Invalid field",
    };
  }
  const { text, image } = validateFields.data;
  try {
    await prisma.bildboard.create({
      data: { image, text },
    });
    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Billboard created successfully",
    };
  } catch (error) {
    console.error("Error creating bildboard:", error);
    return {
      success: false,
      error: "An error occurred while creating the bildboard",

      status: 500,
    };
  }
}
