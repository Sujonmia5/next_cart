"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NexForm from "@/components/nex_form/NexForm";
import NexInput from "@/components/nex_form/NexInput";
import { registerSchema } from "@/validators/auth.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setError("");
    try {
      await register(data.email, data.password, data.name);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today! It only takes a minute.
          </p>
        </div>

        <NexForm onSubmit={onSubmit} schema={registerSchema}>
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-100">
              {error}
            </div>
          )}

          <NexInput
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />

          <NexInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            required
          />

          <NexInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01]"
          >
            Create Account
          </button>
        </NexForm>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
