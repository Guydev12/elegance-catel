"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ProductDto } from "@/types";
import { ShoppingCart } from "lucide-react";
import React, { FC, useCallback } from "react";

interface ProductCardProps {
  product: ProductDto;
}

const ButtonAddCart: FC<ProductCardProps> = ({ product }) => {
  const cart = useCart();
  const handleAddToCart = useCallback(() => {
    cart.addItem(product);
  }, [cart, product]);
  if (!product) {
    return (
      <div className="w-full flex items-center justify-center font-bold">
        No product available
      </div>
    );
  }

  return (
    <>
      {" "}
      <Button
        onClick={handleAddToCart}
        disabled={product?.stock === 0}
        size="icon"
        className={`flex justify-center items-center w-full rounded-md text-white ${
          product?.stock === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
        }`}
        aria-label={`Ajouter ${product?.name} au panier`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="ml-2">Ajouter au panier</span>
      </Button>
    </>
  );
};

export default ButtonAddCart;
