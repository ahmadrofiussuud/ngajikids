"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Coins, Sparkles, User, ShoppingBag, LayoutDashboard, LogOut, BookOpen } from "lucide-react";
import AvatarKid from "@/components/ui/AvatarKid";

interface StudentHeaderProps {
  coins?: number;
}

export default function StudentHeader({ coins = 120 }: StudentHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Belajar", href: "/dashboard", icon: <LayoutDashboard size={16} /> },
    { name: "Buku Iqra", href: "/dashboard/iqra", icon: <BookOpen size={16} /> },
    { name: "Toko Koin", href: "/dashboard/shop", icon: <ShoppingBag size={16} /> },
    { name: "Profil Saya", href: "/dashboard/profile", icon: <User size={16} /> },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-3 border-neutral-border py-4 px-4 sm:px-6 shadow-sm font-nunito">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/dashboard" className="flex items-center gap-2 active:scale-95 transition-all">
            <img
              src="/images/logongajikids.png"
              alt="NgajiKidz Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-primary-dark">
              Ngaji<span className="text-secondary">Kidz</span>
            </span>
            <span className="bg-primary-light text-primary-dark text-[9px] font-black px-2 py-0.5 rounded-full border border-primary/20">
              SANTRI
            </span>
          </Link>
        </div>

        {/* Center Side: Navigation Menu Tabs (Highlight Active Route) */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-gray-50 border border-gray-150 p-1 rounded-2xl w-full md:w-auto justify-center sm:justify-start">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl transition-all ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-550 hover:text-primary-dark hover:bg-gray-150"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Quick Stats (Streak, Coins) & Logout */}
        <div className="flex items-center gap-2 sm:gap-3 justify-end w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
          {/* Streak Counter */}
          <div className="flex items-center gap-1 bg-red-50 border border-red-100 px-3 py-1.5 rounded-xl text-red-500 font-extrabold text-xs cursor-default">
            <Flame size={14} className="fill-red-500 animate-bounce" />
            <span>7 Hari</span>
          </div>

          {/* Coin Store Link */}
          <Link
            href="/dashboard/shop"
            className={`flex items-center gap-1 bg-amber-50 border px-3 py-1.5 rounded-xl text-secondary-dark font-extrabold text-xs transition-all active:scale-95 ${
              pathname === "/dashboard/shop" ? "border-secondary" : "border-secondary/20 hover:border-secondary/40"
            }`}
          >
            <Coins size={14} className="fill-secondary text-secondary-dark stroke-1" />
            <span>{coins} Koin</span>
          </Link>

          {/* Quick Exit Button */}
          <Link
            href="/login"
            className="text-xs font-black text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-150 hover:border-red-600 px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Keluar</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
