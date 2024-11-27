import { DataTable } from "@/components/ui/data-tables";
import { getAllProducts } from "@/lib/actions/product.actions";
import { ProductColumns } from "../product-column";

const ProductPage = async () => {
  const products = await getAllProducts();

  // Transform the products data to match the expected format

  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    images: product.images.map((image) => ({
      id: image.id,
      imageUrl: image.imageUrl,
      productId: image.productId,
    })),
    featured: product.isFeatured,
    orders: product.orders.map((orderProduct) => ({
      id: orderProduct.id,
      createdAt: orderProduct.order?.createdAt || new Date(),
      updatedAt: orderProduct.order?.updatedAt || new Date(),
      status: orderProduct.order?.status || "Pending",
      customerId: orderProduct.order?.customerId || "Unknown",
      total: orderProduct.order?.total || 0,
    })),
    variants: product.variants,
    category: {
      id: product.category.id,
      name: product.category.name,
    },
    createdAt: product.createdAt,
  }));
  return (
    <div className="w-full">
      <DataTable
        columns={ProductColumns}
        message="No Product."
        data={formattedProducts}
      />
    </div>
  );
};

export default ProductPage;
