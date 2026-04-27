import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const path = req.nextUrl.pathname;

  // Protect all dashboard routes
  if (!token && (path === "/dashboard" || path.startsWith("/dashboard/"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from accessing login/register
  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// কোন route-এ apply হবে
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/dashboard/items/manage",
    "/dashboard/items/add",
    "/dashboard/items/manage",
    "/login",
    "/register",
    "/api/users",
  ],
};
