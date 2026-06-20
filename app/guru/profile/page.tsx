"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Award,
  Check,
  ChevronLeft,
  BookOpen,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import TeacherHeader from "@/components/layout/TeacherHeader";

export default function TeacherProfilePage() {
  const [teacherName, setTeacherName] = useState("Ustadz Riza");
  const [email, setEmail] = useState("riza@example.com");
  const [phone, setPhone] = useState("081234567891");
  const [bio, setBio] = useState(
    "Lulusan Universitas Islam Madinah. Mengajar Al-Quran sejak 2018 dengan fokus metode interaktif tajwid bergambar untuk anak-anak."
  );
  const [certification, setCertification] = useState(
    "Sertifikasi Tilawati Utama & Tahsin Al-Qur'an Nasional"
  );
  
  const [availableDays, setAvailableDays] = useState<string[]>([
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
  ]);

  const [timeBlocks, setTimeBlocks] = useState([
    { id: "1", from: "15:00", to: "17:30", active: true },
    { id: "2", from: "19:00", to: "21:00", active: true },
  ]);

  const [showSavedToast, setShowSavedToast] = useState(false);

  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTimeBlock = (id: string) => {
    setTimeBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, active: !block.active } : block))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito relative text-gray-800">
      {/* Toast Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-2 border-2 border-emerald-700"
          >
            <Check size={18} className="stroke-[3]" />
            <span>Profil ustadz berhasil disimpan! 🎓</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <TeacherHeader />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: BIO & STATS */}
          <div className="md:col-span-1 flex flex-col gap-6">
            
            {/* PROFILE HEAD */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-primary bg-primary-light flex items-center justify-center text-primary-dark font-black text-3xl shadow-sm mb-4 select-none">
                U
              </div>
              <h2 className="text-xl font-black text-gray-800">{teacherName}</h2>
              <p className="text-xs text-gray-400 font-semibold mt-1">Ustadz Bimbingan NgajiKidz</p>
              
              <div className="mt-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-250 px-3 py-1 rounded-full text-xs font-black">
                <Award size={14} className="text-emerald-700" />
                Sertifikasi Terverifikasi
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Statistik Mengajar</h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-gray-600">
                    <Users size={14} className="text-gray-400" />
                    <span>Santri Bimbingan</span>
                  </div>
                  <span className="text-sm font-black text-gray-800">12 Santri</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-gray-600">
                    <BookOpen size={14} className="text-gray-400" />
                    <span>Total Sesi Selesai</span>
                  </div>
                  <span className="text-sm font-black text-gray-800">248 Sesi</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-gray-600">
                    <Star size={14} className="text-gray-400" />
                    <span>Rating Kehadiran</span>
                  </div>
                  <span className="text-sm font-black text-gray-800">98.5%</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PREFERENCES & SCHEDULES */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* PERSONAL DATA */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" />
                Data Diri Ustadz
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-gray-400">Nama Lengkap</label>
                    <input
                      type="text"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-gray-400">Nomor Telepon/WA</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-400 flex items-center gap-1">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-400">Sertifikasi Keahlian</label>
                  <input
                    type="text"
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-400">Biografi Singkat</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* SCHEDULE AVAILABILITY */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                Jadwal Hari Mengajar
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {daysOfWeek.map((day) => {
                  const isSelected = availableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2.5 rounded-xl border-2 font-extrabold text-xs transition-all ${
                        isSelected
                          ? "border-primary bg-primary-light text-primary-dark shadow-sm"
                          : "border-neutral-border hover:border-gray-300 bg-white text-gray-500"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TIME AVAILABILITY */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Jam Aktif Mengajar
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timeBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                      block.active ? "border-primary bg-primary-light/10" : "border-neutral-border bg-white opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${block.active ? "bg-primary/10 text-primary-dark" : "bg-gray-100 text-gray-400"}`}>
                        <Clock size={16} />
                      </div>
                      <div className="text-left font-black text-xs text-gray-700">
                        {block.from} - {block.to} WIB
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => toggleTimeBlock(block.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${
                        block.active
                          ? "bg-primary text-white border-primary-dark"
                          : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                    >
                      {block.active ? "AKTIF" : "LIBUR"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON ACTION GROUP */}
            <div className="flex gap-4">
              <Link
                href="/guru"
                className="flex-1 bg-gray-150 hover:bg-gray-200 text-gray-600 font-extrabold text-base text-center py-3.5 rounded-2xl border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 transition-all"
              >
                Kembali ke Portal
              </Link>
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Simpan Perubahan 💾
              </button>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
}
