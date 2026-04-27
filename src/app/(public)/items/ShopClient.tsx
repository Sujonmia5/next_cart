"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
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
import { TProduct } from "@/types/product.interface";
import { ProductCard } from "@/components/productCard/ProductCard";

/* ─── Data  */
const PRIORITIES = ["low", "medium", "high"];

function FilterPanel({
  selectedPriorities,
  setSelectedPriorities,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  onClear,
}: {
  selectedPriorities: string[];
  setSelectedPriorities: (v: string[]) => void;
  priceMin: string;
  setPriceMin: (v: string) => void;
  priceMax: string;
  setPriceMax: (v: string) => void;
  onClear: () => void;
}) {
  const togglePriority = (c: string) =>
    setSelectedPriorities(
      selectedPriorities.includes(c)
        ? selectedPriorities.filter((x) => x !== c)
        : [...selectedPriorities, c],
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

      {/* Priority */}
      <div className="mb-5 pb-5 border-b border-surface-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ink-4 mb-3">
          Priority
        </p>
        <div className="space-y-2.5">
          {PRIORITIES.map((pri) => (
            <label
              key={pri}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                id={`pri-${pri}`}
                checked={selectedPriorities.includes(pri)}
                onCheckedChange={() => togglePriority(pri)}
                className="w-4 h-4 rounded border-2 border-surface-3 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span className="text-sm text-ink-2 flex-1 capitalize">
                {pri}
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
            type="number"
            placeholder="Min"
            className="w-full bg-surface-2 border border-surface-3 rounded-lg p-2 text-sm outline-none focus:border-accent transition-colors"
          />
          <input
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            type="number"
            placeholder="Max"
            className="w-full bg-surface-2 border border-surface-3 rounded-lg p-2 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

export default function ShopClient({ products }: { products: TProduct[] }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const clearAll = () => {
    setSelectedPriorities([]);
    setPriceMin("");
    setPriceMax("");
    setSubmitted("");
    setQuery("");
  };

  const filtered = products.filter((p) => {
    // Priority filter
    if (
      selectedPriorities.length &&
      (!p.priority || !selectedPriorities.includes(p.priority))
    )
      return false;

    // Search filter
    if (submitted && !p.title.toLowerCase().includes(submitted.toLowerCase()))
      return false;

    // Price filter
    if (priceMin && p.price !== undefined && p.price < Number(priceMin))
      return false;
    if (priceMax && p.price !== undefined && p.price > Number(priceMax))
      return false;

    return true;
  });

  // Sorting
  if (sortBy === "price-asc") {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === "newest") {
    filtered.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  const filterProps = {
    selectedPriorities,
    setSelectedPriorities,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
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
                      {selectedPriorities.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center">
                          {selectedPriorities.length}
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
                  <ProductCard
                    key={p._id?.toString() || p.title}
                    product={p}
                    index={i}
                    list={false}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((p, i) => (
                  <ProductCard
                    key={p._id?.toString() || p.title}
                    product={p}
                    index={i}
                    list={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
