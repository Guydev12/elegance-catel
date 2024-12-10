"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: { imageUrl: string }[];
    sizes: { size: string }[];
    variants: { color: string; price: number }[];
    isFeatured: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  // Navigate to product details
  const handleNavigation = () => {
    router.push(`/product/${product.id}`);
  };

  // Format price
  const formattedPrice = product.variants.length
    ? `${Math.min(...product.variants.map((v) => v.price))}€ - ${Math.max(
        ...product.variants.map((v) => v.price),
      )}€`
    : `${product.price}€`;

  return (
    <div
      className="relative bg-white border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-80 cursor-pointer"
      onClick={handleNavigation}
    >
      {/* Product Image */}
      <div className="relative items-center justify-center flex flex-col h-64 bg-gray-100">
        <Image
          src={product.images[0]?.imageUrl || "/default-image.jpg"}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover"
        />
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-gray-900 font-semibold mt-2">{formattedPrice}</p>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <p className="text-gray-500 text-sm mt-2">
            Sizes: {product.sizes.map((s) => s.size).join(", ")}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between">
        {/* Variants (Colors) */}
        <div className="flex items-center gap-1">
          {product.variants.map((variant, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: variant.color }}
            ></div>
          ))}
        </div>

        {/* Featured Badge */}

        <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
          <ShoppingCart />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
