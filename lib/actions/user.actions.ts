"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Import your Prisma instance
import { auth, signIn } from "@/auth"; // Import your Prisma instance
import { redirect } from "next/navigation";
import { z } from "zod";
import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "@/types";
import { User } from "@prisma/client";

const editSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  avatar: z.string().optional(),
});

export async function createUser(values: z.infer<typeof registerSchema>) {
  const validateFields = registerSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid fields !" };
  try {
    const { email, password, username } = validateFields.data;
    const userCount = await prisma.user.count();
    const isAdmin = userCount === 0;
    // Check if user already exists
    const emailExist = await prisma.user.findUnique({
      where: { email },
    });
    const usernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (emailExist && usernameExist) {
      return { error: "Email and Username already taken !" };
    }
    if (emailExist) {
      return { error: "Email already taken !" };
    }

    if (usernameExist) {
      return { error: "Username already taken !" };
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the SQLite database
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        isAdmin,
      },
    });

    return { success: "Account Created" };
    redirect("/login");
  } catch (err) {
    return { error: "something went wrong" };
    throw err;
  }
}
export async function loginUser(values: z.infer<typeof loginSchema>) {
  const validateFields = loginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields !" };
  }

  try {
    const { email, password } = validateFields.data;
    // Await the signIn result
    await signIn("credentials", {
      redirectTo: "/admin/dashboard",
      email,
      password,
    });
    // Redirect to the home page on successful login
    //if(result.ok){
    return { success: `Welcome back to Elegance Catel dashboard` };
    // }catch
  } catch (err) {
    console.log("instance of error", err instanceof AuthError);
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw err;
  }
}
export async function getUserById(userId: string): Promise<User | undefined> {
  const id = parseInt(userId);
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) return undefined;
  return user;
}

export async function editProfile(value: z.infer<typeof editSchema>) {
  const session = await auth();

  if (!session) {
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };
  }

  const validateFields = editSchema.safeParse(value);
  if (!validateFields.success) {
    return {
      success: false,
      error: "Invalid field",
    };
  }
  const { username, avatar } = validateFields.data;
  try {
    const id = parseInt(session.user.id, 10);
    await prisma.user.update({
      where: { id },
      data: {
        username,
        avatar,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: "An error occurred while updating the profile",

      status: 500,
    };
  }
}
