"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const runtime = "nodejs";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email === "admin@demo.com" && password === "admin123") {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-black">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">
              Password
            </label>
            <input
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-black"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-500">
          Demo Credentials <br />
          <b>admin@demo.com</b> / <b>admin123</b>
        </p>
      </div>
    </div>
  );
}
