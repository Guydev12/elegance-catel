"use client";

import { Product } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoriesProps = {
  id: string;
  name: string;
  products: Product[];
};

export const CategoryColumns: ColumnDef<CategoriesProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const productCount = row.original.products.length;
      return <div>{productCount}</div>;
    },
  },
  {
    id: "actions",
        header:"Actions",
        cell: ({ row }) => <CellAction data={row.original} />,
  },
];
