import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavItem from "./NavLink";
import Link from "next/link";
import NavLogo from "./NavLogo";
import { NAV_LINKS } from "./constents";

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
          <NavLogo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-3 transition-colors"
          >
            {/* <X size={16} className="text-ink-3" /> */}
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              pathname={pathname}
              isMobileOnly={true}
              setOpen={setOpen}
            />
          ))}
        </nav>

        {/* Nav Footer Links */}
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
            style={
              { background: "var(--gradient-accent)" } as React.CSSProperties
            }
          >
            Get Started
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default MobileNav;
