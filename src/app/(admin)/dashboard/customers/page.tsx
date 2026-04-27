"use client";

import React, { useEffect, useState } from "react";

import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  UserX,
  UserCheck,
} from "lucide-react";
import { IUser } from "@/types/user.interface";
import Image from "next/image";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="font-head text-3xl font-extrabold text-ink"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Customer Management
          </h1>
          <p className="text-ink-4 text-sm mt-1">
            Manage your store&apos;s users, roles, and account statuses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center text-accent">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-ink-4 uppercase tracking-wider">
              Total Customers
            </p>
            <p className="text-xl font-black text-ink">{customers.length}</p>
          </div>
        </div>
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
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-surface-2 border border-surface-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-surface-3 rounded-xl text-sm font-semibold text-ink-2 hover:bg-surface-2 transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-ink text-white rounded-xl text-sm font-bold hover:bg-ink-2 transition-all shadow-lg">
            Add Customer
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-3xl border border-surface-3 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-surface-3">
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-ink-4 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-3">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5">
                      <div className="h-10 w-48 bg-surface-3 rounded-lg" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-6 w-20 bg-surface-3 rounded-full" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-6 w-16 bg-surface-3 rounded-lg" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-8 w-8 bg-surface-3 rounded-full ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={String(customer._id)}
                    className="group hover:bg-surface-2/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center font-bold text-sm overflow-hidden">
                          {customer.profile_img ? (
                            <Image
                              width={50}
                              height={50}
                              src={customer.profile_img}
                              alt={customer.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            customer.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-ink leading-tight">
                            {customer.name}
                          </p>
                          <p className="text-xs text-ink-4 flex items-center gap-1 mt-0.5">
                            <Mail size={10} /> {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider
                        ${
                          customer.status === "active"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                        }`}
                      >
                        {customer.status === "active" ? (
                          <UserCheck size={12} />
                        ) : (
                          <UserX size={12} />
                        )}
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[11px] font-black bg-surface-3 text-ink-3 px-2 py-0.5 rounded uppercase tracking-tighter">
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-ink-4 hover:bg-surface-3 hover:text-ink transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-20 text-center text-ink-4 italic"
                  >
                    No customers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
