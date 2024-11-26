import { z } from "zod";
// Customer Model
export const CustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
//categories

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters long"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

// Product Mode
//l
//
export const ProductSize = z.discriminatedUnion("hasSize", [
  z.object({
    hasSize: z.literal(true),
    sizes: z.array(z.string()).min(1, "You should at least select one size"),
  }),
  z.object({
    hasSize: z.literal(false),
  }),
]);

export const ProductVariantaschema = z.discriminatedUnion("hasVariant", [
  z.object({
    hasVariant: z.literal(true),
    variants: z.array(
      z.object({
        name: z.string().min(1),
        price: z.coerce.number().positive(),
        stock: z.coerce.number().int().nonnegative(),
        color: z.string(),
      }),
    ),
  }),
  z.object({
    hasVariant: z.literal(false),
  }),
]);

export const ProductSchema = z
  .object({
    name: z.string().min(2, {
      message: "Product name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    price: z.coerce.number().positive({
      message: "Price must be a positive number.",
    }),
    stock: z.coerce.number().int().nonnegative({
      message: "Stock must be a non-negative integer.",
    }),
    images: z
      .array(z.string())
      .min(1, "must upload at least one image")
      .max(4, "you can upload only 4 images"),
    isFeatured: z.boolean().default(false),
    category: z.string().min(1, { message: "Please select one Category" }),
  })
  .and(ProductVariantaschema)
  .and(ProductSize);

export type Product = z.infer<typeof ProductSchema>;

// You can add more types here as needed, such as:
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Category Model
export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Category name is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Image Model
export const ImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Invalid image URL"),
  productId: z.string().min(1, "Product ID is required"),
});

// Order Model
export const OrderSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, "Customer ID is required"),
  total: z.number().positive("Total must be a positive number"),
  status: z.enum(["Pending", "Shipped", "Delivered"]).default("Pending"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// OrderProduct Model
export const OrderProductSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().min(1, "Order ID is required"),
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const registerSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const todoSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
});

export type SideNavItem = {
  title: string;
  url: string;
  icon?: string;
  submenu?: true;
  subMenuItems?: SideNavItem[];
};
export type CardWrapperOptions = {
  headerTitles: string;
  description: string;
  inputName: string;
  errorsMessage: string;
};

export type UserEntity = {
  id: number;
  email: string;
  username: string;
  avatar: string;
  isAdmin: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
