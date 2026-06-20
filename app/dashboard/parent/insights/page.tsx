"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Calendar,
  Printer,
  BookOpen,
  ArrowRight,
  Clock,
  Heart,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import ParentHeader from "@/components/layout/ParentHeader";

interface SessionLog {
  id: string;
  date: string;
  teacher: string;
  material: string;
  score: number;
  notes: string;
}

export default function ParentInsightsPage() {
  // Stats definitions
  const metrics = [
    { name: "Akurasi Pelafalan Hijaiyah", value: 85, color: "bg-emerald-500", desc: "Ketepatan makhraj suara huruf" },
    { name: "Penerapan Hukum Tajwid", value: 78, color: "bg-amber-500", desc: "Hukum bacaan dengung & panjang pendek" },
    { name: "Kecepatan Membaca (Speed)", value: 82, color: "bg-sky-500", desc: "Kelancaran ketukan membaca per menit" },
    { name: "Daya Ingat (Retention)", value: 80, color: "bg-purple-500", desc: "Kekuatan hafalan mandiri di sesi baru" },
    { name: "Konsistensi Hadir (GMeet)", value: 92, color: "bg-pink-500", desc: "Tingkat kehadiran tatap muka ustadz" },
  ];

  const weakPoints = [
    { name: "Qalqalah (Bouncing Sound)", type: "Tajwid", desc: "Masih kurang memantul saat membaca huruf sukun Qof & Ba." },
    { name: "Makhraj Huruf Qof", type: "Makhraj", desc: "Sering tertukar suara makhrajnya antara Qof (pangkal lidah) dan Kaf." },
  ];

  const sessionHistory: SessionLog[] = [
    {
      id: "s1",
      date: "17 Juni 2026",
      teacher: "Ustadz Riza",
      material: "Iqra 3 Halaman 12",
      score: 88,
      notes: "Ahmad memiliki fokus yang sangat baik hari ini. Pelafalan Fathah sudah lancar, perlu latihan lebih di sukun Qalqalah.",
    },
    {
      id: "s2",
      date: "15 Juni 2026",
      teacher: "Ustadz Riza",
      material: "Iqra 3 Halaman 10",
      score: 80,
      notes: "Mulai belajar makhraj Qalqalah. Masih sering tertukar antara makhraj Qof dan Kaf.",
    },
    {
      id: "s3",
      date: "10 Juni 2026",
      teacher: "Ustadzah Aisyah",
      material: "Iqra 3 Halaman 8",
      score: 72,
      notes: "Latihan harakat kasratain. Pengulangan di rumah bersama orang tua sudah mulai terlihat hasilnya.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito text-gray-800">
      
      {/* HEADER */}
      <ParentHeader />

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: VISUAL DIAGNOSIS CHARTS & WEAK POINTS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* DIAGNOSIS BARS */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
              <BarChart2 size={18} className="text-primary" />
              Diagnosis Kemampuan
            </h3>

            <div className="flex flex-col gap-5">
              {metrics.map((metric) => (
                <div key={metric.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-gray-700">{metric.name}</span>
                    <span className="text-primary-dark">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-250 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${metric.color}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 leading-normal">{metric.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WEAK POINTS LIST */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 mb-2 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-500" />
              Fokus Perbaikan AI
            </h3>
            <p className="text-xs font-semibold text-gray-400 mb-4">
              Materi makhraj/tajwid yang perlu latihan tambahan di rumah:
            </p>

            <div className="flex flex-col gap-3">
              {weakPoints.map((wp) => (
                <div key={wp.name} className="p-3.5 bg-red-50/55 rounded-2xl border border-red-100 text-left">
                  <h4 className="text-xs font-black text-red-600 flex items-center gap-1.5">
                    <span>⚠️</span> {wp.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-gray-500 mt-1 leading-relaxed">
                    {wp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI RECOMMENDATIONS, TIPS, & PRINTABLES */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* AI INTERACTIVE INSIGHTS */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />

            <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-primary fill-primary" />
              Rencana Belajar Mandiri AI (5 Hari Kedepan)
            </h3>

            <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border-2 border-primary-light p-4 rounded-2xl mb-6 text-left">
              <h4 className="text-xs font-black text-primary-dark uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles size={14} className="fill-primary text-primary-dark stroke-none" />
                Plain-Language Insight AI
              </h4>
              <p className="text-sm font-extrabold text-gray-700 leading-relaxed">
                "Ahmad sangat dekat untuk menguasai Iqra 3! Fokus latihan minggu ini adalah melancarkan bunyi pantulan qalqalah (pada huruf Ba dan Qof) agar pelafalan makhrajnya terdengar mantap dan terbiasa."
              </p>
            </div>

            {/* 5-day schedule grid */}
            <div className="flex flex-col gap-2.5">
              {[
                { day: "Hari 1", mat: "Iqra 3 Halaman 12", dur: "10 menit", focus: "Latihan Qalqalah Ba sukun" },
                { day: "Hari 2", mat: "Iqra 3 Halaman 13", dur: "12 menit", focus: "Membaca Mandiri tanpa terbata" },
                { day: "Hari 3", mat: "Iqra 3 Halaman 13", dur: "10 menit", focus: "Pengulangan materi makhraj Qof" },
                { day: "Hari 4", mat: "Iqra 3 Halaman 14", dur: "15 menit", focus: "Latihan makhraj tipis tebal Qof vs Kaf" },
                { day: "Hari 5", mat: "Evaluasi Mingguan", dur: "10 menit", focus: "Kuis Tajwid online di dashboard anak" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-150 gap-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black bg-white border border-gray-200 px-3 py-1 rounded-xl shadow-sm text-gray-600 min-w-[64px] text-center">
                      {item.day}
                    </span>
                    <div className="text-left">
                      <p className="text-xs font-black text-gray-800">{item.mat}</p>
                      <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{item.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-[10px] font-black bg-primary-light text-primary-dark px-2.5 py-0.5 rounded-full">
                      ⏱️ {item.dur}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOME STUDY TIPS & PRINTABLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* PARENTING STUDY TIPS */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm text-left">
              <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-1.5">
                <Heart size={18} className="text-red-500 fill-red-500" />
                Tips Latihan di Rumah
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2.5 items-start">
                  <span className="text-xs bg-amber-50 text-secondary-dark font-black p-1 rounded-lg border">1</span>
                  <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                    Lakukan permainan <strong>"Gema Suara"</strong>: Ucapkan huruf Qof sukun dengan pantulan yang tebal, lalu minta anak meniru seperti suara gema.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start border-t border-gray-100 pt-3">
                  <span className="text-xs bg-amber-50 text-secondary-dark font-black p-1 rounded-lg border">2</span>
                  <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                    Batasi waktu belajar mandiri anak maksimal <strong>15 menit</strong> per sesi agar konsentrasi dan minat belajarnya tetap terjaga.
                  </p>
                </div>
              </div>
            </div>

            {/* PRINTABLE DOWNLOAD CARD */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="text-base font-black text-gray-800 mb-1 flex items-center gap-1.5">
                  <Printer size={18} className="text-primary" />
                  Worksheet Cetak
                </h3>
                <p className="text-[10px] font-bold text-gray-400">Belajar offline menulis huruf hijaiyah</p>
                <p className="text-xs font-semibold text-gray-500 mt-3 leading-relaxed">
                  Unduh lembar mewarnai tajwid interaktif bertema Qalqalah yang didesain ramah anak.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert("Mengunduh worksheet PDF...")}
                className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Printer size={14} />
                Unduh PDF Worksheet (Free)
              </button>
            </div>

          </div>

          {/* HISTORICAL SESSIONS LOG */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm text-left">
            <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-1.5">
              <Calendar size={18} className="text-primary" />
              Riwayat Pertemuan &amp; Catatan Sesi
            </h3>

            <div className="flex flex-col gap-4">
              {sessionHistory.map((s) => (
                <div key={s.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-150 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center border-b border-gray-150 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-700">{s.material}</span>
                      <span className="text-[9px] bg-white border px-2 py-0.5 rounded-md font-bold text-gray-400">
                        {s.date}
                      </span>
                    </div>
                    <span className="text-xs font-black bg-primary-light text-primary-dark px-2.5 py-0.5 rounded-full">
                      Skor: {s.score}/100
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                    <strong>Catatan {s.teacher}:</strong> "{s.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
