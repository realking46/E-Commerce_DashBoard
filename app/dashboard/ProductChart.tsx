"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Product = {
  id: string;
  name: string;
  stock: number;
};

export default function ProductChart({ products }: { products: Product[] }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">
        Stock Overview
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#000000" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
