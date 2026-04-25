import Link from "next/link";

function NavLogo() {
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

export default NavLogo;
