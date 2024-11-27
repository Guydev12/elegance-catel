"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "../prisma";
import { ProductSchema } from "@/types";
import { getUserById } from "./user.actions";
import { auth } from "@/auth";

type ProductData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  categoryId: string;
  images: {
    create: { imageUrl: string }[];
  };
  sizes?: {
    create: { size: string }[];
  };
  variants?: {
    create: {
      name: string;
      price: number;
      stock: number;
      color: string;
    }[];
  };
};

export async function createProduct(
  imageUrls: string[],
  data: z.infer<typeof ProductSchema>,
) {
  try {
    // Validate the input data
    const validatedFields = ProductSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid fields",
        details: validatedFields.error.flatten().fieldErrors,
      };
    }

    const {
      name,
      description,
      price,
      stock,

      isFeatured = false,
      category,
      hasSize,
      hasVariant,
    } = validatedFields.data;

    const sizes = hasSize ? validatedFields.data.sizes : [];
    const variants = hasVariant ? validatedFields.data.variants : [];

    // Create the base product data
    const productData: ProductData = {
      name,
      description,
      price,
      stock,
      isFeatured,
      categoryId: category,
      images: {
        create: imageUrls.map((url) => ({
          imageUrl: url,
        })),
      },
    };

    // Add sizes if applicable
    if (hasSize && sizes.length > 0) {
      productData.sizes = {
        create: sizes.map((size) => ({
          size,
        })),
      };
    }

    // Add variants if applicable
    if (hasVariant && variants.length > 0) {
      productData.variants = {
        create: variants.map((variant) => ({
          name: variant.name,
          price: variant.price,
          stock: variant.stock,
          color: variant.color,
        })),
      };
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: productData,
      include: {
        images: true,
        category: true,
        sizes: true,
        variants: true,
      },
    });

    revalidatePath("/products");
    return {
      success: true,
      message: "Product created successfully",
      data: product,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid product data",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create product" };
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        variants: true,
        sizes: true,
        orders: {
          include: {
            order: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    console.log("PRODUCT_GET_ALL_ERROR", error);
    throw error;
  }
}

export async function editProduct(
  imageUrls: string[],
  id: string,
  value: z.infer<typeof ProductSchema>,
) {
  const session = await auth();
  if (!session?.user) {
    return { authError: "Unauthorized" };
  }

  const candidate = await getUserById(session.user.id);
  if (!candidate?.isAdmin) {
    return { authError: "Unauthorized" };
  }

  const validatedFields = ProductSchema.safeParse(value);
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const {
      name,
      description,
      price,
      stock,
      hasSize,

      hasVariant,
      category,
      isFeatured,
    } = validatedFields.data;

    // Extract sizes and variants conditionally
    const sizes = hasSize ? (validatedFields.data.sizes ?? []) : [];
    const variants = hasVariant ? (validatedFields.data.variants ?? []) : [];

    // Extend product data with conditional types
    // Create the base product data
    //const productData: ProductData = {
    //  name,
    //  description,
    //  price,
    //  stock,
    //  isFeatured,
    //  categoryId: category,
    //  images: {
    //     deleteMany:{}
    // },
    //};

    //    // Add images if provided
    //if (imageUrls.length > 0) {
    //
    //  productData.images = {
    //    create: imageUrls.map((url) => ({
    //      imageUrl: url,
    //    })),
    //  };
    //}

    //// Add sizes if applicable
    if (hasSize) {
      await prisma.product.update({
        where: { id },
        data: {
          sizes: {
            create: sizes.map((size) => ({ size })),
          },
        },
      });
    } else {
      await prisma.product.update({
        where: { id },
        data: {
          sizes: {
            deleteMany: {},
          },
        },
      });
    }

    // Add variants if applicable
    if (hasVariant && variants.length > 0) {
      await prisma.product.update({
        where: { id },
        data: {
          variants: {
            deleteMany: {},
          },
        },
      });
    }
    if (hasVariant && variants.length > 0) {
      await prisma.product.update({
        where: { id },
        data: {
          variants: {
            create: variants.map((variant) => ({
              name: variant.name,
              price: variant.price,
              stock: variant.stock,
              color: variant.color,
            })),
          },
        },
      });
    } else {
      await prisma.product.update({
        where: { id },
        data: {
          variants: {
            deleteMany: {},
          },
        },
      });
    }

    // Update product in the database
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        isFeatured,
        categoryId: category,
        images: {
          deleteMany: {},
        },
      },
      include: {
        images: true,
        category: true,
        sizes: true,
        variants: true,
      },
    });

    const product = await prisma.product.update({
      where: { id },
      data: {
        images: {
          create: imageUrls.map((url) => ({
            imageUrl: url,
          })),
        },
      },
    });

    revalidatePath("/products");
    return {
      success: true,
      message: "Product updated successfully",
      data: product,
    };
  } catch (error) {
    console.error("EDIT_PRODUCT_ERROR", error);
    return {
      success: false,
      error: "Failed to update product",
    };
  }
}
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
      include: {
        category: true,
        variants: true,
        sizes: true,
        images: true,
        orders: true,
      },
    });
    return product;
  } catch (error) {
    console.log("PRODUCT_GET_SINGLE_ERROR", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
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
  try {
    await prisma.product.delete({
      where: { id },
    });
    return { success: "product Deleted" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete product" };
  }
}
