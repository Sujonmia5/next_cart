"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Plus,
  Star,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/* ─── Types & Data ───────────────────────────────────────────────────── */
interface Product {
  id: string;
  emoji: string;
  category: string;
  name: string;
  price: string;
  oldPrice?: string;
  badge?: "New" | "Sale" | "Trending";
}

const PRODUCTS: Product[] = [
  {
    id: "wh-1000xm5",
    emoji: "🎧",
    category: "Audio",
    name: "Sony WH-1000XM5",
    price: "$349",
    oldPrice: "$429",
    badge: "Sale",
  },
  {
    id: "watch-ultra",
    emoji: "⌚",
    category: "Wearables",
    name: "Apple Watch Ultra 2",
    price: "$799",
    badge: "Trending",
  },
  {
    id: "macbook-air-m3",
    emoji: "💻",
    category: "Computing",
    name: "MacBook Air M3",
    price: "$1,099",
    oldPrice: "$1,299",
    badge: "Sale",
  },
  {
    id: "ps5-slim",
    emoji: "🎮",
    category: "Gaming",
    name: "PlayStation 5 Slim",
    price: "$449",
    badge: "New",
  },
  {
    id: "iphone-16-pro",
    emoji: "📱",
    category: "Mobile",
    name: "iPhone 16 Pro Max",
    price: "$1,199",
    badge: "New",
  },
  {
    id: "galaxy-buds3",
    emoji: "🎵",
    category: "Audio",
    name: "Samsung Galaxy Buds 3",
    price: "$179",
    oldPrice: "$229",
    badge: "Sale",
  },
  {
    id: "echo-show",
    emoji: "🏠",
    category: "Smart Home",
    name: "Amazon Echo Show 15",
    price: "$249",
    badge: "Trending",
  },
  {
    id: "mx-master",
    emoji: "🖱️",
    category: "Computing",
    name: "Logitech MX Master 3S",
    price: "$99",
    oldPrice: "$119",
  },
  {
    id: "ipad-pro",
    emoji: "📟",
    category: "Computing",
    name: "iPad Pro M4",
    price: "$999",
    badge: "New",
  },
];

const CATEGORIES = [
  "Audio",
  "Wearables",
  "Computing",
  "Gaming",
  "Mobile",
  "Smart Home",
];
const RATINGS = [5, 4, 3];
const BADGE_STYLES: Record<string, string> = {
  New: "bg-ink text-white",
  Sale: "bg-warm text-white",
  Trending: "bg-accent-light text-accent",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.07 },
  }),
};

