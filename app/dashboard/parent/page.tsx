"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowLeft,
  Bell,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { generateAIPath, StudentProfile, AssessmentInput } from "@/lib/ai/learningPath";
import ParentHeader from "@/components/layout/ParentHeader";

// Mock Data for Ahmad
const mockProfile: StudentProfile = {
  level: "iqro3",
  weakPoints: ["Qalqalah (Bouncing Sound)", "Makhraj Huruf Qof"],
  streak: 7,
  lastSessionScore: 88,
  teacherNotes: "Ahmad memiliki fokus yang sangat baik hari ini. Pelafalan Fathah sudah lancar, perlu latihan lebih di sukun Qalqalah.",
};

const mockAssessment: AssessmentInput = {
  hijaiyahScore: 85,
  tajwidScore: 78,
  readingSpeed: 42, // chars per min
  consistencyScore: 92,
  retentionScore: 80,
  lastThreeScores: [72, 80, 88],
};

const mockSessionHistory = [
  {
    date: "17 Juni 2026",
    teacher: "Ustadz Riza",
    duration: "30 menit",
    notes: "Ahmad sangat antusias. Membaca lembar 12 Iqro 3 dengan lancar. Fokus latihan pada huruf Qof sukun.",
    score: 88,
  },
  {
    date: "15 Juni 2026",
    teacher: "Ustadz Riza",
    duration: "30 menit",
    notes: "Mulai belajar makhraj Qalqalah. Masih sering tertukar antara makhraj Qof dan Kaf.",
    score: 80,
  },
  {
    date: "10 Juni 2026",
    teacher: "Ustadzah Aisyah",
    duration: "30 menit",
    notes: "Latihan harakat kasratain. Pengulangan di rumah sudah terlihat hasilnya.",
    score: 72,
  },
];

const chartData = [
  { name: "Sesi 1", Nilai: 65, RataRata: 70 },
  { name: "Sesi 2", Nilai: 72, RataRata: 71 },
  { name: "Sesi 3", Nilai: 80, RataRata: 72 },
  { name: "Sesi 4", Nilai: 88, RataRata: 73 },
];

