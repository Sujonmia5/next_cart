"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  Package,
  Heart,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import NavItem from "./NavLink";
import NavLogo from "./NavLogo";
import MobileNav from "./mobileNav";
import { NAV_LINKS } from "./constents";

const CART_COUNT = 3;

/** User avatar dropdown */
function UserMenu() {
  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <User size={14} />,
      href: "/profile",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: <Package size={14} />,
      href: "/orders",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <Heart size={14} />,
      href: "/wishlist",
    },
    {
      id: "manage-products",
      label: "Manage Products",
      icon: <Settings size={14} />,
      href: "/items/manage",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id="user-avatar-trigger"
          aria-label="User menu"
          className="outline-none rounded-full ring-offset-white focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <Avatar className="w-9 h-9 hover:ring-2 hover:ring-accent/30 transition-all duration-150 cursor-pointer">
            <AvatarFallback className="bg-accent text-white text-xs font-bold select-none">
              JD
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        id="user-dropdown-menu"
        align="end"
        sideOffset={10}
        className={cn(
          "w-52 rounded-xl border border-surface-3 bg-white p-1.5 shadow-card",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "origin-top-right",
        )}
      >
        {/* Profile header */}
        <div className="px-3 py-2.5 mb-1 border-b border-surface-3">
          <p className="text-xs font-semibold text-ink">John Doe</p>
          <p className="text-[11px] text-ink-4">john@example.com</p>
        </div>

        {menuItems.map((item) => (
          <DropdownMenuItem key={item.id} asChild>
            <Link
              id={`user-menu-${item.id}`}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink-2 hover:bg-surface-2 hover:text-ink cursor-pointer transition-colors duration-100"
            >
              <span className="text-ink-3">{item.icon}</span>
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1 bg-surface-3" />

        <DropdownMenuItem asChild>
          <button
            id="user-menu-signout"
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-100"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────── */
export default function Navbar() {
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
        <div className="flex items-center gap-2.5">
          <>
            <Link
              href="/cart"
              id="cart-icon-button"
              aria-label={`Cart — ${CART_COUNT} items`}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-md bg-surface-3 border border-surface-3 hover:bg-surface-3/80 transition-colors duration-150"
            >
              <ShoppingCart size={18} className="text-ink-2" />
              {CART_COUNT > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-warm text-white font-bold leading-none"
                  style={{ fontSize: "9px" }}
                >
                  {CART_COUNT > 9 ? "9+" : CART_COUNT}
                </span>
              )}
            </Link>
          </>
          <UserMenu />
          {/* Mobile Navigation */}
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
