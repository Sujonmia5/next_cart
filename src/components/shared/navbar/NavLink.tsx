import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export interface NavLink {
  label: string;
  href: string;
}

/** A single nav link, active-aware */
const NavItem = ({
  link,
  pathname,
  isMobileOnly,
  setOpen,
}: {
  link: NavLink;
  pathname: string;
  isMobileOnly?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const isActive =
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

  const baseClass =
    "inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer";
  const activeClass = "text-ink bg-surface-3";
  const inactiveClass = "text-ink-3 hover:text-ink hover:bg-surface-3";

  if (isMobileOnly) {
    return (
      <div key={link.label}>
        <Link
          href={link.href}
          onClick={() => setOpen?.(false)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
            isActive
              ? "text-ink bg-surface-3"
              : "text-ink-2 hover:text-ink hover:bg-surface-2",
          )}
        >
          {link.label}
        </Link>
      </div>
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
};

export default NavItem;
