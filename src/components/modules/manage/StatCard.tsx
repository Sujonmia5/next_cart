/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const StatCard = ({ stat }: { stat: Record<string, any> }) => {
  const isUp = stat.trend === "up";
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#13141c] border border-white/[0.06] p-5 hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
        >
          {stat.icon}
        </div>
        <span
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg ${
            isUp
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-rose-400 bg-rose-500/10"
          }`}
        >
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {stat.change}
        </span>
      </div>
      <p
        className={`text-[26px] font-head font-extrabold mb-1 ${stat.valueColor || "text-white"}`}
      >
        {stat.value}
      </p>
      <p className="text-xs text-white/40 font-medium">{stat.label}</p>

      {/* Hover glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${stat.color} blur-3xl -z-10 scale-150`}
      />
    </div>
  );
};

export default StatCard;
