"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, Sparkles, BookOpen, ChevronRight, X, Star } from "lucide-react";
import Link from "next/link";
import { getStudentIqraProgress, IqraProgress } from "@/lib/supabase/iqra";
import StudentHeader from "@/components/layout/StudentHeader";

const iqraBooks = [
  { jilid: 1, title: "Iqra Jilid 1", arabic: "١", desc: "Mengenal huruf hijaiyah tunggal fathah (ا sampai ي).", colorClass: "from-emerald-400 to-teal-500 text-teal-950 border-teal-600" },
  { jilid: 2, title: "Iqra Jilid 2", arabic: "٢", desc: "Membaca huruf sambung pendek dan harakat mad asli (panjang).", colorClass: "from-sky-400 to-blue-500 text-blue-950 border-blue-600" },
  { jilid: 3, title: "Iqra Jilid 3", arabic: "٣", desc: "Mengenal harakat kasrah (ِ), dhommah (ُ), sukun, dan mad wajib.", colorClass: "from-amber-400 to-orange-500 text-orange-950 border-orange-650" },
  { jilid: 4, title: "Iqra Jilid 4", arabic: "٤", desc: "Mempelajari bunyi tanwin (ً ٍ ٌ), sukun (mati), dan qalqalah dasar.", colorClass: "from-purple-400 to-indigo-500 text-indigo-950 border-indigo-600" },
  { jilid: 5, title: "Iqra Jilid 5", arabic: "٥", desc: "Membaca hukum tajwid tasydid (ّ), ghunnah, idgham, dan ikhfa.", colorClass: "from-rose-400 to-pink-500 text-pink-950 border-pink-600" },
  { jilid: 6, title: "Iqra Jilid 6", arabic: "٦", desc: "Melatih waqaf (berhenti), washal (sambung), serta tartil Al-Qur'an.", colorClass: "from-fuchsia-500 to-violet-600 text-violet-950 border-violet-750" },
];

