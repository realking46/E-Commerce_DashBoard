export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/prisma";
import DashboardUI from "@/app/dashboard/DashboardUI";
import ProductChart from "./ProductChart";

export default async function DashboardPage() {
  let products = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error("Dashboard DB error:", error);
    return (
      <div className="p-6 text-red-500">
        Database connection failed.
      </div>
    );
  }

  return (
    <>
      <DashboardUI products={products} />
      <div className="space-y-6">
        <ProductChart products={products} />
      </div>
    </>
  );
}
