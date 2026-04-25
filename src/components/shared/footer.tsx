import Link from "next/link";

/* ─── Data ────────── */
const SOCIAL = [
  { label: "X / Twitter", icon: "𝕏", href: "https://twitter.com" },
  { label: "Instagram", icon: "📸", href: "https://instagram.com" },
  { label: "Facebook", icon: "f", href: "https://facebook.com" },
  { label: "YouTube", icon: "▶", href: "https://youtube.com" },
];

const LINK_COLS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/items" },
      { label: "New Arrivals", href: "/items?sort=new" },
      { label: "Best Sellers", href: "/items?sort=top" },
      { label: "Deals & Offers", href: "/deals" },
      { label: "Categories", href: "/items#categories" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Track Order", href: "/orders" },
      { label: "Returns", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const PAYMENT_METHODS = ["VISA", "MC", "PayPal", "Apple Pay"];

/* ─── Footer ─────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      aria-label="Site footer"
      className="bg-ink pt-16 pb-8 text-white"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Top grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1 — Brand (spans 2 on lg) */}
          <div className="md:col-span-1 lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Nex_Cart home"
              className="inline-flex items-baseline gap-0 select-none"
            >
              <span
                className="font-head font-extrabold text-2xl tracking-tight text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Nex
              </span>
              <span
                className="font-head font-extrabold text-2xl tracking-tight text-accent"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                _
              </span>
              <span
                className="font-head font-extrabold text-2xl tracking-tight text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Cart
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-white/40 leading-relaxed mt-3 mb-5 max-w-[260px]">
              Your one-stop shop for premium tech and everyday essentials. Fast
              delivery, easy returns, honest prices.
            </p>

            {/* Social buttons */}
            <div
              className="flex items-center gap-2.5"
              aria-label="Social media links"
            >
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  id={`footer-social-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="w-9 h-9 rounded-lg bg-white/[0.08] border border-white/10
                             flex items-center justify-center text-sm text-white/60
                             hover:bg-accent hover:border-accent hover:text-white
                             transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2-4 — Link columns */}
          {LINK_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-bold uppercase tracking-widest text-white/40 mb-4">
                {col.title}
              </p>
              <nav aria-label={`${col.title} links`}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    id={`footer-link-${link.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    className="block text-sm text-white/40 hover:text-white
                               transition-colors duration-150 mb-2.5 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div
          className="border-t border-white/[0.08] pt-7
                     flex items-center justify-between flex-wrap gap-4"
        >
          {/* Copyright */}
          <p className="text-[13px] text-white/25">
            © {year} Nex_Cart. All rights reserved.
          </p>

          {/* Payment badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[12px] text-white/25 mr-1">We accept:</span>
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="bg-white/[0.08] rounded-md px-2.5 py-1
                           text-[11px] font-semibold text-white/40"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
