"use client";

import { useState } from "react";
import AddProductForm from "./AddProductForm";
import DeleteButton from "./DeleteButton";
import EditProductForm from "./EditProductForm";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
};

export default function DashboardUI({ products }: { products: Product[] }) {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);


  return (
    <div className="min-h-screen bg-slate-900 -50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Dashboard</h1>
        <p className="text-gray-500 mt-1">
            Manage products, pricing, and stock
        </p>
      </div>

      <AddProductForm />

      <ul className="space-y-1">
        {products.map((p) => (
            <li key={p.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition">

            <div className="flex gap-4 items-start text-gray-900 p-2">
                {/* IMAGE */}
                <img
                    src={p.imageUrl || "/placeholder.png"}
                    alt={p.name}
                    className="h-20 w-20 rounded-lg object-cover border"
                />

                {/* INFO */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold">{p.name}</h2>
                        <p className="text-sm text-gray-500">
                        {p.description || "No description"}
                        </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2">
                        <button
                        onClick={() =>
                            setEditingProductId(
                            editingProductId === p.id ? null : p.id
                            )
                        }
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
                        >
                        {editingProductId === p.id ? "Close" : "Edit"}
                        </button>

                        <DeleteButton id={p.id} />
                    </div>
                    </div>

                    {/* META */}
                    <div className="mt-2 flex gap-6 text-sm text-gray-600">
                    <span>₹{p.price}</span>
                    <span>Stock: {p.stock}</span>
                    </div>
                </div>
                </div>

            {editingProductId === p.id && (
            <div className="mt-4 bg-gray-50 border rounded-lg p-4">
                <EditProductForm
                product={p}
                onClose={() => setEditingProductId(null)}
                />
            </div>
            )}

            </li>
        ))}
        </ul>
    </div>
    </div>
  );
}
