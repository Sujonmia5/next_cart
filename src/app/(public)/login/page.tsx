"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NexForm from "@/components/nex_form/NexForm";
import NexInput from "@/components/nex_form/NexInput";
import { loginSchema } from "@/validators/auth.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setError("");
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <NexForm onSubmit={onSubmit} schema={loginSchema}>
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-100">
              {error}
            </div>
          )}

          <NexInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
          />

          <NexInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01]"
          >
            Sign In
          </button>
        </NexForm>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
