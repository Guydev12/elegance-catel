"use client";

import React, { FC } from "react";
import ProductCard from "./custom-product-card";
import { ProductDto } from "@/types";

type NewSectionProps = {
  products: ProductDto[];
};

export const NewSection: FC<NewSectionProps> = ({ products }) => {
  const latestFeaturedProducts = products
    .filter((product) => product.isFeatured)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4); // Take the latest 4 products

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Nouveautés en Boutique
      </h1>
      {/* Responsive Grid */}
      <div className="grid gap-y-6 items-center justify-center gap-x-6 sm:mr4  md:grid-cols-2 lg:grid-cols-3">
        {latestFeaturedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>{" "}
    </div>
  );
};
