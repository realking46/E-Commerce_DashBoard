"use client";

import { useEffect, useState } from "react";
import { updateProduct } from "@/app/dashboard/actions";
// import { productSchema } from "./product.schema";


type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
};

type Props = {
  product: Product;
  onClose: () => void;
};

export default function EditProductForm({ product, onClose  }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  // const [imageKey, setImageKey] = useState<string | null>(product.imageKey);


  // 🔁 Load existing product data into form
  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setImageUrl(product.imageUrl || "");
  }, [product]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await updateProduct(product.id, {
      name,
      description,
      price,
      stock,
      imageUrl: imageUrl || "",
    });

    setLoading(false);
    setTimeout(onClose, 600);

  }

  const isUnchanged =
    name === product.name &&
    description === product.description &&
    price === product.price &&
    stock === product.stock &&
    imageUrl === (product.imageUrl || "");
  
  return (
    
    <form
      onSubmit={handleSubmit}
      className="space-y-2 animate-in fade-in slide-in-from-top-2 bg-gray-900 rounded-lg outline-black/1 mt-1 p-2 text-gray-50"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Edit Product</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-50 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="text-sm text-gray-600">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="text-sm text-gray-600">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="text-sm text-gray-600">Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setIsUploading(true);

              const data = new FormData();
              data.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
              });

              const result = await res.json();
              setImageUrl(result.url);

              setIsUploading(false);
            }}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      {/* IMAGE PREVIEW */}
      {imageUrl && (
        <div className="flex items-center gap-3 mt-2">
          <img
            src={imageUrl}
            alt="Preview"
            className="h-16 w-16 rounded-lg object-contain bg-white border"
          />
          <span className="text-xs text-gray-500">
            {isUploading ? "Uploading..." : "Current image"}
          </span>
        </div>
      )}


      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading || isUploading}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || isUnchanged}
          className="px-4 py-2 text-sm rounded-lg bg-black text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>

  );
}
