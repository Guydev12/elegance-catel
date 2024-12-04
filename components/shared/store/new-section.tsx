"use client";

import React, { FC } from "react";
import ProductCard from "./custom-product-card";
import { ProductDto } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

type NewSectionProps = {
  products: ProductDto[];
};
export const NewSection: FC<NewSectionProps> = ({ products }) => {
  const cart = useCart();
  const router = useRouter();
  const handleNavigation = (id: string) => {
    router.push(`/product/${id}`);
  };
  const handleAddToCart = (data: ProductDto) => {
    cart.addItem(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nouveaute</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {products.slice(0, 4).map((product) => {
          if (product.isFeatured) {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                imageUrl={product.images[0].imageUrl}
                onAddToCart={() => handleAddToCart(product)}
                onNavigate={() => handleNavigation(product.id)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
