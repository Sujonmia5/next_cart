"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import NavItem from "./NavLink";
import NavLogo from "./NavLogo";
import MobileNav from "./mobileNav";
import { NAV_LINKS } from "./constents";
import { useCart } from "@/providers/CartProvider";
import { CartModal } from "../cart/CartModal";
import UserMenu from "./UserMenu";

/* ─── Main Navbar ────────────────────────────────────────────────────── */
export default function Navbar() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* Mount animation trigger */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      role="banner"
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-16",
        "bg-white/90 backdrop-blur-xl border-b border-white/20",
        "transition-[opacity,transform,box-shadow] duration-300 ease-out",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        scrolled ? "shadow-card" : "shadow-none",
      )}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <NavLogo />

        {/* ── Center: Desktop n─── */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavItem key={link.label} link={link} pathname={pathname} />
          ))}
        </nav>

        {/* ── Right: Actions ──────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsCartOpen(true)}
              id="cart-icon-button"
              aria-label={`Cart — ${cartCount} items`}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-md bg-surface-3 border border-surface-3 hover:bg-surface-3/80 transition-colors duration-150"
            >
              <ShoppingCart size={18} className="text-ink-2" />
              {cartCount > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-warm text-white font-bold leading-none"
                  style={{ fontSize: "9px" }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <CartModal
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </div>
          {<UserMenu />}
        </div>
        {/* Mobile Navigation */}
        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
