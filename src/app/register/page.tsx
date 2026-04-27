/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createUser } from "@/server-actions/createUser";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      await loginWithGoogle();
      setShowSuccess(true);
      toast.success("Logged in with Google!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Google login failed");
      setIsLoading(false);
    }
  };

  // Password strength logic
  const getPasswordStrength = () => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 6) score = 2; // Weak
    if (password.length >= 8 && /[A-Z]/.test(password)) score = 3; // Medium
    if (
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      score = 4; // Strong
    }
    return score;
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (strength < 2) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      
      // 1. Create in Firebase
      await register(email, password, fullName);
      
      // 2. Create in our Database
      const dbResult = await createUser({
        name: fullName,
        email,
        password,
      });

      if (!dbResult.success) {
        throw new Error(dbResult.message || "Failed to save user in database");
      }

      setShowSuccess(true);
      toast.success("Account created successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to register");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-surface-2 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-3xl pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/[0.06] blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4" />

      {/* Auth card */}
      <div className="bg-white rounded-3xl border border-surface-3 p-8 sm:p-11 w-full max-w-[440px] relative z-10 shadow-lg my-12">
        {/* LOGO */}
        <div className="text-center mb-7 select-none">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image 
              src="/nex_cart_logo.png" 
              alt="Nex_Cart" 
              width={32} 
              height={32} 
              className="w-8 h-8 object-contain"
            />
            <span className="font-head font-extrabold text-[26px] tracking-tight text-ink">
              Nex_Cart
            </span>
          </Link>
          <p className="text-sm text-ink-4 mt-1">
            Join us today! It only takes a minute.
          </p>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2.5 w-full py-3 border border-surface-3 rounded-xl text-sm font-medium text-ink hover:bg-surface-2 hover:border-ink-4 transition-all"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Continue with Google
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-surface-3" />
          <span className="text-xs text-ink-4 font-medium uppercase tracking-wider">
            Or
          </span>
          <div className="flex-1 h-px bg-surface-3" />
        </div>

        {/* FORM FIELDS */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="text-[13px] font-semibold text-ink-2 mb-1.5 block"
              >
                First Name
              </label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
                className="bg-surface-2 border border-surface-3 rounded-xl px-3.5 py-3 text-sm focus:border-accent focus:ring-2 focus:ring-accent/10 h-11"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-[13px] font-semibold text-ink-2 mb-1.5 block"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
                className="bg-surface-2 border border-surface-3 rounded-xl px-3.5 py-3 text-sm focus:border-accent focus:ring-2 focus:ring-accent/10 h-11"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-[13px] font-semibold text-ink-2 mb-1.5 block"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="bg-surface-2 border border-surface-3 rounded-xl px-3.5 py-3 text-sm focus:border-accent focus:ring-2 focus:ring-accent/10 h-11"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-[13px] font-semibold text-ink-2 mb-1.5 block"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-surface-2 border border-surface-3 rounded-xl px-3.5 py-3 text-sm focus:border-accent focus:ring-2 focus:ring-accent/10 h-11"
            />
            {/* Password Strength Bars */}
            <div className="mt-1.5 flex gap-1">
              {[1, 2, 3, 4].map((index) => {
                let bgColor = "bg-surface-3"; // default
                if (strength > 0) {
                  if (strength === 2 && index <= 2) bgColor = "bg-red-500";
                  if (strength === 3 && index <= 3) bgColor = "bg-amber-500";
                  if (strength === 4 && index <= 4) bgColor = "bg-green-500";
                }
                return (
                  <div
                    key={index}
                    className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${bgColor}`}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-[13px] font-semibold text-ink-2 mb-1.5 block"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-surface-2 border border-surface-3 rounded-xl px-3.5 py-3 text-sm focus:border-accent focus:ring-2 focus:ring-accent/10 h-11"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading || showSuccess}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-[15px] bg-accent hover:bg-accent-hover text-white shadow-accent transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : showSuccess ? (
              <CheckCircle2 size={18} />
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        {/* FOOTER LINK */}
        <div className="text-center mt-6">
          <p className="text-sm text-ink-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
