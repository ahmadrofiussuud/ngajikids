"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Flame,
  Trophy,
  Coins,
  Play,
  Award,
  Video,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  X,
  Star,
  Clock,
  Compass,
  Lock,
} from "lucide-react";
import Link from "next/link";
import AvatarKid from "@/components/ui/AvatarKid";
import XPBar from "@/components/gamification/XPBar";
import ProgressRing from "@/components/ui/ProgressRing";
import StarBadge from "@/components/gamification/StarBadge";

// Count-up helper component for streak number
function CountUp({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValue = end;
    if (start === endValue) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / endValue), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function StudentDashboard() {
  const [coins, setCoins] = useState(120);
  const [xp, setXp] = useState(150);
  const [level, setLevel] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<string | null>(null);
  
  // Timer countdown simulation
  const [timeLeft, setTimeLeft] = useState(342); // 5 minutes 42 seconds in seconds
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMulaiBelajar = () => {
    // Simulate earning points
    setXp((prev) => {
      const nextXP = prev + 30;
      if (nextXP >= level * 100) {
        setLevel((l) => l + 1);
        return nextXP - level * 100;
      }
      return nextXP;
    });
    setCoins((prev) => prev + 10);
  };

  const claimBadge = (badgeName: string) => {
    setUnlockedBadge(badgeName);
    setShowConfetti(true);
    setCoins((prev) => prev + 50); // bonus coins
  };

  // Framer Motion container variants for staggered animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito relative select-none">
      
      {/* CONFETTI BURST & BADGE EARNED POPUP */}
      <AnimatePresence>
        {showConfetti && unlockedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Confetti particles */}
            {[...Array(24)].map((_, i) => {
              const colors = ["#10B981", "#F59E0B", "#8B5CF6", "#3B82F6", "#FF6B6B"];
              const randomColor = colors[i % colors.length];
              return (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.6) * 400,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1.8,
                    ease: "easeOut",
                  }}
                  className="absolute w-4 h-4 rounded-sm"
                  style={{ backgroundColor: randomColor }}
                />
              );
            })}

            {/* Main Badge Pop Card */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white border-4 border-secondary rounded-[40px] p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowConfetti(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-400 p-2 rounded-full transition-colors"
                >
                  <X size={20} className="stroke-[3]" />
                </button>
              </div>

              <div className="flex justify-center mb-4 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-secondary-light to-transparent rounded-full filter blur-md opacity-50"
                />
                <StarBadge level="🌟" title={unlockedBadge} unlocked />
              </div>

              <h2 className="text-2xl font-black text-gray-800">Luar Biasa! 🎉</h2>
              <p className="text-sm font-semibold text-gray-500 mt-2 leading-relaxed">
                Kamu baru saja mendapatkan lencana <strong className="text-secondary-dark">{unlockedBadge}</strong> dan bonus <strong className="text-primary-dark">50 Koin Emas</strong>!
              </p>

              <button
                onClick={() => setShowConfetti(false)}
                className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-lg py-3 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md"
              >
                Klaim Koin Emas 🪙
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DASHBOARD NAVBAR HEADER */}
      <header className="bg-white border-b-3 border-neutral-border py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-primary-dark">
                Ngaji<span className="text-secondary">Kidz</span>
              </span>
              <span className="bg-primary-light text-primary-dark text-[10px] font-black px-2 py-0.5 rounded-full border border-primary/20">
                STUDENT
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
            {/* Streak Counter */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 bg-red-50 border border-red-100 px-3.5 py-2 rounded-full text-red-500 font-extrabold text-sm sm:text-base cursor-default"
            >
              <Flame size={18} className="fill-red-500 animate-bounce" />
              <span>
                <CountUp end={7} /> Hari
              </span>
            </motion.div>

            {/* Coin Store Link */}
            <Link
              href="/dashboard/shop"
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-secondary/20 hover:border-secondary/40 px-3.5 py-2 rounded-full text-secondary-dark font-extrabold text-sm sm:text-base cursor-pointer transition-all active:scale-95"
              title="Kunjungi Toko Aksesoris Koin Emas"
            >
              <Coins size={18} className="fill-secondary text-secondary-dark stroke-1" />
              <span>{coins} Koin 🛒</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative pl-3 border-l border-gray-200">
              <button
                onClick={() => setLoginOpen(!loginOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-2xl border-2 border-neutral-border hover:border-gray-300 transition-all active:scale-95 bg-white"
              >
                <AvatarKid character="star" size={32} animated />
                <span className="text-xs font-black text-gray-700 hidden sm:inline">Fatih</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              
              <AnimatePresence>
                {loginOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLoginOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white border-3 border-neutral-border rounded-2xl shadow-lg py-2 z-50 flex flex-col text-left font-nunito"
                    >
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setLoginOpen(false)}
                        className="w-full text-left px-4 py-2.5 text-xs font-black text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2"
                      >
                        <span>👦</span> Profil Saya
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setLoginOpen(false)}
                        className="w-full text-left px-4 py-2.5 text-xs font-black text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <span>🚪</span> Keluar
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Greetings Section */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
              Halo, Fatih! 👋
            </h1>
            <p className="text-sm sm:text-base font-semibold text-gray-400 mt-1">
              Siap melanjutkan petualangan mengaji seru hari ini?
            </p>
          </div>
          <div className="w-full sm:w-64">
            <XPBar xp={xp} level={level} />
          </div>
        </div>

        {/* Dashboard Staggered Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Area (Columns 1 & 2) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Daily Quest Highlight Card */}
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-r from-primary-light/10 to-amber-50/20 border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl" />
              
              <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <ProgressRing progress={60} size={92} strokeWidth={9} />
                <div>
                  <span className="text-[10px] bg-primary text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Misi Utama Hari Ini
                  </span>
                  <h3 className="font-extrabold text-xl text-gray-800 mt-2">Iqra 3: Harakat Tanwin (ً ٍ ٌ)</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-1 max-w-sm">
                    Selesaikan materi bunyi tanwin fathatain, kasratain, dan dhommatain untuk membuka modul berikutnya!
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleMulaiBelajar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3 px-8 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center gap-2 flex-shrink-0"
              >
                <Play size={18} fill="currentColor" className="stroke-none" />
                Mulai Belajar
              </motion.button>
            </motion.div>

            {/* Learning Path Level Map */}
            <motion.div
              variants={cardVariants}
              className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col relative"
            >
              <h3 className="font-extrabold text-lg text-gray-800 flex items-center gap-2 mb-6">
                <Compass className="text-primary" size={20} />
                Peta Petualangan 🗺️
              </h3>

              {/* Journey Map Layout */}
              <div className="relative w-full py-8 overflow-hidden bg-gray-50/50 rounded-2xl border border-gray-100 flex justify-center">
                
                {/* SVG & Nodes shared container to keep path and buttons perfectly aligned */}
                <div className="relative w-[360px] h-[480px] flex-shrink-0">
                  
                  {/* SVG Connecting Trail (Marching Ants effect) */}
                  <svg
                    viewBox="0 0 360 480"
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  >
                    <path
                      d="M 180 32 C 250 60, 250 120, 235 152 C 210 180, 110 240, 125 272 C 140 300, 200 360, 180 392"
                      fill="none"
                      stroke="#D1FAE5"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 180 32 C 250 60, 250 120, 235 152 C 210 180, 110 240, 125 272 C 140 300, 200 360, 180 392"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="10 15"
                      className="animate-[dash_8s_linear_infinite]"
                    />
                  </svg>

                  <style jsx>{`
                    @keyframes dash {
                      to {
                        stroke-dashoffset: -200;
                      }
                    }
                  `}</style>

                  {/* Level Nodes */}
                  
                  {/* Level 1: Completed */}
                  <div
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: "180px",
                      top: "32px",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-primary text-white border-4 border-primary-dark rounded-full shadow-lg flex items-center justify-center font-black text-lg z-10"
                      >
                        ✓
                      </motion.button>
                      <div className="absolute left-20 bg-white border border-gray-200 px-3 py-1 rounded-xl shadow-sm text-xs font-black text-gray-650 whitespace-nowrap z-20">
                        Level 1: Hijaiyah Dasar
                      </div>
                    </div>
                  </div>

                  {/* Level 2: Completed */}
                  <div
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: "235px",
                      top: "152px",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-primary text-white border-4 border-primary-dark rounded-full shadow-lg flex items-center justify-center font-black text-lg z-10"
                      >
                        ✓
                      </motion.button>
                      <div className="absolute left-20 bg-white border border-gray-200 px-3 py-1 rounded-xl shadow-sm text-xs font-black text-gray-650 whitespace-nowrap z-20">
                        Level 2: Harakat Pendek
                      </div>
                    </div>
                  </div>

                  {/* Level 3: Active/Current */}
                  <div
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: "125px",
                      top: "272px",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ boxShadow: ["0 0 0 0px rgba(16,185,129,0.4)", "0 0 0 12px rgba(16,185,129,0)"] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="w-16 h-16 bg-secondary text-white border-4 border-secondary-dark rounded-full shadow-lg flex items-center justify-center font-black text-lg z-10"
                      >
                        ⭐️
                      </motion.button>
                      <div className="absolute left-20 bg-white border border-secondary px-3 py-1 rounded-xl shadow-md text-xs font-black text-secondary-dark whitespace-nowrap z-20">
                        Level 3: Bunyi Tanwin 🚀
                      </div>
                    </div>
                  </div>

                  {/* Level 4: Locked */}
                  <div
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: "180px",
                      top: "392px",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <button
                        disabled
                        className="w-16 h-16 bg-gray-200 text-gray-400 border-4 border-gray-300 rounded-full shadow-inner flex items-center justify-center font-black text-lg z-10"
                      >
                        <Lock size={18} />
                      </button>
                      <div className="absolute left-20 bg-white border border-gray-150 px-3 py-1 rounded-xl text-xs font-bold text-gray-400 whitespace-nowrap z-20">
                        Level 4: Mad &amp; Tanda Panjang
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Area (Column 3) */}
          <div className="flex flex-col gap-8">
            
            {/* Upcoming Guru Session Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white border-3 border-neutral-border rounded-[32px] p-5 shadow-sm flex flex-col gap-4 text-left"
            >
              <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-1.5">
                <Video className="text-primary" size={18} />
                Kelas Bersama Guru
              </h3>

              {/* Session Panel */}
              <div className="bg-emerald-50/40 border-2 border-primary-light p-4 rounded-2xl flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-full border border-primary bg-primary-light flex items-center justify-center font-black text-primary-dark">
                    UR
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-800">Ustadz Riza</h4>
                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">Tajwid &amp; Tahsin Anak</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                    <Clock size={14} />
                    <span>Mulai dalam:</span>
                  </div>
                  <span className="text-sm font-black text-primary-dark font-mono">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <button
                  disabled={timeLeft > 300} // enable 5 mins before
                  className={`w-full font-extrabold text-sm py-2.5 px-4 rounded-xl border-b-4 transition-all duration-150 ${
                    timeLeft <= 300
                      ? "bg-primary hover:bg-primary-dark text-white border-primary-dark active:border-b-0 active:translate-y-1 animate-pulse"
                      : "bg-gray-150 text-gray-400 border-gray-300 cursor-not-allowed"
                  }`}
                >
                  Join Sekarang
                </button>
              </div>
            </motion.div>

            {/* Achievement Badge Shelf */}
            <motion.div
              variants={cardVariants}
              className="bg-white border-3 border-neutral-border rounded-[32px] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-1.5">
                  <Award className="text-secondary" size={18} />
                  Rak Lencana 🏆
                </h3>
                <button
                  onClick={() => claimBadge("7-Day Streak")}
                  className="text-[10px] font-black text-primary-dark hover:underline"
                >
                  Klaim Baru
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 justify-items-center">
                <StarBadge level="1" title="Pioneer" unlocked />
                <StarBadge level="2" title="Daily Starter" unlocked />
                <StarBadge level="3" title="7-Day Streak" unlocked={showConfetti && unlockedBadge === "7-Day Streak"} />
                <StarBadge level="4" title="Iqra Master" unlocked={false} xpReward={200} />
              </div>
            </motion.div>

            {/* Quick Learning Stats */}
            <motion.div
              variants={cardVariants}
              className="bg-white border-3 border-neutral-border rounded-[32px] p-5 shadow-sm"
            >
              <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-1.5 mb-4">
                <Trophy className="text-accent" size={18} />
                Statistik Belajar 📊
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">Juz Al-Qur'an</span>
                  <span className="text-sm font-extrabold text-gray-800">Juz 30 (Juz Amma)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">Surah Selesai</span>
                  <span className="text-sm font-extrabold text-gray-800">4 Surah Pendek</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">Total Waktu Belajar</span>
                  <span className="text-sm font-extrabold text-gray-800">120 Menit</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </main>

    </div>
  );
}
