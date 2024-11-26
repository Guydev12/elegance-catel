"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { ProductVariant } from "@prisma/client";

export type ProductsProps = {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: {
    id: string;
    imageUrl: string;
    productId: string;
  }[];
  featured: boolean;
  orders: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    customerId: string;
    total: number;
  }[];
  variants: ProductVariant[];
  category: {
    id: string;
    name: string;
  };
  createdAt: Date;
};

export const ProductColumns: ColumnDef<ProductsProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.original.images;
      console.log(images);
      if (!images || images.length === 0) {
        return <div>No image</div>;
      }
      return (
        <div className="relative w-[50px] h-[50px]">
          <Image
            src={images[0].imageUrl || "/logo.jpg"}
            alt={row.original.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
      </Button>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.name,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.stock > 0 ? row.original.stock : "Out of stock"}
      </div>
    ),
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.featured ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.variants.length}</div>
    ),
  },
  {
    accessorKey: "orders",
    header: "Orders",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.orders.length}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="font-medium">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
