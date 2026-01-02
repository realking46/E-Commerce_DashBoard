export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/prisma";
import DashboardUI from "@/app/dashboard/DashboardUI";
import ProductChart from "./ProductChart";

export default async function DashboardPage() {
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    return null;
  }
  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
    <DashboardUI products={products} />
    <div className="space-y-6">
      <ProductChart products={products} />
    </div>
    </>
  );
}
