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
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { deleteCategory } from "@/lib/actions/categorie.actians";
import { AlertModal } from "@/components/ui/alert-modal";

type CellActionProps = {
  data: CategoriesProps;
};
export function CellAction({ data }: CellActionProps) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const category = data;
  const router = useRouter();

  
const onDelete = () => {
  startTransition(() => {
    deleteCategory(data.id).then((result) => {
      if (result.success) {
        toast.success(`Category Deleted ${data.id}`);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);  // Show the specific error message
      }
    });
  });
};

  return (
    <>
      <AlertModal
        open={showModal}
        onOpenChange={setShowModal}
        title="Confirm Delete"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText={isPending ? "Deleting..." : "Confirm"}
        cancelText="Cancel"
        onConfirm={() => {
          setShowModal(false); // Close modal
          onDelete(); // Execute delete action
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/admin/products/categories/${category.id}/edit`);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:bg-red-200 hover:text-red-600"
            onClick={() => setShowModal(true)} // Open the modal on delete click
          >
            {" "}
            Delete{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
