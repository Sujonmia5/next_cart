"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Message sent successfully!");

    // Reset after some time
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <main className="pt-[120px] pb-24 bg-surface-2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-head text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Let&apos;s start a{" "}
            <span className="text-accent">Conversation.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-3 leading-relaxed"
          >
            Have a question about our products, an order, or just want to say
            hello? Our team is here to help you every step of the way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── Contact Form ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-surface-3 shadow-card relative overflow-hidden"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-bold text-ink">Message Sent!</h2>
                <p className="text-ink-3 max-w-sm mx-auto">
                  Thank you for reaching out. We&apos;ve received your message
                  and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-accent font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink-3 ml-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-surface-2 border border-surface-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink-3 ml-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-surface-2 border border-surface-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ink-3 ml-1">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-5 py-4 bg-surface-2 border border-surface-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ink-3 ml-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-5 py-4 bg-surface-2 border border-surface-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full py-5 bg-ink text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-ink-2 transition-all disabled:opacity-70 group shadow-lg"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16" />
          </motion.div>

          {/* ── Contact Info ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin className="text-accent" size={20} />,
                  label: "Our Office",
                  val: "123 Innovation Drive, Silicon Valley, CA 94025",
                  sub: "Mon - Fri, 9am - 6pm",
                },
                {
                  icon: <Phone className="text-accent" size={20} />,
                  label: "Phone",
                  val: "+1 (555) 000-1234",
                  sub: "Toll free for support",
                },
                {
                  icon: <Mail className="text-accent" size={20} />,
                  label: "Email",
                  val: "support@nexcart.com",
                  sub: "We reply within 24h",
                },
                {
                  icon: <MessageSquare className="text-accent" size={20} />,
                  label: "Live Chat",
                  val: "Available 24/7",
                  sub: "Speak to a human instantly",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-6 rounded-3xl bg-white border border-surface-3 hover:border-accent/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center shrink-0 group-hover:bg-accent-light transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-4 mb-1">
                      {item.label}
                    </p>
                    <p className="font-bold text-ink mb-0.5">{item.val}</p>
                    <p className="text-xs text-ink-4">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-ink p-8 rounded-[32px] text-white space-y-6">
              <h3
                className="font-head text-xl font-bold"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Follow our Journey
              </h3>
              <div className="flex gap-4">
                {/* {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all"
                  >
                    <Icon size={20} />
                  </button>
                ))} */}
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Stay updated with our latest releases and exclusive community
                offers by following us on social media.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
