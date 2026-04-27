"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { TProduct } from "@/types/product.interface";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && cartItems.length > 0) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/products?ids=${cartItems.join(",")}&limit=100`,
          );
          const data = await res.json();
          if (data.success) {
            setProducts(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch cart products", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else if (cartItems.length === 0) {
      setProducts([]);
    }
  }, [isOpen, cartItems]);

  const totalPrice = products.reduce((acc, curr) => acc + (curr.price || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/40 backdrop-blur-sm h-screen">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="text-accent" size={20} />
            <h2
              className="font-head text-xl font-bold text-ink"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              My Cart{" "}
              <span className="text-ink-4 text-sm font-medium ml-1">
                ({cartItems.length} items)
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-2 text-ink-3 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-ink-4">
              <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
              <p className="text-sm font-medium">Loading items...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={String(product._id)}
                  className="flex gap-4 p-3 rounded-2xl border border-surface-3 hover:border-accent/20 transition-colors"
                >
                  <div className="w-20 h-20 bg-surface-3 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {product.imageUrl?.[0] ? (
                      <Image
                        width={100}
                        height={100}
                        src={product.imageUrl[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink truncate leading-tight">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-ink-4 mt-0.5 capitalize">
                        {product.priority || "Standard"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-accent">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(String(product._id))}
                        className="p-1.5 text-ink-4 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center text-4xl mb-4">
                🛒
              </div>
              <h3 className="text-lg font-bold text-ink">Your cart is empty</h3>
              <p className="text-sm text-ink-4 mt-1 max-w-[200px]">
                Looks like you haven&apos;t added anything yet.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-accent text-white rounded-full text-sm font-semibold shadow-accent hover:scale-105 transition-all active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {products.length > 0 && (
          <div className="p-6 bg-surface-2 border-t border-surface-3 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink-3">
                Total Amount
              </span>
              <span
                className="text-xl font-extrabold text-ink"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full py-4 bg-ink hover:bg-ink-2 text-white rounded-2xl font-bold text-[15px] shadow-lg transition-all active:scale-[0.98]">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-xs font-semibold text-ink-4 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
