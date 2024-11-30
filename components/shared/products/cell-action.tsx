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

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { deleteProduct } from "@/lib/actions/product.actions";
import { ProductsProps } from "./product-column";
import { AlertModal } from "@/components/ui/alert-modal";

type CellActionProps = {
  data: ProductsProps;
};
export function CellAction({ data }: CellActionProps) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  console.log(isPending);
  const onDelete = () => {
    startTransition(() => {
      deleteProduct(data.id).then((result) => {
        if (result.success) {
          toast.success(`Product Deleted ${data.id}`);
          router.refresh();
        } else if (result.error) {
          toast.error(result.error);
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
        description="Are you sure you want to delete this product? This action cannot be undone."
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
              router.push(`/admin/products/${data.id}/edit`);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 hover:bg-red-200 hover:text-red-600"
            onClick={() => {
              setShowModal(true);
            }}
          >
            {" "}
            Delete{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
