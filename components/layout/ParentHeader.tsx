"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, TrendingUp, Users, LayoutDashboard, User, LogOut, ChevronRight } from "lucide-react";

export default function ParentHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/parent", icon: <LayoutDashboard size={16} /> },
    { name: "Cari Guru Ngaji", href: "/dashboard/parent/teachers", icon: <Users size={16} /> },
    { name: "Analisis AI", href: "/dashboard/parent/insights", icon: <TrendingUp size={16} /> },
    { name: "Profil", href: "/dashboard/parent/profile", icon: <User size={16} /> },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard/parent") {
      return pathname === "/dashboard/parent";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-3 border-neutral-border py-4 px-4 sm:px-6 shadow-sm font-nunito">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/dashboard/parent" className="flex items-center gap-2 active:scale-95 transition-all">
            <div className="bg-primary p-2 rounded-xl border-2 border-primary-dark shadow-sm">
              <Sparkles className="text-white w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-primary-dark">
              Ngaji<span className="text-secondary">Kidz</span>
            </span>
            <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-2.5 py-0.5 rounded-full border border-purple-200">
              ORANG TUA
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
                className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl transition-all ${
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

        {/* Right Side: Quick Profile Status & Logout */}
        <div className="flex items-center gap-3 justify-end w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs select-none">
              👩‍👦
            </div>
            <span className="text-xs font-black text-gray-700 hidden sm:inline">Orang Tua Ahmad</span>
          </div>

          <Link
            href="/login"
            className="text-xs font-black text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-150 hover:border-red-600 px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Keluar</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
