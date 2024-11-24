"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { CategoriesProps } from "./category-columns";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

type CellActionProps = {
  data: CategoriesProps;
};
export function CellAction({ data }: CellActionProps) {
  const category = data;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/admin/products/categories/${category.id}/edit}`);
          }}
        >
          Edit Category
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Category Detail</DropdownMenuItem>
        <DropdownMenuItem>Delete category</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
