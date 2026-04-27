"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NexCartPaginationProps {
  totalPages: number;
  totalItems: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
  itemName?: string;
}

const NexCartPagination = ({
  totalPages,
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage = 10,
  itemName = "products",
}: NexCartPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlPage = Number(searchParams.get("page")) || 1;
  const activePage = currentPage !== undefined ? currentPage : urlPage;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const showingFrom =
    totalItems === 0 ? 0 : (activePage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(activePage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (activePage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (activePage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          activePage - 1,
          activePage,
          activePage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="p-4 border-t border-white/[0.06] flex justify-between items-center bg-[#0f1117]/30">
      <p className="text-[13px] text-white/40">
        Showing{" "}
        <span className="font-medium text-white/70">
          {showingFrom}–{showingTo}
        </span>{" "}
        of <span className="font-medium text-white/70">{totalItems}</span>{" "}
        {itemName}
      </p>
      <div className="flex gap-1.5">
        <button
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage <= 1}
          className="w-8 h-8 rounded-lg border border-white/[0.08] bg-[#1a1b26] text-white/40 flex items-center justify-center text-sm hover:text-white hover:border-white/20 transition-all disabled:opacity-50 disabled:hover:text-white/40 disabled:hover:border-white/[0.08] disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                activePage === page
                  ? "bg-violet-600 text-white font-semibold shadow-md shadow-violet-500/20"
                  : "border border-white/[0.08] bg-[#1a1b26] text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="w-8 h-8 flex items-center justify-center text-white/30 text-sm"
            >
              {page}
            </span>
          ),
        )}

        <button
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage >= totalPages || totalPages === 0}
          className="w-8 h-8 rounded-lg border border-white/[0.08] bg-[#1a1b26] text-white/40 flex items-center justify-center text-sm hover:text-white hover:border-white/20 transition-all disabled:opacity-50 disabled:hover:text-white/40 disabled:hover:border-white/[0.08] disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NexCartPagination;
