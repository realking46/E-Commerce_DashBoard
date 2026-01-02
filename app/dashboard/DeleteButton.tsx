"use client";

import { deleteProduct } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => deleteProduct(id)}
      className="text-red-600"
    >
      Delete
    </button>
  );
}
