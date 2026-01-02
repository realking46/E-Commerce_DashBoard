"use client";

import { createProduct } from "./actions";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  type FieldErrors = Record<string, string>;
  const [errors, setErrors] = useState<FieldErrors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setErrors({});
        setSuccess(null);

        const res = await createProduct({
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          imageUrl, // ✅ URL from S3
        });

        if (res?.errors) {
          setErrors(res.errors);
          setIsSubmitting(false);
          return;
        }

        // ✅ SUCCESS
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setImageUrl("");

        setSuccess("Product added");
        setTimeout(() => setSuccess(null), 2000);

        // ✅ Force client refresh
        router.refresh();
        setIsSubmitting(false);
      }}

      className="space-y-4 border rounded-xl p-5 bg-white shadow-sm text-slate-800"
      >
      <h2 className="text-slate-800 font-semibold">Add New Product</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-900">
        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Product Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="text-sm text-gray-600">Price (₹)</label>
          <input
            name="price"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
          {errors.price && (
            <p className="text-xs text-red-600">{errors.price}</p>
          )}
        </div>

        {/* STOCK */}
        <div>
          <label className="text-sm text-gray-600">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
          {errors.stock && (
            <p className="text-xs text-red-600">{errors.stock}</p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Product Image
          </label>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const data = new FormData();
              data.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
              });

              const result = await res.json();
              setImageUrl(result.url);
            }}
            className="hidden"
          />

          {/* Button */}
          <div className="mt-1 w-full border rounded-lg  text-sm" >
          <label
            htmlFor="image-upload"
            className="inline-flex cursor-pointer items-center rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-gray-200"
          >
            Upload Image
          </label>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
        />
        {errors.description && (
          <p className="text-xs text-red-600">{errors.description}</p>
        )}
      </div>

      {/* IMAGE PREVIEW */}
      {imageUrl && (
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt="Preview"
            className="h-16 w-16 rounded-lg object-cover border"
          />
          <span className="text-sm text-gray-500">Image preview</span>
        </div>
      )}

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-5 py-2 rounded-lg text-sm text-white transition
            ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:opacity-90"}
          `}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}
    </form>
  );
}
