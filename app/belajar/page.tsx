"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import React from "react";

export default function BelajarPage() {
  return (
    <div className="min-h-screen bg-neutral-warm flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white border-3 border-neutral-border rounded-3xl p-8 max-w-md shadow-sm">
        <div className="bg-primary/10 p-4 rounded-2xl border-2 border-primary/20 inline-block mb-4">
          <BookOpen className="w-12 h-12 text-primary-dark" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">Modul Belajar Ngaji</h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Pilih modul belajar Iqra, Tajwid, atau hafalan Surah pendek. Dilengkapi dengan kuis seru dan reward koin!
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-extrabold py-2.5 px-6 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all"
          >
            <ArrowLeft size={16} className="stroke-[3]" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
