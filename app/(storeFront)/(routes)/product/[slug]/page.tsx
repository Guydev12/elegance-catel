
import { FC } from "react";
import ProductDetailPage from "../_components/product-detail-page";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

const ProductDetail: FC<ProductDetailProps> = async ({ params }) => {
  const resolvedParams = await params;
  return <div className="min-w-screen"><ProductDetailPage productId={resolvedParams.slug} /></div>;
};

export default ProductDetail;

