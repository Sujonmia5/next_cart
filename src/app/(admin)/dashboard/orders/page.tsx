"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

// Mock data for demonstration
const MOCK_ORDERS = [
  {
    id: "#ORD-9901",
    customer: "John Doe",
    date: "2024-03-24",
    amount: 1290.0,
    status: "Delivered",
    items: 3,
  },
  {
    id: "#ORD-9902",
    customer: "Sarah Smith",
    date: "2024-03-24",
    amount: 450.5,
    status: "Processing",
    items: 1,
  },
  {
    id: "#ORD-9903",
    customer: "Michael Chen",
    date: "2024-03-23",
    amount: 89.99,
    status: "Shipped",
    items: 2,
  },
  {
    id: "#ORD-9904",
    customer: "Emma Wilson",
    date: "2024-03-23",
    amount: 2100.0,
    status: "Pending",
    items: 5,
  },
  {
    id: "#ORD-9905",
    customer: "David Ross",
    date: "2024-03-22",
    amount: 120.0,
    status: "Cancelled",
    items: 1,
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600 border-green-100";
      case "Processing":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Shipped":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Pending":
        return "bg-surface-3 text-ink-3 border-surface-4";
      case "Cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-surface-3 text-ink-3";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 size={12} />;
      case "Processing":
        return <Clock size={12} />;
      case "Shipped":
        return <Truck size={12} />;
      case "Cancelled":
        return <AlertCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="font-head text-3xl font-extrabold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Order Management
          </h1>
          <p className="text-ink-4 text-sm mt-1">
            Track and manage your store&apos;s sales and shipments.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-surface-3 rounded-2xl text-sm font-bold text-ink hover:bg-surface-2 transition-all shadow-sm">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sales", val: "$45,290.00", color: "text-accent" },
          { label: "Orders Today", val: "24", color: "text-ink" },
          { label: "Pending Shipments", val: "12", color: "text-amber-600" },
          { label: "Completion Rate", val: "94.2%", color: "text-green-600" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-surface-3 shadow-sm"
          >
            <p className="text-xs font-bold text-ink-4 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className={`text-2xl font-black mt-2 ${stat.color}`}>
              {stat.val}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-surface-3 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-4"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-surface-2 border border-surface-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-surface-3 rounded-xl text-sm font-semibold text-ink-2 hover:bg-surface-2 transition-all">
            <Filter size={16} /> Date Range
          </button>
          <div className="h-8 w-px bg-surface-3 hidden md:block" />
          <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
            {["All", "Delivered", "Pending", "Cancelled"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                  ${status === "All" ? "bg-ink text-white shadow-lg" : "text-ink-4 hover:bg-surface-2"}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-3xl border border-surface-3 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-surface-3">
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Order ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest text-right">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-3 text-[13px]">
              {MOCK_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="group hover:bg-surface-2/50 transition-colors"
                >
                  <td className="px-6 py-5 font-mono font-bold text-accent">
                    {order.id}
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-bold text-ink">{order.customer}</p>
                      <p className="text-[11px] text-ink-4 uppercase tracking-tighter font-black mt-0.5">
                        {order.items} Items
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-ink-3">{order.date}</td>
                  <td className="px-6 py-5 font-bold text-ink">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border ${getStatusStyle(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-4 hover:bg-accent hover:text-white transition-all bg-surface-2 shadow-sm">
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-2 border-t border-surface-3 flex items-center justify-between">
          <p className="text-xs text-ink-4 font-medium italic">
            Showing 5 of 2,490 orders
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-1.5 rounded-lg border border-surface-3 bg-white text-xs font-bold text-ink-4 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-1.5 rounded-lg border border-surface-3 bg-white text-xs font-bold text-ink hover:bg-surface-3">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
