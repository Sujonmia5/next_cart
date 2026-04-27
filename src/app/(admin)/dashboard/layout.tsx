"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  Settings,
  Users,
  ShoppingCart,
  BarChart3,
  ChevronRight,
  Bell,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Nav item types
interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Add Product",
    href: "/dashboard/items/add",
    icon: <PackagePlus size={18} />,
  },
  {
    label: "Manage Products",
    href: "/dashboard/items/manage",
    icon: <Package size={18} />,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart size={18} />,
    badge: 5,
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: <Users size={18} />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 size={18} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

// ─── Sidebar Component ────────────────────────────────────────────────────────
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 flex flex-col
          bg-[#0f1117] border-r border-white/[0.06]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <Link
            href="/"
            className="flex items-center gap-2 select-none"
            aria-label="Nex_Cart home"
          >
            <Image
              src="/nex_cart_logo.png"
              alt="Nex_Cart"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="font-extrabold text-[20px] tracking-tight text-white">
              Nex_Cart
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Role badge */}
        <div className="mx-4 mt-4 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <p className="text-[11px] font-semibold text-violet-400 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {SIDEBAR_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                      : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                  }
                `}
              >
                <span
                  className={`shrink-0 transition-colors ${active ? "text-white" : "text-white/40 group-hover:text-white/80"}`}
                >
                  {link.icon}
                </span>
                <span className="flex-1">{link.label}</span>
                {link.badge !== undefined && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white">
                    {link.badge}
                  </span>
                )}
                {active && (
                  <ChevronRight
                    size={14}
                    className="ml-auto shrink-0 text-white/60"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user info */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold shrink-0 uppercase">
              {user?.displayName
                ? user.displayName[0]
                : user?.email
                  ? user.email[0]
                  : "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.displayName || "Admin"}
              </p>
              <p className="text-[11px] text-white/40 truncate">
                {user?.email || "admin@nexcart.com"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto shrink-0 text-white/30 hover:text-rose-400 transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Top Header
function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const currentPage =
    SIDEBAR_LINKS.find((l) =>
      l.href === "/dashboard"
        ? pathname === l.href
        : pathname.startsWith(l.href),
    )?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 h-16 bg-[#0a0b0f]/80 backdrop-blur-md border-b border-white/[0.06]">
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-white/60 hover:text-white transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Page title */}
      <h1 className="text-base font-semibold text-white">{currentPage}</h1>

      {/* Breadcrumb */}
      <div className="hidden md:flex items-center gap-1 text-xs text-white/30 ml-1">
        <span>Dashboard</span>
        {currentPage !== "Overview" && (
          <>
            <ChevronRight size={12} />
            <span className="text-white/60">{currentPage}</span>
          </>
        )}
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        <button className="relative text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/[0.06]">
          <Bell size={18} />
          <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0a0b0f]" />
        </button>
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-violet-400 transition-colors"
        >
          View Store
          <ChevronRight size={12} />
        </Link>
      </div>
    </header>
  );
}

// ─── Dashboard Layout ─────────────────────────────────────────────────────────
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0b0f] overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
