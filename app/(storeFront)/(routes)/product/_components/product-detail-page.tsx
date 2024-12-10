import ProductCard from "@/components/shared/store/custom-product-card";
import {
  ProductMdGallery,
  ProductMobileGallery,
} from "@/components/shared/store/product-gallery";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/actions/product.actions";
import prisma from "@/lib/prisma";
import React, { FC } from "react";
import ButtonAddCart from "./button-add-cart";

type ProductDetailPageProps = {
  productId: string;
};
const ProductDetailPage: FC<ProductDetailPageProps> = async ({ productId }) => {
  const product = await getProductById(productId);
  const suggestedProduct = await prisma.product.findMany({
    where: { categoryId: product?.categoryId },
    include: {
      category: true,
      images: true,
      variants: true,
      sizes: true,
      orders: {
        include: {
          order: true,
        },
      },
    },
  });

  const price = product?.price ?? 0; // Default to 0 if undefined
  const priceArr = price.toString().split(".");
  const basePrice = priceArr[0];
  const afterPrice = priceArr[1] ?? "00"; // Ensure fractional part exists
  if (!product) return <div>Pas De Product</div>;
  return (
    <div className="flex w-full m-4 flex-col space-y-8 py-4 gap-4">
      <div className="w-full grid md:grid-cols-2 grid-cols-1">
        {/* Product Gallery */}
        <ProductMdGallery images={product?.images} />
        <ProductMobileGallery images={product?.images} />

        {/* Product Info */}
        <div className="flex flex-col p-4 space-y-4 text-left">
          <div className="flex flex-row items-baseline">
            <p className="text-[40px] relative w-[70px]">
              <strong>{basePrice}</strong>
              <span className="absolute top-0 text-[20px] -right-4">
                {afterPrice}
              </span>
            </p>
            <span>€</span>
          </div>
          <h1 className="font-medium">{product?.name}</h1>
          <p>{product?.description}</p>
          {product?.stock > 0 ? (
            <p className="font-bold text-green-700 text-left">En Stock</p>
          ) : (
            <p className="font-bold text-red-700 text-left">Indisponible</p>
          )}

          {/* Variants */}
          <div className="space-y-2">
            <h2 className="font-bold text-left">Variants:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product?.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="border p-2 rounded shadow hover:shadow-lg"
                >
                  <p className="font-medium">Color: {variant.color}</p>
                  <p>Price: {variant.price} €</p>
                  <p>Stock: {variant.stock}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <h2 className="font-bold text-left">Sizes:</h2>
            <div className="flex flex-wrap gap-2">
              {product?.sizes.map((size) => (
                <span
                  key={size.id}
                  className="border px-4 py-2 rounded-md bg-gray-100 shadow-sm"
                >
                  {size.size}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 px-2 mx-0 -ml-4 ">
            <ButtonAddCart product={product} />
            <Button className="w-full bg-pink-300 font-bold">
              Acheter cet article
            </Button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <h2 className="font-bold text-left">Recommendation</h2>
      <div className="w-full grid gap-2 items-center justify-center  md:grid-cols-2 lg:grid-cols-3">
        {suggestedProduct.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
