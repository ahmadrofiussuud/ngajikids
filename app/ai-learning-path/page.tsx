"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Settings,
  User,
  Sliders,
  Calendar,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Brain,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { generateAIPath, StudentProfile, AssessmentInput, StudentLevel } from "@/lib/ai/learningPath";

export default function AiLearningPathPage() {
  const [level, setLevel] = useState<StudentLevel>("iqro3");
  const [hijaiyah, setHijaiyah] = useState(80);
  const [tajwid, setTajwid] = useState(75);
  const [retention, setRetention] = useState(80);
  const [weakPoints, setWeakPoints] = useState<string[]>(["Makhraj Huruf Qof"]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleWeakPoint = (wp: string) => {
    setWeakPoints((prev) =>
      prev.includes(wp) ? prev.filter((w) => w !== wp) : [...prev, wp]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profile: StudentProfile = {
      level: level,
      weakPoints: weakPoints,
      streak: 5,
      lastSessionScore: Math.floor((hijaiyah + tajwid) / 2),
      teacherNotes: "Hasil pengulangan mandiri santri.",
    };

    const assessment: AssessmentInput = {
      hijaiyahScore: hijaiyah,
      tajwidScore: tajwid,
      readingSpeed: 45,
      consistencyScore: 85,
      retentionScore: retention,
      lastThreeScores: [70, 75, profile.lastSessionScore],
    };

    setTimeout(() => {
      const pathOutput = generateAIPath(profile, assessment);
      setResult(pathOutput);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito pb-20 text-gray-800 bg-islamic-pattern select-none">


      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div className="text-center mb-10">
          <span className="bg-emerald-50 text-primary-dark border border-primary/20 font-black text-xs px-3.5 py-1.5 rounded-full inline-block uppercase tracking-wider mb-3 shadow-xs">
            AI Engine Simulator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
            AI Learning Path Planner
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Simulasikan bagaimana kecerdasan buatan NgajiKidz menyusun jalur belajar Iqra &amp; jadwal latihan harian santri secara personal berdasarkan input dari Ustadz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Inputs (5 cols) */}
          <form onSubmit={handleGenerate} className="lg:col-span-5 bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-xs flex flex-col gap-5">
            <h3 className="font-extrabold text-base text-gray-850 flex items-center gap-1.5 border-b pb-2">
              <Sliders size={18} className="text-primary" />
              Parameter Evaluasi
            </h3>

            {/* Student Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Tingkatan Iqra Santri</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="border-2 border-neutral-border rounded-xl py-2 px-3 text-xs sm:text-sm font-bold focus:outline-none focus:border-primary bg-white"
              >
                <option value="iqro1">Iqra Jilid 1</option>
                <option value="iqro2">Iqra Jilid 2</option>
                <option value="iqro3">Iqra Jilid 3</option>
                <option value="iqro4">Iqra Jilid 4</option>
                <option value="iqro5">Iqra Jilid 5</option>
                <option value="iqro6">Iqra Jilid 6</option>
                <option value="alquran">Al-Qur'an (Tahsin)</option>
              </select>
            </div>

            {/* Hijaiyah Score Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <span>Nilai Akurasi Makhraj</span>
                <span className="text-primary-dark font-extrabold">{hijaiyah}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={hijaiyah}
                onChange={(e) => setHijaiyah(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Tajwid Score Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <span>Nilai Hukum Tajwid</span>
                <span className="text-primary-dark font-extrabold">{tajwid}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={tajwid}
                onChange={(e) => setTajwid(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Memory Retention Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <span>Daya Ingat (Retensi)</span>
                <span className="text-primary-dark font-extrabold">{retention}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={retention}
                onChange={(e) => setRetention(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Weakness Checkbox */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Catatan Kelemahan Makhraj</label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {["Makhraj Huruf Qof", "Makhraj Huruf Jim", "Harakat Panjang", "Bunyi Tanwin"].map((wp) => {
                  const active = weakPoints.includes(wp);
                  return (
                    <button
                      key={wp}
                      type="button"
                      onClick={() => toggleWeakPoint(wp)}
                      className={`py-1.5 px-2.5 border-2 rounded-xl text-[9px] font-black transition-all ${
                        active
                          ? "bg-amber-50 border-secondary text-secondary-dark"
                          : "bg-white border-neutral-border text-gray-400"
                      }`}
                    >
                      {wp}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center justify-center gap-1.5 shadow-sm mt-3"
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150" />
                </span>
              ) : (
                <>
                  <Brain size={15} />
                  Generasikan Jalur Belajar AI ✨
                </>
              )}
            </button>
          </form>

          {/* Right panel: Output Results (7 cols) */}
          <div className="lg:col-span-7 w-full min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-3 border-neutral-border border-dashed rounded-[32px] p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <Settings size={44} className="text-primary animate-spin mb-3 stroke-[1.5]" />
                  <h4 className="font-extrabold text-sm text-gray-700">Memproses Data Evaluasi...</h4>
                  <p className="text-xs font-semibold text-gray-450 mt-1 max-w-[200px] mx-auto leading-relaxed">
                    AI sedang mengkalkulasi retensi memori dan menyusun jadwal latihan optimal.
                  </p>
                </motion.div>
              )}

              {!loading && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-3 border-neutral-border border-dashed rounded-[32px] p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <Brain size={44} className="text-gray-300 stroke-[1.5] mb-3" />
                  <h4 className="font-extrabold text-sm text-gray-700">Path Hasil Kosong</h4>
                  <p className="text-xs font-semibold text-gray-450 mt-1 max-w-[220px] mx-auto leading-relaxed">
                    Tekan tombol "Generasikan Jalur Belajar AI" di sebelah kiri untuk melihat hasil kalkulasi.
                  </p>
                </motion.div>
              )}

              {!loading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-xs flex flex-col gap-5 text-left h-full"
                >
                  <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-1.5 border-b pb-2">
                    <CheckCircle className="text-primary" size={18} />
                    Rekomendasi Jalur Belajar AI
                  </h3>

                  {/* Badges indicators */}
                  <div className="flex gap-2.5">
                    <div className="bg-emerald-50 border border-primary/20 p-2.5 rounded-xl flex-1 text-center">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Fokus Rekomendasi</span>
                      <span className="text-xs font-black text-primary-dark mt-0.5 block">{result.focusRecommendation}</span>
                    </div>
                    <div className="bg-amber-50 border border-secondary/20 p-2.5 rounded-xl flex-1 text-center">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Penyesuaian Level</span>
                      <span className="text-xs font-black text-secondary-dark mt-0.5 block">{result.difficultyAdjustment === "MAINTAIN" ? "Pertahankan" : result.difficultyAdjustment}</span>
                    </div>
                  </div>

                  {/* Text Insight */}
                  <div className="bg-gradient-to-r from-emerald-50/40 to-amber-50/20 border-2 border-primary-light p-4 rounded-2xl">
                    <h4 className="text-[9px] font-black text-primary-dark uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles size={12} className="fill-primary text-primary-dark stroke-none" />
                      Analisis Kecerdasan Buatan (AI)
                    </h4>
                    <p className="text-xs font-extrabold text-gray-700 leading-relaxed italic">
                      "{result.plainLanguageInsight}"
                    </p>
                  </div>

                  {/* Weekly Schedule */}
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2.5">Jadwal Latihan Mandiri 5 Hari:</h4>
                    <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {result.weeklySchedule.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 border border-gray-150 p-3 rounded-xl gap-2">
                          <span className="text-[9px] font-black text-gray-550 bg-white border px-2 py-0.5 rounded-lg shrink-0">
                            {item.day}
                          </span>
                          <span className="text-[10px] font-extrabold text-gray-700 truncate">
                            {item.materialDescription}
                          </span>
                          <span className="text-[9px] font-black bg-primary-light text-primary-dark px-2 py-0.5 rounded-full shrink-0">
                            ⏰ {item.durationMinutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}
