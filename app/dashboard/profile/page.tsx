"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Coins,
  Trophy,
  Award,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Check,
  ChevronLeft,
  Settings,
} from "lucide-react";
import Link from "next/link";
import AvatarKid from "@/components/ui/AvatarKid";
import XPBar from "@/components/gamification/XPBar";
import StarBadge from "@/components/gamification/StarBadge";
import StudentHeader from "@/components/layout/StudentHeader";

export default function StudentProfilePage() {
  const [name, setName] = useState("Ahmad Fatih");
  const [selectedAvatar, setSelectedAvatar] = useState<"star" | "crescent" | "sheep" | "sun">("star");
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [bgmEnabled, setBgmEnabled] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"green" | "purple">("green");
  const [showSavedToast, setShowSavedToast] = useState(false);

  const avatars: ("star" | "crescent" | "sheep" | "sun")[] = ["star", "crescent", "sheep", "sun"];

  const badges = [
    { id: "1", title: "Pahlawan Iqra", emoji: "📖", desc: "Membaca 10 halaman Iqra", unlocked: true },
    { id: "2", title: "Penghafal Cilik", emoji: "🕌", desc: "Menghafal Surah Al-Fatihah", unlocked: true },
    { id: "3", title: "Konsisten Mengaji", emoji: "🔥", desc: "Mencapai 7 hari berturut-turut", unlocked: true },
    { id: "4", title: "Kolektor Emas", emoji: "🪙", desc: "Mengumpulkan 100 koin emas", unlocked: true },
    { id: "5", title: "Bintang Quran", emoji: "⭐", desc: "Belajar 30 menit non-stop", unlocked: false },
    { id: "6", title: "Juara Tajwid", emoji: "🎯", desc: "Selesaikan kuis makhraj", unlocked: false },
  ];

  const handleSave = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito relative select-none">
      {/* Toast Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-2 border-2 border-emerald-600"
          >
            <Check size={18} className="stroke-[3]" />
            <span>Profil berhasil disimpan! 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <StudentHeader coins={120} />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: AVATAR & QUICK STATS */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col items-center text-center">
              <div className="relative p-4 bg-amber-50 rounded-full border-3 border-secondary/20 mb-4">
                <AvatarKid character={selectedAvatar} size={110} animated />
                <div className="absolute -bottom-1 -right-1 bg-secondary text-white p-2 rounded-full border-2 border-secondary-dark shadow-md">
                  <Sparkles size={16} className="animate-spin-slow" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-gray-800 mt-1">{name}</h2>
              <span className="bg-primary-light text-primary-dark text-xs font-black px-3 py-1 rounded-full border border-primary/20 mt-1">
                LENCANA AKTIF: {badges.filter(b => b.unlocked).length} / {badges.length}
              </span>

              {/* XP Progress */}
              <div className="w-full mt-6">
                <XPBar xp={75} level={3} />
              </div>
            </div>

            {/* QUICK STATS CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-3 border-neutral-border rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-xl border-2 border-secondary/20 flex items-center justify-center mb-2">
                  <Coins size={20} className="fill-secondary text-secondary-dark" />
                </div>
                <span className="text-xs font-bold text-gray-400">Koin Mas</span>
                <span className="text-lg font-black text-gray-800">120</span>
              </div>
              <div className="bg-white border-3 border-neutral-border rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-red-50 rounded-xl border-2 border-red-100 flex items-center justify-center mb-2">
                  <Flame size={20} className="fill-red-500 text-red-500 animate-bounce" />
                </div>
                <span className="text-xs font-bold text-gray-400">Hari Streak</span>
                <span className="text-lg font-black text-gray-800">7 Hari</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PREFERENCES & AVATAR PICKER & BADGES */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* AVATAR SELECTOR */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Pilih Karakter Kamu
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {avatars.map((av) => (
                  <button
                    key={av}
                    onClick={() => setSelectedAvatar(av)}
                    className={`relative p-3 rounded-2xl border-3 flex flex-col items-center justify-center transition-all ${
                      selectedAvatar === av
                        ? "border-primary bg-primary-light/35 scale-105 shadow-md"
                        : "border-neutral-border hover:border-gray-300 hover:bg-gray-50/50 bg-white"
                    }`}
                  >
                    <AvatarKid character={av} size={48} animated={selectedAvatar === av} />
                    <span className="text-[10px] font-black capitalize mt-2 text-gray-600">
                      {av === "star" ? "Bintang" : av === "crescent" ? "Bulan" : av === "sheep" ? "Domba" : "Matahari"}
                    </span>
                    {selectedAvatar === av && (
                      <div className="absolute -top-1.5 -right-1.5 bg-primary text-white p-1 rounded-full border border-primary-dark shadow-sm">
                        <Check size={10} className="stroke-[4]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PREFERENCES SETTINGS */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <Settings size={20} className="text-primary" />
                Pengaturan Akun &amp; Suara
              </h3>
              
              <div className="flex flex-col gap-4">
                {/* Nickname input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-400">Nama Panggilan Kamu</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                    placeholder="Masukkan nama panggilan..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {/* SFX Toggle */}
                  <button
                    onClick={() => setSfxEnabled(!sfxEnabled)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                      sfxEnabled ? "border-primary bg-primary-light/20" : "border-neutral-border bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${sfxEnabled ? "bg-primary/10 text-primary-dark" : "bg-gray-100 text-gray-400"}`}>
                        {sfxEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-gray-700">Efek Suara (SFX)</p>
                        <p className="text-[10px] font-bold text-gray-400">Suara tombol &amp; koin</p>
                      </div>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${sfxEnabled ? "bg-primary" : "bg-gray-200"}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${sfxEnabled ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                  </button>

                  {/* BGM Toggle */}
                  <button
                    onClick={() => setBgmEnabled(!bgmEnabled)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                      bgmEnabled ? "border-primary bg-primary-light/20" : "border-neutral-border bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${bgmEnabled ? "bg-primary/10 text-primary-dark" : "bg-gray-100 text-gray-400"}`}>
                        <Music size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-gray-700">Musik Latar (BGM)</p>
                        <p className="text-[10px] font-bold text-gray-400">Instrumen belajar rileks</p>
                      </div>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${bgmEnabled ? "bg-primary" : "bg-gray-200"}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${bgmEnabled ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* LENCANA (BADGES LIST) */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-secondary" />
                Lencana Prestasi Kamu
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-3.5 p-3 rounded-2xl border-2 transition-all ${
                      badge.unlocked
                        ? "border-neutral-border bg-white"
                        : "border-neutral-border bg-gray-50/50 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border-2 shadow-sm ${
                        badge.unlocked
                          ? "bg-amber-50 border-secondary/20"
                          : "bg-gray-200 border-gray-300"
                      }`}
                    >
                      {badge.unlocked ? badge.emoji : "🔒"}
                    </div>
                    
                    <div className="text-left flex-grow">
                      <h4 className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                        {badge.title}
                        {badge.unlocked && (
                          <span className="text-[8px] bg-secondary-light text-secondary-dark font-black px-1.5 py-0.5 rounded-full border border-secondary/15">
                            AKTIF
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-150 hover:bg-gray-200 text-gray-600 font-extrabold text-base text-center py-3.5 rounded-2xl border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 transition-all"
              >
                Kembali ke Dashboard
              </Link>
              <button
                onClick={handleSave}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Simpan Perubahan 💾
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
