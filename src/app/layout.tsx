import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import { Toaster } from "@/components/ui/sonner";

/* ── Nex_Cart Fonts ──────────────────────────────────────────────────── */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

/* ── Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Nex_Cart — Premium Shopping Experience",
    template: "%s | Nex_Cart",
  },
  description:
    "Nex_Cart — the modern, premium e-commerce platform built for speed and style.",
};

/* ── Root Layout ─────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, syne.variable, "font-sans")}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
