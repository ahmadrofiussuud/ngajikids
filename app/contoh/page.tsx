"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ContohPage() {


  return (
    <div className="min-h-screen bg-[#faf8f5] bg-[radial-gradient(#dcd9d4_1.5px,transparent_1.5px)] bg-[size:24px_24px] font-fredoka flex flex-col selection:bg-emerald-100 selection:text-emerald-800 relative">
      
      {/* HEADER NAVBAR */}
      <header className="py-5 px-6 sm:px-12 w-full max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-[#0E6E4E] p-2.5 rounded-2xl border-2 border-emerald-950 shadow-sm">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-950">
            Ngaji<span className="text-[#E5983A]">Kidz</span>
          </span>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-extrabold text-emerald-900/60">
          <a href="#misi" className="hover:text-emerald-950 transition-colors">Misi</a>
          <a href="#lencana" className="hover:text-emerald-950 transition-colors">Lencana</a>
          <a href="#orangtua" className="hover:text-emerald-950 transition-colors">Orangtua</a>
        </nav>

        {/* Right Action */}
        <Link
          href="/"
          className="bg-[#0E6E4E] hover:bg-[#0A5239] text-white font-extrabold text-sm py-2.5 px-6 rounded-full shadow-sm transition-all active:scale-95"
        >
          Masuk/Daftar
        </Link>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col justify-between max-w-5xl mx-auto w-full px-4 sm:px-6 pt-12 pb-24 relative z-10">
        
        {/* Top Centered Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#f2efe9] border border-[#dcd9d4] px-5 py-2 rounded-full text-[13px] font-black text-emerald-900/80 flex items-center gap-1.5 shadow-sm">
            <span>🕌</span> Ciptakan Kebiasaan Mengaji yang Menyenangkan!
          </div>
        </div>

        {/* Title Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-emerald-950 tracking-tight leading-[1.05] uppercase">
            Fasih Ngaji, Seru, <br />
            <span className="relative inline-block text-[#0E6E4E]">
              Ora Boring.
              {/* Brush Stroke Underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-full h-5 text-[#E5983A]/30 -z-10" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0,5 Q25,9 50,5 T100,5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Description & Buttons Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-12 w-full max-w-4xl mx-auto border-t border-[#e6e4e0] pt-8">
          {/* Paragraph */}
          <div className="flex-1 text-left max-w-lg">
            <p className="text-sm sm:text-base text-emerald-900/70 font-semibold leading-relaxed">
              Metode belajar mengaji interaktif khas <strong className="text-emerald-950 font-black">NgajiKidz</strong> menggabungkan teknologi <strong className="text-[#0E6E4E] font-black">AI Makhraj Tracker</strong> dengan gamifikasi islami yang disukai anak-anak. Menghilangkan rasa jenuh belajar hijaiyah secara instan!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Link
              href="/login"
              className="bg-[#0E6E4E] hover:bg-[#0A5239] text-white font-extrabold text-sm py-4 px-8 rounded-full shadow-lg flex items-center gap-1.5 transition-all active:scale-95"
            >
              Mulai Belajar
              <ChevronRight size={18} />
            </Link>
            <Link
              href="/"
              className="bg-white hover:bg-gray-50 text-emerald-950 font-extrabold text-sm py-4 px-8 rounded-full border-2 border-[#dcd9d4] shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
            >
              📅 Jadwal Trial
            </Link>
          </div>
        </div>

        {/* Splash Quran Mascot Scene */}
        <div className="mt-16 relative w-full flex justify-center h-[340px] items-center">
          
          {/* Glowing Radial Halo */}
          <div className="absolute w-72 h-72 bg-[#E5983A]/10 rounded-full filter blur-3xl -z-10" />

          {/* Splash Rings (Background Decoration) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 border-2 border-dashed border-[#e6e4e0] rounded-full -z-10"
          />

          {/* Glowing Stars Decoration */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute top-10 left-[18%] text-[#E5983A] text-2xl"
          >
            ★
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-[15%] text-[#E5983A] text-xl"
          >
            ★
          </motion.div>

          {/* Main Floating Mascot SVG: Open Qur'an (Al-Qur'an) */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-72 h-72 md:w-96 md:h-96 z-10 drop-shadow-2xl"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="rehalDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5c3818" />
                  <stop offset="100%" stopColor="#3d230e" />
                </linearGradient>
                <linearGradient id="rehalLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#855227" />
                  <stop offset="100%" stopColor="#5c3818" />
                </linearGradient>
                <linearGradient id="coverDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#022c22" />
                </linearGradient>
                <linearGradient id="coverLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0e9f6e" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fcd34d" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>

              {/* Rehal (Wooden Stand) */}
              {/* Left Leg */}
              <path 
                d="M 80 320 L 160 250 L 200 275 L 120 345 Z" 
                fill="url(#rehalDark)" 
                stroke="#291405" 
                strokeWidth="3" 
                strokeLinejoin="round" 
              />
              {/* Right Leg */}
              <path 
                d="M 320 320 L 240 250 L 200 275 L 280 345 Z" 
                fill="url(#rehalLight)" 
                stroke="#291405" 
                strokeWidth="3" 
                strokeLinejoin="round" 
              />
              {/* Left Support */}
              <path 
                d="M 160 250 L 200 210 L 225 225 L 185 265 Z" 
                fill="url(#rehalDark)" 
                stroke="#291405" 
                strokeWidth="3" 
                strokeLinejoin="round" 
              />
              {/* Right Support */}
              <path 
                d="M 240 250 L 200 210 L 175 225 L 215 265 Z" 
                fill="url(#rehalLight)" 
                stroke="#291405" 
                strokeWidth="3" 
                strokeLinejoin="round" 
              />
              {/* Diamond Cut-out */}
              <polygon points="200,265 208,275 200,285 192,275" fill="#faf8f5" />

              {/* Qur'an Book Cover */}
              {/* Left Cover */}
              <path 
                d="M 200 210 C 130 195, 70 205, 30 170 C 45 135, 110 125, 200 145 Z" 
                fill="url(#coverDark)" 
                stroke="#022c22" 
                strokeWidth="4" 
                strokeLinejoin="round" 
              />
              {/* Right Cover */}
              <path 
                d="M 200 210 C 270 195, 330 205, 370 170 C 355 135, 290 125, 200 145 Z" 
                fill="url(#coverLight)" 
                stroke="#022c22" 
                strokeWidth="4" 
                strokeLinejoin="round" 
              />

              {/* Stack of Pages */}
              {/* Bottom Page Layer */}
              <path d="M 200 206 C 133 191, 73 201, 35 166 C 49 132, 112 122, 200 141 Z" fill="#e2dbcf" />
              <path d="M 200 206 C 267 191, 327 201, 365 166 C 351 132, 288 122, 200 141 Z" fill="#d5cebf" />

              {/* Middle Page Layer */}
              <path d="M 200 202 C 136 187, 76 197, 40 162 C 53 129, 114 119, 200 137 Z" fill="#f2ede0" />
              <path d="M 200 202 C 264 187, 324 197, 360 162 C 347 129, 286 119, 200 137 Z" fill="#e7e2d4" />

              {/* Top Page Layer */}
              <path d="M 200 198 C 140 183, 80 193, 45 158 C 57 126, 116 116, 200 133 Z" fill="#FFFDF9" stroke="#e8e5e0" strokeWidth="1" strokeLinejoin="round" />
              <path d="M 200 198 C 260 183, 320 193, 355 158 C 343 126, 284 116, 200 133 Z" fill="#FFFDF9" stroke="#e8e5e0" strokeWidth="1" strokeLinejoin="round" />

              {/* Gold Gilding Page Edges */}
              <path d="M 35 166 L 45 158 L 40 162 Z" fill="url(#goldGradient)" />
              <path d="M 365 166 L 355 158 L 360 162 Z" fill="url(#goldGradient)" />

              {/* Gold Ornament Frames on Pages */}
              <path 
                d="M 185 186 C 145 176, 100 183, 68 158 C 76 138, 120 131, 185 142 Z" 
                fill="none" 
                stroke="url(#goldGradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M 215 186 C 255 176, 300 183, 332 158 C 324 138, 280 131, 215 142 Z" 
                fill="none" 
                stroke="url(#goldGradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Gold Circular Emblem on Pages */}
              <circle cx="126" cy="158" r="8" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
              <circle cx="126" cy="158" r="4" fill="url(#goldGradient)" />
              <circle cx="274" cy="158" r="8" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
              <circle cx="274" cy="158" r="4" fill="url(#goldGradient)" />

              {/* Calligraphy Scripture & Colorful Harakat */}
              {/* Left Page Text */}
              <path d="M 90 148 Q 120 144 160 151" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 102 143 L 108 141" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="135" cy="148" r="2.5" fill="#10B981" />

              <path d="M 85 159 Q 120 155 165 162" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 125 166 L 131 168" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />

              <path d="M 80 170 Q 120 166 170 173" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="110" cy="175" r="2.5" fill="#8B5CF6" />

              <path d="M 75 181 Q 120 177 175 184" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />

              {/* Right Page Text */}
              <path d="M 240 151 Q 280 144 310 148" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 260 143 L 266 141" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="290" cy="150" r="2.5" fill="#3B82F6" />

              <path d="M 235 162 Q 280 155 315 159" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="270" cy="166" r="2.5" fill="#10B981" />

              <path d="M 230 173 Q 280 166 320 170" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />

              <path d="M 225 184 Q 280 177 325 181" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />

              {/* Gold Satin Ribbon/Bookmark */}
              <path 
                d="M 200 133 Q 203 175 197 205 Q 189 235 205 260 L 215 260 Q 197 235 205 205 Q 211 175 200 133 Z" 
                fill="url(#goldGradient)" 
                stroke="#b45309" 
                strokeWidth="1" 
              />
              {/* Ribbon Tassel Fringe */}
              <path d="M 205 260 L 199 282 L 219 282 L 213 260 Z" fill="#d97706" />
              <line x1="200" y1="282" x2="197" y2="292" stroke="#92400e" strokeWidth="2" />
              <line x1="204" y1="282" x2="202" y2="293" stroke="#92400e" strokeWidth="2" />
              <line x1="209" y1="282" x2="208" y2="294" stroke="#92400e" strokeWidth="2" />
              <line x1="214" y1="282" x2="214" y2="293" stroke="#92400e" strokeWidth="2" />
              <line x1="218" y1="282" x2="219" y2="291" stroke="#92400e" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Floating Colorful Hijaiyah Letters */}
          {/* Alif */}
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 left-[28%] text-3xl font-black font-amiri text-rose-500 bg-white shadow-sm border border-neutral-200/50 w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            أ
          </motion.div>
          {/* Ba */}
          <motion.div 
            animate={{ y: [0, -25, 0], x: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-16 left-[20%] text-3xl font-black font-amiri text-emerald-500 bg-white shadow-sm border border-neutral-200/50 w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            ب
          </motion.div>
          {/* Ta */}
          <motion.div 
            animate={{ y: [0, -18, 0], x: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-16 right-[24%] text-3xl font-black font-amiri text-amber-500 bg-white shadow-sm border border-neutral-200/50 w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            ت
          </motion.div>
          {/* Tsa */}
          <motion.div 
            animate={{ y: [0, -22, 0], x: [0, 5, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute bottom-20 right-[22%] text-3xl font-black font-amiri text-indigo-500 bg-white shadow-sm border border-neutral-200/50 w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            ث
          </motion.div>
        </div>

        {/* Floating Bottom Left Badge (Rating) */}
        <div className="absolute bottom-10 left-6 md:left-24 bg-white/95 border-3 border-[#dcd9d4] rounded-[24px] p-4 shadow-sm flex items-center gap-3.5 backdrop-blur-sm">
          <div className="bg-[#E5983A] text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">
            ⭐
          </div>
          <div>
            <div className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest leading-none">RATING PLATFORM</div>
            <div className="text-base font-black text-emerald-950 mt-1">4.9 (10k+ Anak)</div>
          </div>
        </div>

        {/* Floating Bottom Right Badge (AI Verification) */}
        <div className="absolute bottom-10 right-6 md:right-24 bg-[#0E6E4E] border-3 border-emerald-950 rounded-[24px] p-4 shadow-md flex items-center gap-3.5">
          <div className="bg-white text-[#0E6E4E] w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">
            🤖
          </div>
          <div>
            <div className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">TEKNOLOGI AKTIF</div>
            <div className="text-base font-black text-white mt-1">AI Makhraj Tracker</div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 text-center text-xs font-bold text-emerald-900/40 border-t border-[#e6e4e0] relative z-10 bg-white/50">
        <p>© 2026 NgajiKidz. Semua Hak Cipta Dilindungi. Dibuat dengan Cinta untuk Anak Indonesia.</p>
      </footer>
    </div>
  );
}
