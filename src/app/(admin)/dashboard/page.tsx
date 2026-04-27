import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  gradient: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
}

interface TopProduct {
  name: string;
  sold: number;
  revenue: string;
  rating: number;
  trend: "up" | "down";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STATS: StatCard[] = [
  {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    positive: true,
    icon: <TrendingUp size={20} />,
    gradient: "from-violet-600 to-purple-700",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    icon: <ShoppingCart size={20} />,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    label: "Total Products",
    value: "342",
    change: "+3.1%",
    positive: true,
    icon: <Package size={20} />,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    label: "Total Customers",
    value: "5,891",
    change: "-2.4%",
    positive: false,
    icon: <Users size={20} />,
    gradient: "from-rose-500 to-pink-600",
  },
];

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "#ORD-001",
    customer: "Rahim Uddin",
    product: "Wireless Headphone",
    amount: "$129.99",
    status: "Completed",
    date: "Apr 25, 2026",
  },
  {
    id: "#ORD-002",
    customer: "Fatima Khan",
    product: "Smart Watch Pro",
    amount: "$249.00",
    status: "Pending",
    date: "Apr 25, 2026",
  },
  {
    id: "#ORD-003",
    customer: "Sujon Mia",
    product: "Mechanical Keyboard",
    amount: "$89.50",
    status: "Completed",
    date: "Apr 24, 2026",
  },
  {
    id: "#ORD-004",
    customer: "Riya Begum",
    product: "USB-C Hub",
    amount: "$45.00",
    status: "Cancelled",
    date: "Apr 24, 2026",
  },
  {
    id: "#ORD-005",
    customer: "Karim Hossain",
    product: "LED Monitor 27\"",
    amount: "$399.00",
    status: "Pending",
    date: "Apr 23, 2026",
  },
];

const TOP_PRODUCTS: TopProduct[] = [
  { name: "Wireless Headphone X1", sold: 312, revenue: "$40,469", rating: 4.8, trend: "up" },
  { name: "Smart Watch Pro Max", sold: 198, revenue: "$49,302", rating: 4.7, trend: "up" },
  { name: "Mechanical Keyboard TK", sold: 145, revenue: "$12,978", rating: 4.5, trend: "down" },
  { name: "USB-C 7-in-1 Hub", sold: 289, revenue: "$13,005", rating: 4.6, trend: "up" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: RecentOrder["status"] }) {
  const styles: Record<RecentOrder["status"], string> = {
    Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 md:p-8">
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-6 right-24 h-28 w-28 rounded-full bg-white/10 blur-xl" />

        <div className="relative z-10">
          <p className="text-sm font-medium text-violet-200 mb-1">
            Welcome back 👋
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h2>
          <p className="text-sm text-violet-200/80 max-w-md">
            Here&apos;s what&apos;s happening with your store today. Review your
            metrics and manage your products.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-violet-200/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Last updated: just now
          </div>
        </div>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl bg-[#13141c] border border-white/[0.06] p-5 hover:border-violet-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
              >
                {stat.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                  stat.positive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-rose-400 bg-rose-500/10"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-white/40 font-medium">{stat.label}</p>

            {/* Hover glow */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.gradient} blur-3xl -z-10 scale-150`}
              style={{ opacity: 0 }}
            />
          </div>
        ))}
      </div>

      {/* ── Bottom Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 rounded-2xl bg-[#13141c] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Recent Orders</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
              <Eye size={13} />
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {["Order", "Customer", "Product", "Amount", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {RECENT_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3.5 font-mono text-xs text-violet-400">
                      {order.id}
                    </td>
                    <td className="px-6 py-3.5 text-white/80 font-medium">
                      {order.customer}
                    </td>
                    <td className="px-6 py-3.5 text-white/50 max-w-[160px] truncate">
                      {order.product}
                    </td>
                    <td className="px-6 py-3.5 text-white font-semibold">
                      {order.amount}
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3.5 text-white/30 text-xs">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl bg-[#13141c] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Top Products</h3>
            <button className="text-white/30 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {TOP_PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                className="flex items-start gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Rank */}
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-[11px] font-bold text-violet-400">
                  {i + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/90 truncate mb-1">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white/40">
                      {product.sold} sold
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="flex items-center gap-0.5 text-[11px] text-amber-400">
                      <Star size={10} fill="currentColor" />
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white">
                    {product.revenue}
                  </p>
                  <span
                    className={`flex items-center justify-end gap-0.5 text-[11px] font-medium ${
                      product.trend === "up" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {product.trend === "up" ? (
                      <ArrowUpRight size={11} />
                    ) : (
                      <ArrowDownRight size={11} />
                    )}
                    {product.trend === "up" ? "Rising" : "Falling"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