export default function ParentDashboard() {
  const [mounted, setMounted] = useState(false);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);

  // Load AI path generator
  const aiOutput = generateAIPath(mockProfile, mockAssessment);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito text-gray-800">
      {/* HEADER NAVBAR */}
      <ParentHeader />

      {/* MAIN LAYOUT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 flex flex-col gap-8">
        
        {/* Banner Cari Guru Ngaji */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 shadow-md border-3 border-teal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <span>🕌</span> Cari &amp; Booking Guru Ngaji (Ustadz/Ustazah)
            </h3>
            <p className="text-sm font-semibold text-emerald-50 opacity-90 mt-1">
              Pilih ustadz/ustazah terbaik yang sesuai dengan kebutuhan belajar anak Anda. Atur jadwal fleksibel sekarang!
            </p>
          </div>
          <Link
            href="/dashboard/parent/teachers"
            className="bg-amber-400 hover:bg-amber-300 text-teal-950 font-black text-sm px-6 py-3 rounded-2xl border-b-4 border-amber-600 hover:border-amber-500 active:scale-95 transition-all shadow-md text-center inline-block shrink-0"
          >
            Temukan Guru Ngaji ✨
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns (1 & 2): Core Data & Chart */}
          <div className="lg:col-span-2 flex flex-col gap-8 min-w-0">
          
          {/* Weekly Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: Time Spent */}
            <div className="bg-white border-3 border-neutral-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Waktu Belajar</span>
                <Clock size={18} className="text-primary" />
              </div>
              <p className="text-2xl font-black text-gray-800 mt-2">120 Menit</p>
              <p className="text-xs font-bold text-primary mt-1">
                ↑ 15% dari target mingguan
              </p>
            </div>

            {/* Card 2: Completed Sessions */}
            <div className="bg-white border-3 border-neutral-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Sesi Mengaji</span>
                <BookOpen size={18} className="text-secondary" />
              </div>
              <p className="text-2xl font-black text-gray-800 mt-2">3 Sesi</p>
              <p className="text-xs font-bold text-gray-400 mt-1">
                Bersama Ustadz Riza
              </p>
            </div>

            {/* Card 3: AI Recommendation status */}
            <div className="bg-white border-3 border-neutral-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Jalur Belajar AI</span>
                <Sparkles size={18} className="text-accent" />
              </div>
              <p className="text-lg font-black text-gray-800 mt-2 capitalize">
                {aiOutput.focusRecommendation} Focus
              </p>
              <p className="text-xs font-bold text-accent-dark mt-1">
                Rekomendasi di-update
              </p>
            </div>
          </div>

          {/* AI Insight Highlight Panel (Plain Language) */}
          <div className="bg-gradient-to-r from-emerald-50/50 to-amber-50/30 border-3 border-primary/40 rounded-3xl p-6 shadow-sm">
            <h3 className="font-extrabold text-base text-primary-dark flex items-center gap-2 mb-2">
              <Sparkles size={18} className="fill-primary text-primary-dark stroke-1" />
              Rekomendasi Pintar AI Untuk Orang Tua
            </h3>
            <p className="text-base font-extrabold text-gray-700 leading-relaxed">
              "{aiOutput.plainLanguageInsight}"
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <span className="bg-white border border-primary/25 text-primary-dark px-3 py-1 rounded-full">
                Fokus Makhraj: {mockProfile.weakPoints[1]}
              </span>
              <span className="bg-white border border-secondary/25 text-secondary-dark px-3 py-1 rounded-full">
                Kesulitan: {aiOutput.difficultyAdjustment === "MAINTAIN" ? "Pertahankan Level" : aiOutput.difficultyAdjustment}
              </span>
            </div>
          </div>

          {/* Recharts Progress Chart Card */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} />
                  Grafik Progres Nilai Sesi
                </h3>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">
                  Menampilkan nilai keakuratan pelafalan dalam 4 sesi terakhir
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-primary rounded-full" /> Nilai Ahmad
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span className="w-3 h-3 bg-gray-200 rounded-full" /> Target Rata-Rata
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="nilaiGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE6DF" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} domain={[50, 100]} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "16px",
                        border: "2px solid #EAE6DF",
                        fontFamily: "var(--font-nunito)",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Nilai"
                      stroke="#10B981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#nilaiGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center font-bold text-gray-450">
                  Memuat Grafik...
                </div>
              )}
            </div>
          </div>

          {/* AI Weekly Generated Schedule */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
            <h3 className="font-extrabold text-lg text-gray-800 flex items-center gap-2 mb-4">
              <Calendar className="text-primary" size={20} />
              Rencana Belajar Rekomendasi AI Minggu Ini 🗓️
            </h3>

            <div className="flex flex-col gap-3">
              {aiOutput.weeklySchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="bg-white border-2 border-neutral-border text-gray-600 font-extrabold text-xs py-1.5 px-3.5 rounded-xl shadow-inner min-w-[76px] text-center">
                      {item.day}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-800">{item.materialDescription}</h4>
                      <p className="text-xs font-bold text-gray-400 mt-0.5">{item.focus}</p>
                    </div>
                  </div>

                  <span className="bg-primary-light text-primary-dark font-extrabold text-xs px-3 py-1 rounded-full self-start sm:self-center">
                    ⏰ {item.durationMinutes} menit
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Teacher Notes & Preferences */}
        <div className="flex flex-col gap-8">
          
          {/* Teacher Session History & Notes */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-5 shadow-sm flex flex-col gap-4">
            <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-1.5">
              <MessageSquare className="text-primary" size={18} />
              Catatan Ustadz &amp; Riwayat Kelas
            </h3>

            <div className="flex flex-col gap-4">
              {mockSessionHistory.map((session, idx) => (
                <div
                  key={idx}
                  className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 flex flex-col gap-2.5 text-left"
                >
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-800">{session.teacher}</h4>
                      <span className="text-[10px] font-bold text-gray-400">{session.date} • {session.duration}</span>
                    </div>
                    <span className="bg-emerald-50 text-primary-dark border border-primary/20 text-xs font-black px-2.5 py-0.5 rounded-full">
                      {session.score}%
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-500 leading-relaxed italic">
                    "{session.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences Toggle Panel */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-5 shadow-sm flex flex-col gap-4">
            <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-1.5">
              <Bell className="text-secondary" size={18} />
              Pengaturan Laporan &amp; Notif
            </h3>

            <div className="flex flex-col gap-4">
              {/* WhatsApp reports */}
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800">Laporan WhatsApp</h4>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5">Dikirim berkala setiap Ahad sore</p>
                </div>
                <button
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                    whatsappAlerts ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      whatsappAlerts ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Email alerts */}
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800">Pemberitahuan Kuis</h4>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5">Email evaluasi instan setelah kuis</p>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                    emailAlerts ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      emailAlerts ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Session alerts */}
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800">Pengingat Sesi Guru</h4>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5">Notifikasi 1 jam sebelum kelas dimulai</p>
                </div>
                <button
                  onClick={() => setSessionAlerts(!sessionAlerts)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                    sessionAlerts ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      sessionAlerts ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      </main>

    </div>
  );
}
