"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  User,
  Package,
  Heart,
  LogOut,
  Settings,
  ChevronDown,
  Headphones,
  Watch,
  Laptop,
  Gamepad2,
  Smartphone,
  Home as HomeIcon,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface Category {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/items", hasDropdown: true },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

const CATEGORIES: Category[] = [
  { label: "Audio",       href: "/items?cat=audio",      icon: <Headphones size={15} /> },
  { label: "Wearables",  href: "/items?cat=wearables",  icon: <Watch       size={15} /> },
  { label: "Computing",  href: "/items?cat=computing",  icon: <Laptop      size={15} /> },
  { label: "Gaming",     href: "/items?cat=gaming",     icon: <Gamepad2    size={15} /> },
  { label: "Mobile",     href: "/items?cat=mobile",     icon: <Smartphone  size={15} /> },
  { label: "Smart Home", href: "/items?cat=smarthome",  icon: <HomeIcon    size={15} /> },
];

const CART_COUNT = 3; // Replace with real cart state

/* ─── Sub-components ─────────────────────────────────────────────────── */

/** Nex_Cart wordmark */
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-0.5 select-none shrink-0"
      aria-label="Nex_Cart home"
    >
      <span
        className="font-head font-extrabold text-[22px] tracking-tight text-ink"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Nex
      </span>
      <span
        className="font-head font-extrabold text-[22px] tracking-tight text-accent"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        _
      </span>
      <span
        className="font-head font-extrabold text-[22px] tracking-tight text-ink"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Cart
      </span>
    </Link>
  );
}

/** A single nav link, active-aware */
function NavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive =
    link.href === "/"
      ? pathname === "/"
      : pathname.startsWith(link.href);

  const baseClass =
    "inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer";
  const activeClass = "text-ink bg-surface-3";
  const inactiveClass = "text-ink-3 hover:text-ink hover:bg-surface-3";

  if (link.hasDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id="shop-dropdown-trigger"
            className={cn(baseClass, isActive ? activeClass : inactiveClass, "outline-none")}
          >
            {link.label}
            <ChevronDown
              size={14}
              className="mt-0.5 transition-transform duration-200 [[data-state=open]_&]:rotate-180"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          id="shop-dropdown-menu"
          align="start"
          sideOffset={8}
          className={cn(
            "w-52 rounded-xl border border-surface-3 bg-white p-1.5 shadow-card",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "origin-top-left"
          )}
        >
          {CATEGORIES.map((cat) => (
            <DropdownMenuItem key={cat.label} asChild>
              <Link
                href={cat.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink-2 hover:bg-surface-2 hover:text-ink cursor-pointer transition-colors duration-100"
              >
                <span className="text-accent">{cat.icon}</span>
                {cat.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={link.href}
      className={cn(baseClass, isActive ? activeClass : inactiveClass)}
    >
      {link.label}
    </Link>
  );
}

/** Cart icon button with badge */
function CartButton() {
  return (
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
  );
}

/** User avatar dropdown */
function UserMenu() {
  const menuItems = [
    { id: "profile",         label: "My Profile",       icon: <User      size={14} />, href: "/profile"       },
    { id: "orders",          label: "My Orders",        icon: <Package   size={14} />, href: "/orders"        },
    { id: "wishlist",        label: "Wishlist",         icon: <Heart     size={14} />, href: "/wishlist"      },
    { id: "manage-products", label: "Manage Products",  icon: <Settings  size={14} />, href: "/items/manage"  },
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
          "origin-top-right"
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

/** Mobile slide-in Sheet */
function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          id="mobile-menu-trigger"
          aria-label="Open navigation menu"
          className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md bg-surface-3 hover:bg-surface-3/80 transition-colors duration-150"
        >
          <Menu size={18} className="text-ink-2" />
        </button>
      </SheetTrigger>

      <SheetContent
        id="mobile-nav-sheet"
        side="right"
        className="w-[300px] bg-white border-l border-surface-3 p-0 flex flex-col"
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-3 transition-colors"
          >
            <X size={16} className="text-ink-3" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-ink bg-surface-3"
                      : "text-ink-2 hover:text-ink hover:bg-surface-2"
                  )}
                >
                  {link.label}
                </Link>

                {/* Category sub-list for Shop */}
                {link.hasDropdown && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-lg text-[13px] text-ink-3 hover:text-ink hover:bg-surface-2 transition-colors duration-100"
                      >
                        <span className="text-accent">{cat.icon}</span>
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Auth footer */}
        <div className="px-4 py-4 border-t border-surface-3 space-y-2">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block w-full text-center py-2.5 rounded-full text-sm font-medium text-ink-2 border border-surface-3 hover:bg-surface-2 transition-colors duration-150"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="block w-full text-center py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-hover transition-colors duration-150"
            style={{ background: "var(--gradient-accent)" } as React.CSSProperties}
          >
            Get Started
          </Link>
        </div>
      </SheetContent>
    </Sheet>
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
        /* Layout */
        "fixed top-0 inset-x-0 z-50 h-16",
        /* Glassmorphism base */
        "bg-white/90 backdrop-blur-xl border-b border-white/20",
        /* Mount animation */
        "transition-[opacity,transform,box-shadow] duration-300 ease-out",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        /* Scroll-dependent shadow */
        scrolled ? "shadow-card" : "shadow-none"
      )}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* ── Left: Logo ──────────────────────────────────────────── */}
        <Logo />

        {/* ── Center: Desktop nav ─────────────────────────────────── */}
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
          <CartButton />
          <UserMenu />
          <MobileNav pathname={pathname} />
        </div>

      </div>
    </header>
  );
}
