"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  User,
  Plus,
  Send,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { generateAIPath, StudentProfile, AssessmentInput, LearningPathOutput } from "@/lib/ai/learningPath";
import TeacherHeader from "@/components/layout/TeacherHeader";

interface Student {
  id: string;
  name: string;
  level: "iqro1" | "iqro2" | "iqro3" | "iqro4" | "iqro5" | "iqro6" | "alquran";
  streak: number;
  lastSessionScore: number;
  notes: string;
  weakPoints: string[];
  gmeetJoined: number;
  gmeetTotal: number;
  lastSessionStatus: "hadir" | "bolos";
}

const initialStudents: Student[] = [
  {
    id: "child_1",
    name: "Ahmad Fatih",
    level: "iqro3",
    streak: 7,
    lastSessionScore: 88,
    notes: "Fokus membaca sangat baik, perlu bimbingan tajwid dasar.",
    weakPoints: ["Qalqalah (Bouncing)", "Makhraj Huruf Qof"],
    gmeetJoined: 12,
    gmeetTotal: 15,
    lastSessionStatus: "hadir",
  },
  {
    id: "child_2",
    name: "Rian Kurniawan",
    level: "iqro2",
    streak: 3,
    lastSessionScore: 80,
    notes: "Lancar di halaman 15, sedang melatih sambung huruf.",
    weakPoints: ["Huruf Sambung", "Fathatain"],
    gmeetJoined: 9,
    gmeetTotal: 12,
    lastSessionStatus: "hadir",
  },
  {
    id: "child_3",
    name: "Zahra Humaira",
    level: "iqro1",
    streak: 0,
    lastSessionScore: 65,
    notes: "Mulai melatih makhraj huruf Kho dan Jim.",
    weakPoints: ["Makhraj Huruf Kho", "Makhraj Huruf Jim"],
    gmeetJoined: 5,
    gmeetTotal: 10,
    lastSessionStatus: "hadir",
  },
];

