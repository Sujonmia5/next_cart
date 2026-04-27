import Link from "next/link";
import {
  Package,
  Heart,
  LogOut,
  Settings,
  LayoutDashboard,
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
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/** User avatar dropdown */

export default function UserMenu() {
  const { user, logout } = useAuth();

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0].toUpperCase() || "U";
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={14} />,
      href: "/dashboard",
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
    <>
      {!user || !user?.email ? (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id="user-avatar-trigger"
              aria-label="User menu"
              className="outline-none rounded-full ring-offset-white focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <Avatar className="w-9 h-9 hover:ring-2 hover:ring-accent/30 transition-all duration-150 cursor-pointer">
                {user?.photoURL ? (
                  <Image
                    width={50}
                    height={50}
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback className="bg-accent text-white text-xs font-bold select-none">
                    {initials}
                  </AvatarFallback>
                )}
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
              <p className="text-xs font-semibold text-ink">
                {user?.displayName || "User"}
              </p>
              <p className="text-[11px] text-ink-4">{user?.email}</p>
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
                onClick={() => logout()}
                id="user-menu-signout"
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-100"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
