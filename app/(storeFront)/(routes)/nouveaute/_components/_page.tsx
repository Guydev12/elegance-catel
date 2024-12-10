"use client";

import React, { FC } from "react";

import { ProductDto } from "@/types";
import ProductCard from "@/components/shared/store/custom-product-card";

type NewSectionProps = {
  products: ProductDto[];
};

export const NewPage: FC<NewSectionProps> = ({ products }) => {
  const latestFeaturedProducts = products
    .filter((product) => product.isFeatured)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <h1 className="text-2xl font-bold mb-4 text-start">
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
