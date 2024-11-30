import { ChartAnalytics } from "@/components/shared/Dashboard/ChartOverview";
import Overview from "@/components/shared/Overview";
import prisma from "@/lib/prisma";

const page = async () => {
  const orders = await prisma.order.findMany({ include: { customer: true } });
  const products = await prisma.product.findMany();

  return (
    <div>
      <ChartAnalytics />
      <Overview orders={orders} Products={products} />
    </div>
  );
};

export default page;
