import ProductDetailPage from "@/components/shared/products/layouts/product-detail-page";
import { getProductById } from "@/lib/actions/product.actions";
import React from "react";
type ProductsProps = {
  params: Promise<{ slug: string }>;
};

const Productpage: React.FC<ProductsProps> = async ({ params }) => {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.slug);
  if (!product)
    return (
      <div className="flex w-full items-center justify-center">
        {" "}
        <h1>Product with ID: {resolvedParams.slug} not found </h1>
      </div>
    );

  const formatted = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,

    images: product.images,
    isFeatured: product.isFeatured,
    sizes: product.sizes,
    variants: product.variants,
  };
  return (
    <div>
      <ProductDetailPage product={formatted} />
    </div>
  );
};

export default Productpage;
