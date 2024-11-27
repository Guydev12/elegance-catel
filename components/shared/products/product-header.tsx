"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProductHeader = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();
  const title = currentPath
    ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
    : "";
  const renderTitle = () => {
    if (title === "Products") {
      return <h2 className="font-bold">All Products</h2>;
    } else if (pathname === "/admin/products/new") {
      return <h2 className="font-bold">Add New Product</h2>;
    } else if (pathname === "/admin/products/categories/new") {
      return <h2 className="font-bold">Create Category</h2>;
    } else if (pathname.includes("/admin/products/categories/edit")) {
      return <h2 className="font-bold">Edit Category</h2>;
    } else {
      return <h2 className="font-bold">{title}</h2>;
    }
  };
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div>{renderTitle()}</div>
        <div>
          {title === "Products" && (
            <Button asChild className="bg-brand-primary font-bold">
              <Link href="/admin/products/new">
                <PlusIcon className="mr-2 h-4 w-4" aria-label="add products" />
                Add
              </Link>
            </Button>
          )}
          {title === "Categories" && (
            <Button asChild className="bg-brand-primary font-bold">
              <Link href="/admin/products/categories/new">
                <PlusIcon
                  className="mr-2 h-4 w-4"
                  aria-label="create category"
                />
                Create
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
