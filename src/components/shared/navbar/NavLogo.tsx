import Image from "next/image";
import Link from "next/link";

function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 select-none shrink-0"
      aria-label="Nex_Cart home"
    >
      <Image
        src="/nex_cart_logo.png"
        alt="Nex_Cart Logo"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
      <span
        className="font-head font-extrabold text-[22px] tracking-tight text-ink"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Nex_Cart
      </span>
    </Link>
  );
}

export default NavLogo;
