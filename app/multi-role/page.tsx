"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Users,
  User,
  ArrowRight,
  TrendingUp,
  Brain,
  MessageSquare,
  Award,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function MultiRolePage() {
  const [activeRole, setActiveRole] = useState<"student" | "parent" | "teacher">("student");

  const roles = {
    student: {
      emoji: "👦",
      title: "Santri",
      subtitle: "Petualangan Mengaji yang Seru",
      desc: "Anak belajar ngaji Iqra dan Surah melalui peta petualangan laksana game, mengumpulkan koin emas, memenangkan lencana kelulusan, dan melatih pelafalan makhraj Hijaiyah.",
      features: [
        "Peta Petualangan Belajar Interaktif",
        "AI Makhraj Tracker (Real-time Feedback)",
        "Sistem Reward Koin Emas & Rak Lencana",
        "Tatap Muka Google Meet dengan Ustadz",
      ],
      colorClass: "border-emerald-500 bg-emerald-50/20 text-emerald-850",
      iconColor: "text-emerald-500 bg-emerald-50",
      link: "/login",
    },
    parent: {
      emoji: "Orang Tua",
      title: "Orang Tua",
      subtitle: "Pantau Progres dengan Transparan",
      desc: "Menghubungkan orang tua dengan perkembangan anak secara real-time. Orang tua menerima rekomendasi belajar AI mingguan, grafik nilai, catatan ustadz, serta laporan WhatsApp otomatis.",
      features: [
        "Grafik Progres Nilai Sesi Interaktif",
        "Rencana Belajar Mingguan Rekomendasi AI",
        "Laporan & Notifikasi via WhatsApp",
        "Booking Guru Ngaji Pilihan",
      ],
      colorClass: "border-purple-500 bg-purple-50/20 text-purple-850",
      iconColor: "text-purple-500 bg-purple-50",
      link: "/login",
    },
    teacher: {
      emoji: "🎓",
      title: "Ustadz Pengajar",
      subtitle: "Bimbingan Presisi & Terstruktur",
      desc: "Ustadz mengelola presensi santri, memberikan evaluasi lisan tajwid/makhraj pasca tatap muka, mengirim catatan tugas, serta memiliki wewenang meluluskan jilid Iqra santri.",
      features: [
        "Form Input Evaluasi Progres Anak",
        "Bobot Penilaian Otomatis Sinkronisasi AI",
        "Panel Ujian Kelulusan Jilid Iqra",
        "Manajemen Jadwal Kelas Privat",
      ],
      colorClass: "border-amber-500 bg-amber-50/20 text-amber-850",
      iconColor: "text-amber-500 bg-amber-50",
      link: "/login",
    },
  };

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito pb-20 text-gray-800 bg-islamic-pattern select-none">


      <main className="max-w-4xl mx-auto px-4 mt-12">
        {/* Page title */}
        <div className="text-center mb-12">
          <span className="bg-emerald-50 text-primary-dark border border-primary/20 font-black text-xs px-3.5 py-1.5 rounded-full inline-block uppercase tracking-wider mb-3 shadow-xs">
            Multi-Role Account System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
            Satu Ekosistem, Tiga Akses Terintegrasi
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
            NgajiKidz menghubungkan Santri, Orang Tua, dan Ustadz dalam satu lingkaran pembelajaran terpadu untuk hasil hafalan &amp; tajwid yang optimal.
          </p>
        </div>

        {/* Roles Toggles switcher */}
        <div className="flex justify-center gap-3 mb-10">
          {(["student", "parent", "teacher"] as const).map((roleKey) => (
            <button
              key={roleKey}
              onClick={() => setActiveRole(roleKey)}
              className={`px-6 py-3 rounded-2xl border-2 text-sm font-black transition-all ${
                activeRole === roleKey
                  ? "bg-primary border-primary-dark text-white shadow-md scale-105"
                  : "bg-white border-neutral-border text-gray-500 hover:border-gray-300"
              }`}
            >
              {roleKey === "student" ? "👦 Santri" : roleKey === "parent" ? "👩‍👦 Orang Tua" : "🎓 Ustadz"}
            </button>
          ))}
        </div>

        {/* Roles Detail Card with animations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border-3 border-neutral-border rounded-[36px] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          
          {/* Left panel: Info & bullet points (7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Peran Ekosistem</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-800 mt-1">
                    {roles[activeRole].title}
                  </h2>
                  <p className="text-xs font-bold text-primary-dark mt-0.5 italic">
                    {roles[activeRole].subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-gray-450 leading-relaxed">
                  {roles[activeRole].desc}
                </p>

                <div className="mt-2">
                  <h4 className="text-[10px] font-black text-gray-450 uppercase tracking-widest mb-3">Fitur Utama Akses:</h4>
                  <ul className="flex flex-col gap-2.5">
                    {roles[activeRole].features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <span className="w-5 h-5 bg-emerald-50 text-primary-dark border border-primary/20 rounded-full flex items-center justify-center text-[10px] shrink-0 font-black">
                          ✓
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <Link
              href="/login"
              className="mt-4 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2 self-start"
            >
              Simulasikan Log Masuk Peran ini
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right panel: Visualization flowchart / diagram mockup (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4 items-center justify-center bg-neutral-warm border-2 border-neutral-border rounded-3xl p-6 h-full relative">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Alur Sinkronisasi Data</h4>
            
            {/* Visual connecting diagram nodes */}
            <div className="flex flex-col items-center gap-4 w-full relative">
              {/* Node 1: Santri */}
              <div className={`p-3 rounded-2xl border-2 w-full text-center text-xs font-black transition-all ${activeRole === "student" ? "bg-emerald-50 border-emerald-500 scale-105 shadow-sm" : "bg-white border-neutral-border text-gray-450"}`}>
                👦 Santri Mengaji
                <p className="text-[8px] font-semibold text-gray-400 mt-0.5">Input: Rekaman Suara / GMeet</p>
              </div>

              <div className="text-gray-300 font-extrabold text-xs">⬇️</div>

              {/* Node 2: Guru */}
              <div className={`p-3 rounded-2xl border-2 w-full text-center text-xs font-black transition-all ${activeRole === "teacher" ? "bg-amber-50 border-amber-500 scale-105 shadow-sm" : "bg-white border-neutral-border text-gray-450"}`}>
                🎓 Ustadz Evaluasi (AI Path)
                <p className="text-[8px] font-semibold text-gray-400 mt-0.5">Input: Form Skor &amp; Catatan</p>
              </div>

              <div className="text-gray-300 font-extrabold text-xs">⬇️</div>

              {/* Node 3: Orang Tua */}
              <div className={`p-3 rounded-2xl border-2 w-full text-center text-xs font-black transition-all ${activeRole === "parent" ? "bg-purple-50 border-purple-500 scale-105 shadow-sm" : "bg-white border-neutral-border text-gray-450"}`}>
                👩‍👦 Orang Tua Memantau
                <p className="text-[8px] font-semibold text-gray-400 mt-0.5">Output: Grafik Progres &amp; WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
