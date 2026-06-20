"use client";

import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t-3 border-neutral-border py-8 px-4 text-center mt-auto font-nunito">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-bold text-gray-400">
        <Link href="/" className="flex items-center gap-2 active:scale-95 transition-all">
          <span className="font-extrabold text-lg text-primary-dark">
            Ngaji<span className="text-secondary">Kidz</span>
          </span>
        </Link>
        <p className="flex items-center gap-1 text-xs">
          © 2026 NgajiKidz. Dibuat dengan <Heart size={12} className="fill-red-400 text-red-400" /> untuk Anak Indonesia.
        </p>
      </div>
    </footer>
  );
}