export default function TeacherPortal() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const toggleAttendance = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const nextStatus = s.lastSessionStatus === "hadir" ? "bolos" : "hadir";
          const joinedDiff = nextStatus === "bolos" ? -1 : 1;
          return {
            ...s,
            lastSessionStatus: nextStatus,
            gmeetJoined: Math.max(0, Math.min(s.gmeetTotal, s.gmeetJoined + joinedDiff)),
          };
        }
        return s;
      })
    );

    // Sync with selected student if currently viewing their report form
    setSelectedStudent((prev) => {
      if (prev && prev.id === studentId) {
        const nextStatus = prev.lastSessionStatus === "hadir" ? "bolos" : "hadir";
        const joinedDiff = nextStatus === "bolos" ? -1 : 1;
        return {
          ...prev,
          lastSessionStatus: nextStatus,
          gmeetJoined: Math.max(0, Math.min(prev.gmeetTotal, prev.gmeetJoined + joinedDiff)),
        };
      }
      return prev;
    });
  };

  const calculateAIWeight = (student: Student) => {
    const attendanceRate = student.gmeetTotal > 0 ? (student.gmeetJoined / student.gmeetTotal) * 100 : 0;
    // Evaluation score counts for 70%, attendance rate counts for 30%
    let weight = (student.lastSessionScore * 0.7) + (attendanceRate * 0.3);
    if (student.lastSessionStatus === "bolos") {
      weight -= 15; // Apply attendance penalty
    }
    return Math.max(0, Math.min(100, parseFloat(weight.toFixed(1))));
  };
  
  // Form States for Lesson Report
  const [material, setMaterial] = useState("Iqra 3 Halaman 12");
  const [hijaiyahScore, setHijaiyahScore] = useState(85);
  const [tajwidScore, setTajwidScore] = useState(80);
  const [speedScore, setSpeedScore] = useState(75);
  const [retentionScore, setRetentionScore] = useState(80);
  const [weakPoints, setWeakPoints] = useState<string[]>(["Qalqalah (Bouncing Sound)"]);
  const [teacherNotes, setTeacherNotes] = useState("");

  // AI Response modal
  const [aiReportResult, setAiReportResult] = useState<LearningPathOutput | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const toggleWeakPoint = (point: string) => {
    setWeakPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const handleOpenReportForm = (student: Student) => {
    setSelectedStudent(student);
    setMaterial(`Iqra ${student.level.slice(-1)} Halaman 10`);
    setTeacherNotes(student.notes);
    setAiReportResult(null);
  };

  const handleSendReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setLoadingAI(true);

    // Call actual AI learningPath engine
    const profile: StudentProfile = {
      level: selectedStudent.level,
      weakPoints: weakPoints,
      streak: selectedStudent.streak,
      lastSessionScore: Math.floor((hijaiyahScore + tajwidScore) / 2),
      teacherNotes: teacherNotes,
    };

    const assessment: AssessmentInput = {
      hijaiyahScore,
      tajwidScore,
      readingSpeed: speedScore,
      consistencyScore: selectedStudent.streak > 3 ? 90 : 70,
      retentionScore,
      lastThreeScores: [selectedStudent.lastSessionScore, profile.lastSessionScore],
    };

    // Simulate AI calculation delay
    setTimeout(() => {
      const output = generateAIPath(profile, assessment);
      setAiReportResult(output);
      setLoadingAI(false);
      setShowResultModal(true);
      setSelectedStudent(null); // Close form
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito text-gray-800">
      
      {/* AI WEEKLY PLAN GENERATED SUCCESS MODAL */}
      <AnimatePresence>
        {showResultModal && aiReportResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-primary rounded-[40px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowResultModal(false)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-400 p-2 rounded-full transition-colors"
              >
                <X size={18} className="stroke-[3]" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-emerald-50 border-2 border-primary text-primary p-3 rounded-full mb-3">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-black text-gray-800">Laporan &amp; Analisis AI Sukses!</h2>
                <p className="text-xs font-semibold text-gray-400 mt-1">
                  AI telah memproses makhraj tajwid dan memperbarui rencana mingguan anak.
                </p>
              </div>

              {/* AI insight display */}
              <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border-2 border-primary-light p-4 rounded-2xl mb-4 text-left">
                <h4 className="text-xs font-black text-primary-dark uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles size={14} className="fill-primary text-primary-dark stroke-none" />
                  Rekomendasi Jalur AI
                </h4>
                <p className="text-sm font-extrabold text-gray-700 leading-relaxed">
                  "{aiReportResult.plainLanguageInsight}"
                </p>
              </div>

              {/* Weekly schedule preview */}
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 text-left">
                Rencana Belajar 5 Hari Baru:
              </h4>
              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                {aiReportResult.weeklySchedule.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 border border-gray-150 p-3 rounded-xl">
                    <span className="text-xs font-black text-gray-500 bg-white border px-2 py-0.5 rounded-lg">
                      {item.day}
                    </span>
                    <span className="text-xs font-extrabold text-gray-700 text-right truncate max-w-[200px]">
                      {item.materialDescription}
                    </span>
                    <span className="text-[10px] font-black bg-primary-light text-primary-dark px-2 py-0.5 rounded-full">
                      {item.durationMinutes}m
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowResultModal(false)}
                className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md"
              >
                Kembali ke Kelas 🎓
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER NAVBAR */}
      <TeacherHeader />

      {/* MAIN LAYOUT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (1 & 2): Students list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
            <h2 className="font-extrabold text-lg text-gray-800 flex items-center gap-2 mb-4">
              <Users className="text-primary" size={20} />
              Daftar Santri Bimbingan
            </h2>

            <div className="flex flex-col gap-3">
              {students.map((student) => {
                const attendanceRate = student.gmeetTotal > 0 ? (student.gmeetJoined / student.gmeetTotal) * 100 : 0;
                const aiWeight = calculateAIWeight(student);
                
                return (
                  <div
                    key={student.id}
                    className="flex flex-col p-5 bg-white rounded-3xl border-3 border-neutral-border gap-4 shadow-sm relative overflow-hidden"
                  >
                    {/* Top indicator line for attendance status */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${student.lastSessionStatus === "hadir" ? "bg-primary" : "bg-red-500 animate-pulse"}`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: profile & basic info */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full border-2 border-primary bg-primary-light flex items-center justify-center text-primary-dark font-black text-lg select-none">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-gray-800 flex items-center gap-2">
                            {student.name}
                            <span className="text-[10px] bg-secondary-light text-secondary-dark font-black px-2 py-0.5 rounded-full border border-secondary/20 uppercase">
                              {student.level}
                            </span>
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-gray-400">
                              Streak: 🔥 {student.streak} Hari
                            </span>
                            <span className="text-gray-200 text-[10px]">•</span>
                            <span className="text-xs font-extrabold text-gray-500 bg-neutral-warm/30 px-2.5 py-0.5 rounded-md border border-neutral-border">
                              Pencapaian: {student.level === "iqro3" ? "Iqra 3 (Lvl 3)" : student.level === "iqro2" ? "Iqra 2 (Lvl 2)" : "Iqra 1 (Lvl 1)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: action buttons */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => toggleAttendance(student.id)}
                          className={`font-black text-xs py-2 px-3 rounded-xl border-b-2 transition-all flex items-center gap-1 active:border-b-0 active:translate-y-[1px] ${
                            student.lastSessionStatus === "hadir"
                              ? "bg-red-50 hover:bg-red-100 text-red-500 border-red-200"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200"
                          }`}
                          title="Tandai Kehadiran Santri kemarin"
                        >
                          {student.lastSessionStatus === "hadir" ? "Mark Bolos ❌" : "Mark Hadir ✅"}
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleOpenReportForm(student)}
                          className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-2 px-3 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center gap-1"
                        >
                          <FileText size={14} />
                          Buat Laporan
                        </button>
                      </div>
                    </div>

                    {/* Middle: Focus Area (Weak points), Attendance tracker rate, and AI Weight Score */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3.5 border-t border-neutral-border mt-1">
                      {/* Weak points */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Fokus Perbaikan (Salah)</span>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {student.weakPoints.map((wp) => (
                            <span key={wp} className="text-[10px] bg-amber-50 text-secondary-dark border border-secondary/20 px-2 py-0.5 rounded-lg font-bold">
                              ⚠️ {wp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Attendance logs */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Kehadiran GMeet</span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-grow bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200 relative">
                            <div
                              className={`h-full transition-all duration-500 rounded-full ${student.lastSessionStatus === "hadir" ? "bg-primary" : "bg-amber-500"}`}
                              style={{ width: `${attendanceRate}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-gray-700 min-w-[65px] text-right">
                            {student.gmeetJoined}/{student.gmeetTotal} ({attendanceRate.toFixed(0)}%)
                          </span>
                        </div>
                      </div>

                      {/* AI weight */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Bobot Penilaian AI</span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-base font-black tracking-tight ${student.lastSessionStatus === "hadir" ? "text-primary-dark" : "text-red-500 font-black animate-pulse"}`}>
                            {aiWeight}%
                          </span>
                          {student.lastSessionStatus === "hadir" ? (
                            <span className="text-[8px] bg-emerald-50 text-primary-dark font-black px-1.5 py-0.5 rounded border border-primary/20">
                              OPTIMAL
                            </span>
                          ) : (
                            <span className="text-[8px] bg-red-50 text-red-500 font-black px-1.5 py-0.5 rounded border border-red-200 animate-bounce">
                              ⚠️ PENALTI BOLOS -15%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form for reporting */}
        <div className="lg:col-span-1">
          {selectedStudent ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-5 sticky top-24"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-gray-800">Laporan Mengaji</h3>
                  <p className="text-[10px] font-bold text-gray-400">Santri: {selectedStudent.name}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="bg-gray-50 hover:bg-gray-150 text-gray-400 p-1.5 rounded-xl transition-colors border"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSendReportSubmit} className="flex flex-col gap-4">
                {/* Lesson Materials target */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Materi Halaman / Ayat
                  </label>
                  <input
                    type="text"
                    required
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="border-2 border-neutral-border rounded-xl py-2 px-3 text-sm font-bold focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Score hijaiyah */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    <span>Akurasi Makhraj (Hijaiyah)</span>
                    <span className="text-primary-dark font-extrabold text-sm">{hijaiyahScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={hijaiyahScore}
                    onChange={(e) => setHijaiyahScore(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Score tajwid */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    <span>Hukum Tajwid</span>
                    <span className="text-primary-dark font-extrabold text-sm">{tajwidScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={tajwidScore}
                    onChange={(e) => setTajwidScore(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Score retention */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    <span>Kekuatan Ingatan (Retensi)</span>
                    <span className="text-primary-dark font-extrabold text-sm">{retentionScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={retentionScore}
                    onChange={(e) => setRetentionScore(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Weak points checkbox options */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Fokus Perbaikan Makhraj
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {["Qalqalah (Memantul)", "Tanwin (ً ٍ ٌ)", "Harakat Panjang", "Idgham / Ikhfa"].map((point) => {
                      const selected = weakPoints.includes(point);
                      return (
                        <button
                          key={point}
                          type="button"
                          onClick={() => toggleWeakPoint(point)}
                          className={`py-2 px-3 border-2 rounded-xl text-left text-[10px] sm:text-xs font-black transition-all ${
                            selected
                              ? "bg-amber-50 border-secondary text-secondary-dark"
                              : "bg-white border-neutral-border text-gray-400"
                          }`}
                        >
                          {point}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Teacher evaluation notes text */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Catatan Khusus Ustadz
                  </label>
                  <textarea
                    rows={3}
                    value={teacherNotes}
                    onChange={(e) => setTeacherNotes(e.target.value)}
                    placeholder="Beri arahan untuk dilatih di rumah..."
                    className="border-2 border-neutral-border rounded-xl py-2 px-3 text-xs font-bold focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingAI}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3 px-4 rounded-xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center justify-center gap-1.5 shadow-sm mt-2"
                >
                  {loadingAI ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150" />
                    </span>
                  ) : (
                    <>
                      <Send size={14} />
                      Kirim &amp; Proses AI Path
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="bg-gray-50 border-2 border-neutral-border border-dashed rounded-[32px] p-8 text-center text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
              <FileText size={48} className="text-gray-300 stroke-[1.5] mb-3" />
              <h4 className="font-extrabold text-sm text-gray-700">Form Laporan Kosong</h4>
              <p className="text-xs font-bold text-gray-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                Pilih salah satu santri di sebelah kiri untuk mengisi evaluasi materi ngaji.
              </p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