function ProductCard({
  p,
  index,
  list,
}: {
  p: Product;
  index: number;
  list: boolean;
}) {
  const router = useRouter();
  const [wished, setWished] = useState(false);

  if (list)
    return (
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        onClick={() => router.push(`/items/${p.id}`)}
        className="group flex items-center gap-4 bg-white rounded-2xl border border-surface-3 p-4 cursor-pointer
                 hover:border-accent hover:shadow-accent transition-all duration-300"
      >
        <div
          className="w-20 h-20 shrink-0 bg-surface-3 rounded-xl flex items-center justify-center text-4xl
                      group-hover:bg-accent-light transition-colors duration-300 select-none"
        >
          {p.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4">
            {p.category}
          </p>
          <h3
            className="font-head text-sm font-semibold text-ink truncate mt-0.5"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {p.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="font-head text-base font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {p.price}
            </span>
            {p.oldPrice && (
              <span className="text-xs text-ink-4 line-through">
                {p.oldPrice}
              </span>
            )}
          </div>
        </div>
        {p.badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${BADGE_STYLES[p.badge]}`}
          >
            {p.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-9 h-9 shrink-0 bg-accent hover:bg-accent-hover rounded-[10px] text-white flex items-center justify-center
                   shadow-[0_4px_12px_rgba(91,79,255,0.3)] hover:scale-110 transition-all duration-200 active:scale-95"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </motion.div>
    );

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      onClick={() => router.push(`/items/${p.id}`)}
      className="group bg-white rounded-2xl border border-surface-3 overflow-hidden cursor-pointer
                 hover:border-accent hover:-translate-y-[5px] hover:shadow-accent transition-all duration-300"
    >
      <div className="aspect-square bg-surface-3 relative flex items-center justify-center">
        <span
          className="text-[68px] select-none group-hover:scale-110 group-hover:-rotate-[4deg] transition-transform duration-300 leading-none"
          aria-hidden
        >
          {p.emoji}
        </span>
        {p.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_STYLES[p.badge]}`}
          >
            {p.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm border transition-all duration-200
                      ${wished ? "bg-red-50 border-red-200" : "bg-white border-surface-3 hover:border-red-200"}`}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4 pb-[18px]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-1">
          {p.category}
        </p>
        <h3
          className="font-head text-[15px] font-semibold text-ink leading-tight mb-2.5 truncate"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {p.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0">
            <span
              className="font-head text-lg font-extrabold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {p.price}
            </span>
            {p.oldPrice && (
              <span className="text-xs text-ink-4 line-through ml-1.5">
                {p.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-[34px] h-[34px] bg-accent hover:bg-accent-hover rounded-[10px] text-white flex items-center justify-center
                       shadow-[0_4px_12px_rgba(91,79,255,0.3)] hover:scale-110 transition-all duration-200 active:scale-95"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FilterPanel({
  selectedCats,
  setSelectedCats,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  selectedRatings,
  setSelectedRatings,
  inStock,
  setInStock,
  preorder,
  setPreorder,
  onClear,
}: {
  selectedCats: string[];
  setSelectedCats: (v: string[]) => void;
  priceMin: string;
  setPriceMin: (v: string) => void;
  priceMax: string;
  setPriceMax: (v: string) => void;
  selectedRatings: number[];
  setSelectedRatings: (v: number[]) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  preorder: boolean;
  setPreorder: (v: boolean) => void;
  onClear: () => void;
}) {
  const toggleCat = (c: string) =>
    setSelectedCats(
      selectedCats.includes(c)
        ? selectedCats.filter((x) => x !== c)
        : [...selectedCats, c],
    );
  const toggleRating = (r: number) =>
    setSelectedRatings(
      selectedRatings.includes(r)
        ? selectedRatings.filter((x) => x !== r)
        : [...selectedRatings, r],
    );

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-base font-bold text-ink">Filters</span>
        <button
          onClick={onClear}
          className="text-xs text-accent hover:text-accent-hover cursor-pointer transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="mb-5 pb-5 border-b border-surface-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4 mb-3">
          Category
        </p>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCats.includes(cat)}
                onCheckedChange={() => toggleCat(cat)}
                className="w-4 h-4 rounded border-2 border-surface-3 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span className="text-sm text-ink-2 flex-1">{cat}</span>
              <span className="text-[11px] text-ink-4">
                {Math.floor(Math.random() * 80) + 20}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5 pb-5 border-b border-surface-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4 mb-3">
          Price Range
        </p>
        <div className="flex gap-2">
          <input
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="Min"
            className="w-full bg-surface-2 border border-surface-3 rounded-lg p-2 text-sm outline-none focus:border-accent transition-colors"
          />
          <input
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max"
            className="w-full bg-surface-2 border border-surface-3 rounded-lg p-2 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>
        <button className="w-full mt-2.5 py-2 rounded-full border border-accent text-accent text-sm font-medium hover:bg-accent-light transition-colors">
          Apply
        </button>
      </div>

      {/* Rating */}
      <div className="mb-5 pb-5 border-b border-surface-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4 mb-3">
          Rating
        </p>
        <div className="space-y-2.5">
          {RATINGS.map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox
                id={`rating-${r}`}
                checked={selectedRatings.includes(r)}
                onCheckedChange={() => toggleRating(r)}
                className="w-4 h-4 rounded border-2 border-surface-3 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span className="flex gap-0.5">
                {Array.from({ length: r }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
                {Array.from({ length: 5 - r }).map((_, i) => (
                  <Star key={i} size={12} className="text-ink-4" />
                ))}
              </span>
              <span className="text-sm text-ink-2">{r}+</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4 mb-3">
          Availability
        </p>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              id="avail-instock"
              checked={inStock}
              onCheckedChange={(v) => setInStock(!!v)}
              className="w-4 h-4 rounded border-2 border-surface-3 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <span className="text-sm text-ink-2">In Stock</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              id="avail-preorder"
              checked={preorder}
              onCheckedChange={(v) => setPreorder(!!v)}
              className="w-4 h-4 rounded border-2 border-surface-3 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <span className="text-sm text-ink-2">Pre-order</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStock, setInStock] = useState(false);
  const [preorder, setPreorder] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const clearAll = () => {
    setSelectedCats([]);
    setPriceMin("");
    setPriceMax("");
    setSelectedRatings([]);
    setInStock(false);
    setPreorder(false);
  };

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCats.length && !selectedCats.includes(p.category)) return false;
    if (submitted && !p.name.toLowerCase().includes(submitted.toLowerCase()))
      return false;
    return true;
  });

  const filterProps = {
    selectedCats,
    setSelectedCats,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedRatings,
    setSelectedRatings,
    inStock,
    setInStock,
    preorder,
    setPreorder,
    onClear: clearAll,
  };

  return (
    <main className="pt-[88px] pb-20 bg-surface-2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6">
          <h1
            className="font-head text-3xl font-extrabold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            All Products
          </h1>
          <p className="text-sm text-ink-3 mt-1">
            Discover our full collection of premium tech & lifestyle gear.
          </p>
        </div>

        {/* Search bar */}
        <div
          className={cn(
            "flex items-center gap-2.5 bg-white border rounded-full px-4 py-2.5 shadow-sm mb-7 transition-all duration-200",
            "border-surface-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10",
          )}
        >
          <Search size={16} className="text-ink-4 shrink-0" />
          <input
            id="shop-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSubmitted(query)}
            placeholder="Search products…"
            className="flex-1 border-none bg-transparent outline-none text-[15px] placeholder:text-ink-4 text-ink"
          />
          <button
            id="shop-search-btn"
            onClick={() => setSubmitted(query)}
            className="bg-accent hover:bg-accent-hover text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 active:scale-95 shrink-0"
          >
            Search
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-7 items-start">
          {/* ── Sidebar (desktop) ─── */}
          <aside className="hidden lg:block w-[260px] shrink-0 bg-white rounded-2xl border border-surface-3 p-[22px] sticky top-20">
            <FilterPanel {...filterProps} />
          </aside>

          {/* ── Main content ─── */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2.5">
              <p className="text-sm text-ink-3">
                <strong className="text-ink font-semibold">
                  {filtered.length}
                </strong>{" "}
                products found
              </p>
              <div className="flex items-center gap-2.5">
                {/* Mobile filter trigger */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <button
                      id="mobile-filter-btn"
                      className="lg:hidden inline-flex items-center gap-1.5 border border-surface-3 bg-white rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 hover:border-accent hover:text-accent transition-colors"
                    >
                      <SlidersHorizontal size={14} /> Filters
                      {selectedCats.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center">
                          {selectedCats.length}
                        </span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[300px] bg-white p-6 overflow-y-auto"
                  >
                    <FilterPanel {...filterProps} />
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    id="shop-sort-select"
                    className="w-[160px] rounded-full border-surface-3 bg-white text-sm h-9"
                  >
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-surface-3 shadow-card">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View toggle */}
                <div className="flex items-center border border-surface-3 rounded-full overflow-hidden bg-white">
                  <button
                    id="view-grid-btn"
                    onClick={() => setView("grid")}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center transition-colors",
                      view === "grid"
                        ? "bg-accent text-white"
                        : "text-ink-3 hover:text-ink",
                    )}
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    id="view-list-btn"
                    onClick={() => setView("list")}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center transition-colors",
                      view === "list"
                        ? "bg-accent text-white"
                        : "text-ink-3 hover:text-ink",
                    )}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product grid / list */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <h3
                  className="font-head text-lg font-bold text-ink"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  No products found
                </h3>
                <p className="text-sm text-ink-3 mt-1">
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-4 text-sm text-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-[18px]">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} p={p} index={i} list={false} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} p={p} index={i} list={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
