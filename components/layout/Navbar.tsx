"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Beranda", href: "/" },
    { name: "Sistem Peran", href: "/multi-role" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Daftar Ustadz", href: "/ustadz" },
    { name: "Blog", href: "/blog" },
  ];

  // Helper to check if item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-3 border-neutral-border py-4 px-4 sm:px-8 shadow-sm font-nunito">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center active:scale-95 transition-all">
          <img
            src="/images/logongajikids.png"
            alt="NgajiKidz Logo"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors relative py-1 ${
                  active
                    ? "text-primary-dark font-black"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
              >
                {item.name}
                {active && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-[20px] left-0 right-0 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA / Login */}
        <div className="hidden md:flex items-center">
          <Link
            href="/login"
            className="bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-2.5 px-5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-[2px] transition-all"
          >
            Mulai Belajar
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border-2 border-neutral-border rounded-xl text-gray-600 hover:text-primary-dark hover:border-primary/45 transition-colors active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} className="stroke-[2.5]" /> : <Menu size={20} className="stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[77px] z-40 bg-black/40 backdrop-blur-xs md:hidden"
            />

            {/* Menu Body */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[77px] z-50 bg-white border-b-3 border-neutral-border p-6 shadow-xl flex flex-col gap-4 md:hidden text-left"
            >
              <div className="flex flex-col gap-3 font-extrabold text-sm">
                {navigationItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2 px-4 rounded-xl border border-transparent transition-all ${
                        active
                          ? "bg-primary-light/50 text-primary-dark border-primary/20 font-black"
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary-dark"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <hr className="border-gray-100" />

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-center py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-[2px] transition-all shadow-md"
              >
                Mulai Belajar
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
