"use client";

import React, { useState, useEffect } from "react";
import { ProductDto } from "@/types";
import SortingOptions from "./sorting-options";
import ProductCard from "@/components/shared/store/custom-product-card";
import FilterBar from "./filter-bar";

type BoutiquePageProps = {
  products: ProductDto[];
  categories: string[]; // Categories from backend
};

const BoutiquePage: React.FC<BoutiquePageProps> = ({
  products,
  categories,
}) => {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductDto[]>(products);
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    size: "",
    sortBy: "date", // Default sorting by date
  });

  // Extract unique sizes and colors
  const sizes = Array.from(
    new Set(
      products.flatMap((product) => product.sizes.map((size) => size.size)),
    ),
  );

  const colors = Array.from(
    new Set(
      products.flatMap((product) =>
        product.variants.map((variant) => variant.color),
      ),
    ),
  );

  // Apply filtering and sorting logic whenever filters change
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by category
    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category?.name === filters.category,
      );
    }

    // Filter by color
    if (filters.color) {
      updatedProducts = updatedProducts.filter((product) =>
        product.variants.some((variant) => variant.color === filters.color),
      );
    }

    // Filter by size
    if (filters.size) {
      updatedProducts = updatedProducts.filter((product) =>
        product.sizes.some((size) => size.size === filters.size),
      );
    }

    // Sort products
    if (filters.sortBy === "date") {
      updatedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (filters.sortBy === "price") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(updatedProducts);
  }, [filters, products]);

  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Boutique - Découvrez Nos Produits
      </h1>

      {/* Filter and Sorting Options */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <FilterBar
          sizes={sizes} // Pass sizes to FilterBar
          colors={colors} // Pass colors to FilterBar
          categories={categories}
          onFilterChange={(filterKey, value) =>
            setFilters((prev) => ({ ...prev, [filterKey]: value }))
          }
        />
        <SortingOptions
          onSortChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
        />
      </div>

      {/* Responsive Grid of Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aucun produit ne correspond à vos critères.
          </p>
        )}
      </div>
    </div>
  );
};

export default BoutiquePage;
