import { prisma } from "@/lib/prisma";
import DashboardUI from "@/app/dashboard/DashboardUI";
import ProductChart from "./ProductChart";

export default async function DashboardPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });

  // return <DashboardUI products={products} />;
  return (
    <>
    <DashboardUI products={products} />
    <div className="space-y-6">
      {/* Chart */}
      <ProductChart products={products} />

      {/* Existing product table/list below */}
    </div>
    </>
  );
}
