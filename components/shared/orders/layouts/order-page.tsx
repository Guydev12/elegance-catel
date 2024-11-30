import React from "react";
import ProductHeader from "../../products/product-header";
import { DataTable } from "@/components/ui/data-tables";
import prisma from "@/lib/prisma";
import { OrdersColumns } from "../order-columns";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
      customer: true,
    },
  });
  const formatted = orders.map((order) => ({
    id: order.id,
    status: order.status,
    address: order.customer.address,
    email: order.customer.email,
    phone: order.customer.phone,
    products: order.products
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: order.products.reduce((total, item) => {
      return total + Number(item.product.price);
    }, 0),
  }));
  return (
    <main>
      <ProductHeader />
      <DataTable
        message="No Orders yet."
        data={formatted}
        columns={OrdersColumns}
      />
    </main>
  );
};

export default OrdersPage;