export default function IqraShelfPage() {
  const [progress, setProgress] = useState<IqraProgress | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Celebration for newly unlocked volume
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationJilid, setCelebrationJilid] = useState<number | null>(null);

  useEffect(() => {
    async function loadProgress() {
      try {
        const studentId = "child_1"; // Default active student
        const p = await getStudentIqraProgress(studentId);
        setProgress(p);

        // Check if there's a newly unlocked jilid
        const lastSeenStr = localStorage.getItem(`ngajikids_last_seen_jilid_${studentId}`);
        if (lastSeenStr) {
          const lastSeen = parseInt(lastSeenStr, 10);
          if (p.current_jilid > lastSeen && p.current_jilid <= 6) {
            // Student graduated to a higher level since last page load!
            setCelebrationJilid(p.current_jilid);
            setShowCelebration(true);
          }
        }
        // Save current level to localStorage
        localStorage.setItem(`ngajikids_last_seen_jilid_${studentId}`, p.current_jilid.toString());
      } catch (err) {
        console.error("Gagal memuat progres Iqra:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  const closeCelebration = () => {
    setShowCelebration(false);
  };

  const currentJilid = progress?.current_jilid || 1;
  const passedJilids = progress?.passed_jilid || [];

  return (
    <div className="min-h-screen bg-neutral-warm pb-20 font-nunito text-gray-800 text-left relative">
      <StudentHeader />

      {/* NEW VOLUME UNLOCKED CELEBRATION MODAL */}
      <AnimatePresence>
        {showCelebration && celebrationJilid && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Confetti particles */}
            {[...Array(30)].map((_, i) => {
              const colors = ["#10B981", "#F59E0B", "#8B5CF6", "#3B82F6", "#EC4899"];
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
                    scale: [0.6, 1.4, 0.6],
                    x: (Math.random() - 0.5) * 500,
                    y: (Math.random() - 0.7) * 450,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2.2,
                    ease: "easeOut",
                  }}
                  className="absolute w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: randomColor }}
                />
              );
            })}

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white border-4 border-emerald-500 rounded-[40px] p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <button
                onClick={closeCelebration}
                className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 border p-1.5 rounded-full text-gray-400 transition-colors"
              >
                <X size={18} className="stroke-[3]" />
              </button>

              <div className="flex justify-center mb-4 relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  className="absolute inset-0 bg-emerald-100 rounded-full filter blur-md opacity-60"
                />
                <div className="w-20 h-20 bg-emerald-50 border-3 border-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-inner relative z-10">
                  📖
                </div>
              </div>

              <h2 className="text-2xl font-black text-gray-800">Barakallah! 🎉</h2>
              <h3 className="text-lg font-extrabold text-emerald-600 mt-1">Iqra Jilid {celebrationJilid} Terbuka!</h3>
              <p className="text-xs font-semibold text-gray-500 mt-3 leading-relaxed">
                Hebat sekali! Guru telah menyatakan kamu lulus ujian sebelumnya. Yuk, mari lanjut berpetualang membaca di jilid yang baru!
              </p>

              <button
                onClick={closeCelebration}
                className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Sparkles size={16} className="fill-white stroke-none" />
                Mulai Baca Jilid {celebrationJilid}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 flex flex-col gap-8">
        
        {/* Title header */}
        <div className="text-center sm:text-left">
          <span className="bg-primary-light text-primary-dark border border-primary/20 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-3 shadow-sm">
            🕌 Modul Mengaji Mandiri
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight leading-tight">
            Rak Buku Iqra Berjenjang
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-2">
            Mulai dari Iqra 1 hingga tamat Iqra 6. Setiap jilid akan terbuka secara bertahap setelah divalidasi oleh ustadz/ustazah.
          </p>
        </div>

        {/* Shelf Books Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border-3 border-neutral-border rounded-[36px] p-6 h-64 animate-pulse flex flex-col gap-4">
                <div className="w-16 h-20 bg-gray-200 rounded-lg" />
                <div className="w-32 h-6 bg-gray-200 rounded" />
                <div className="w-full h-12 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iqraBooks.map((book) => {
              const isLocked = book.jilid > currentJilid;
              const isActiveJilid = book.jilid === currentJilid;
              const isPassed = passedJilids.includes(book.jilid);

              return (
                <motion.div
                  key={book.jilid}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (book.jilid - 1) * 0.08 }}
                  whileHover={!isLocked ? { y: -6, scale: 1.01 } : {}}
                  className={`bg-white border-3 border-neutral-border rounded-[36px] p-6 shadow-sm flex flex-col justify-between h-64 relative overflow-hidden transition-all ${
                    isLocked ? "bg-gray-50/70 select-none" : "hover:shadow-md"
                  }`}
                >
                  {/* Lock Overlay Graphic */}
                  {isLocked && (
                    <div className="absolute top-4 right-4 bg-gray-100 text-gray-400 p-2 rounded-2xl border border-gray-200 flex items-center justify-center">
                      <Lock size={16} className="stroke-[2.5]" />
                    </div>
                  )}

                  {/* Badges indicators for active or completed */}
                  {!isLocked && (
                    <div className="absolute top-4 right-4 flex gap-1">
                      {isPassed && (
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase select-none shadow-sm animate-pulse">
                          <CheckCircle2 size={12} className="stroke-[3]" />
                          Lulus
                        </span>
                      )}
                      {isActiveJilid && (
                        <span className="bg-amber-50 text-secondary-dark border border-secondary/20 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase select-none shadow-sm">
                          <BookOpen size={12} />
                          Membaca
                        </span>
                      )}
                    </div>
                  )}

                  {/* Cover volume info */}
                  <div className="flex gap-4 items-start text-left mt-2">
                    {/* Visual mini-book cover */}
                    <div
                      className={`w-14 h-20 rounded-xl bg-gradient-to-br border-2 shadow-md flex flex-col items-center justify-between p-1.5 select-none ${book.colorClass} ${
                        isLocked ? "grayscale opacity-50" : ""
                      }`}
                    >
                      <span className="text-[10px] font-black tracking-wide leading-none">IQRA</span>
                      <span className="text-3xl font-black font-serif leading-none mt-1">{book.arabic}</span>
                      <span className="text-[9px] font-extrabold tracking-wide uppercase leading-none">Vol {book.jilid}</span>
                    </div>

                    <div className="flex-grow pr-12">
                      <h3 className={`font-black text-lg text-gray-800 ${isLocked ? "text-gray-400" : ""}`}>
                        {book.title}
                      </h3>
                      <p className={`text-xs font-semibold text-gray-400 mt-2 leading-relaxed line-clamp-3 ${isLocked ? "text-gray-300" : ""}`}>
                        {book.desc}
                      </p>
                    </div>
                  </div>

                  {/* Action card bottom bar */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    {isLocked ? (
                      <span className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                        🔒 Selesaikan Jilid {book.jilid - 1} terlebih dahulu
                      </span>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold text-gray-400">
                          {isPassed ? "Telah diselesaikan ✨" : "Sedang dipelajari saat ini"}
                        </span>
                        
                        <Link
                          href={`/dashboard/iqra/${book.jilid}`}
                          className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center gap-1 shadow-sm"
                        >
                          Buka Buku
                          <ChevronRight size={13} className="stroke-[3]" />
                        </Link>
                      </>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
