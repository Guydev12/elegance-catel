import EditProductForm from "@/components/shared/products/product-edit-form";
import { getAllCategories } from "@/lib/actions/categorie.actians";
import { getProductById } from "@/lib/actions/product.actions";
import { FC } from "react";

type EditProductsProps = {
  params: Promise<{ slug: string }>;
};

const EditProducts: FC<EditProductsProps> = async ({ params }) => {
  const categories = await getAllCategories();
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
  return <EditProductForm product={formatted} categoryOptions={categories} />;
};

export default EditProducts;
