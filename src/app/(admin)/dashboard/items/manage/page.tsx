/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  Search,
  Plus,
  AlertTriangle,
  Package,
  CheckCircle2,
} from "lucide-react";

import NexCartPagination from "@/components/shared/pagination/Pagination";

import ProductSelect from "@/components/shared/productSelect/ProductSelect";
import StatCard from "@/components/modules/manage/StatCard";
import ProductTable from "@/components/modules/manage/ProductTable";

// ─── Mock Data
const STATS = [
  {
    label: "Total Products",
    value: "412",
    change: "12 this month",
    trend: "up",
    icon: <Package size={20} />,
    color: "from-violet-600 to-purple-700",
  },
  {
    label: "In Stock",
    value: "389",
    change: "8 added",
    trend: "up",
    icon: <CheckCircle2 size={20} />,
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "Out of Stock",
    value: "23",
    change: "3 new",
    trend: "down", // Means bad here, so red
    icon: <AlertTriangle size={20} />,
    color: "from-rose-500 to-pink-600",
    valueColor: "text-rose-400",
  },
  {
    label: "Total Revenue",
    value: "$84.2K",
    change: "22% MoM",
    trend: "up",
    icon: <TrendingUp size={20} />,
    color: "from-sky-500 to-blue-600",
    valueColor: "text-violet-400",
  },
];

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

const ProductSelectOption = [
  { value: "all", label: "All Categories" },
  { value: "audio", label: "Audio & Headphones" },
  { value: "wearables", label: "Wearables" },
  { value: "computers", label: "Computers & Accessories" },
];

const STATUS = [
  { value: "all", label: "All Status" },
  { value: "inStock", label: "In Stock" },
  { value: "outOfStock", label: "Out of Stock" },
];

import { revalidatePath } from "next/cache";

export default async function ManageProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page || "1";
  const res = await fetch(`${process.env.BASE_URL}/api/products?page=${page}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);

  const handleDelete = async (id: string) => {
    "use server";
    const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    revalidatePath("/dashboard/items/manage");
  };
  return (
    <div className="pb-20">
      <div>
        {/*  Header */}
        <div className="flex flex-wrap justify-between items-start mb-7 gap-4">
          <div>
            <h1 className="font-head text-3xl font-extrabold text-white">
              Manage Products
            </h1>
            <p className="text-sm text-white/40 mt-1">
              View, edit, and organize all your store products from one place.
            </p>
          </div>
          <Link
            href="/dashboard/items/add"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200"
          >
            <Plus size={16} />
            Add New Product
          </Link>
        </div>

        {/* ── Stats Grid  */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* ── Table Card */}
        <div className="bg-[#13141c] rounded-3xl border border-white/[0.06] overflow-hidden shadow-xl">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/[0.06] flex flex-wrap gap-3 items-center justify-between">
            <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-[#1a1b26] border border-white/[0.08] rounded-full px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
              <Search size={16} className="text-white/40" />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                className="bg-transparent border-none text-sm flex-1 outline-none text-white placeholder:text-white/25"
              />
            </div>
            <div className="flex gap-3">
              <ProductSelect
                options={ProductSelectOption}
                placehold="All Categories"
              />
              <ProductSelect options={STATUS} placehold="All Status" />
            </div>
          </div>

          {/* Table */}
          <ProductTable
            productsData={data?.data || []}
            handleDelete={handleDelete}
          />

          {/* Pagination */}
          <NexCartPagination
            totalPages={data?.meta?.totalPages || 1}
            totalItems={data?.meta?.total || 0}
            // onPageChange={(page: number) => console.log(page)}
          />
        </div>
      </div>
    </div>
  );
}
