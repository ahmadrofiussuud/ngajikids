"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  X,
  Star,
  Award,
  ChevronLeft,
  BookOpen,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import KidReadingQuran from "@/components/animations/KidReadingQuran";

// Define the 6 illustrated kid avatars
interface AvatarOption {
  id: string;
  name: string;
  renderSVG: (selected: boolean) => React.ReactNode;
}

const avatarOptions: AvatarOption[] = [
  {
    id: "fatih",
    name: "Fatih (Kopiah Hijau)",
    renderSVG: (sel) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={sel ? "#D1FAE5" : "#F3F4F6"} stroke={sel ? "#10B981" : "#D1D5DB"} strokeWidth="3" />
        <circle cx="50" cy="54" r="24" fill="#FFEAE2" />
        <ellipse cx="32" cy="54" r="5" ry="3" fill="#FF8A8A" opacity="0.5" />
        <ellipse cx="68" cy="54" r="5" ry="3" fill="#FF8A8A" opacity="0.5" />
        <circle cx="40" cy="50" r="3" fill="#2C1A0E" />
        <circle cx="60" cy="50" r="3" fill="#2C1A0E" />
        <path d="M 44 60 Q 50 65 56 60" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" />
        {/* Green Kopiah */}
        <path d="M 30 38 Q 50 24 70 38 L 68 30 Q 50 18 32 30 Z" fill="#0F9D58" stroke="#065F46" strokeWidth="2.5" />
        <path d="M 31 35 Q 50 23 69 35" fill="none" stroke="#F59E0B" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "aisyah",
    name: "Aisyah (Hijab Pink)",
    renderSVG: (sel) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={sel ? "#FEE2E2" : "#F3F4F6"} stroke={sel ? "#FF6B6B" : "#D1D5DB"} strokeWidth="3" />
        {/* Hijab background frame */}
        <path d="M 24 54 C 24 25 76 25 76 54 C 76 80 24 80 24 54 Z" fill="#F472B6" />
        <circle cx="50" cy="52" r="20" fill="#FFEAE2" />
        <circle cx="42" cy="48" r="3" fill="#2C1A0E" />
        <circle cx="58" cy="48" r="3" fill="#2C1A0E" />
        <path d="M 45 58 Q 50 62 55 58" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" />
        {/* Hijab under-cap */}
        <path d="M 32 42 Q 50 32 68 42 Z" fill="#F59E0B" />
        {/* Rosy cheeks */}
        <ellipse cx="36" cy="53" r="4" ry="2" fill="#FF8A8A" opacity="0.6" />
        <ellipse cx="64" cy="53" r="4" ry="2" fill="#FF8A8A" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "zaid",
    name: "Zaid (Sorban Orange)",
    renderSVG: (sel) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={sel ? "#FEF3C7" : "#F3F4F6"} stroke={sel ? "#F59E0B" : "#D1D5DB"} strokeWidth="3" />
        <circle cx="50" cy="54" r="24" fill="#FFEAE2" />
        <circle cx="40" cy="50" r="3" fill="#2C1A0E" />
        <circle cx="60" cy="50" r="3" fill="#2C1A0E" />
        <path d="M 44 60 Q 50 65 56 60" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" />
        {/* Orange Headband */}
        <rect x="25" y="26" width="50" height="12" rx="4" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
        <path d="M 28 26 L 36 14 L 46 26 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "khadijah",
    name: "Khadijah (Hijab Biru)",
    renderSVG: (sel) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={sel ? "#DBEAFE" : "#F3F4F6"} stroke={sel ? "#3B82F6" : "#D1D5DB"} strokeWidth="3" />
        <path d="M 24 54 C 24 25 76 25 76 54 C 76 80 24 80 24 54 Z" fill="#60A5FA" />
        <circle cx="50" cy="52" r="20" fill="#FFEAE2" />
        <circle cx="42" cy="48" r="3" fill="#2C1A0E" />
        <circle cx="58" cy="48" r="3" fill="#2C1A0E" />
        <path d="M 45 58 Q 50 62 55 58" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 32 42 Q 50 32 68 42 Z" fill="#10B981" />
        <ellipse cx="36" cy="53" r="4" ry="2" fill="#FF8A8A" opacity="0.6" />
        <ellipse cx="64" cy="53" r="4" ry="2" fill="#FF8A8A" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "ali",
    name: "Ali (Peci Putih)",
    renderSVG: (sel) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={sel ? "#E0F2FE" : "#F3F4F6"} stroke={sel ? "#0EA5E9" : "#D1D5DB"} strokeWidth="3" />
        <circle cx="50" cy="54" r="24" fill="#FFEAE2" />
        <circle cx="40" cy="50" r="3" fill="#2C1A0E" />
        <circle cx="60" cy="50" r="3" fill="#2C1A0E" />
        <path d="M 44 60 Q 50 65 56 60" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" />
        {/* White Peci */}
        <path d="M 30 38 Q 50 25 70 38 L 68 31 Q 50 18 32 31 Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "fatima",
    name: "Fatima (Hijab Kuning)",
    renderSVG: (sel) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={sel ? "#FEF3C7" : "#F3F4F6"} stroke={sel ? "#F59E0B" : "#D1D5DB"} strokeWidth="3" />
        <path d="M 24 54 C 24 25 76 25 76 54 C 76 80 24 80 24 54 Z" fill="#FBBF24" />
        <circle cx="50" cy="52" r="20" fill="#FFEAE2" />
        <circle cx="42" cy="48" r="3" fill="#2C1A0E" />
        <circle cx="58" cy="48" r="3" fill="#2C1A0E" />
        <path d="M 45 58 Q 50 62 55 58" fill="none" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="36" cy="53" r="4" ry="2" fill="#FF8A8A" opacity="0.6" />
        <ellipse cx="64" cy="53" r="4" ry="2" fill="#FF8A8A" opacity="0.6" />
      </svg>
    ),
  },
];

// Level Assessment Questions (5 items)
interface Question {
  id: number;
  questionText: string;
  arabicGraphic: string;
  options: string[];
  correctIndex: number;
}

const assessmentQuestions: Question[] = [
  {
    id: 1,
    questionText: "Manakah yang merupakan huruf Ba (ب)?",
    arabicGraphic: "ب",
    options: ["Alif (ا)", "Ba (ب)", "Ta (ت)"],
    correctIndex: 1,
  },
  {
    id: 2,
    questionText: "Manakah yang dibaca dengan harakat Fathah (ـَ)?",
    arabicGraphic: "◌َ",
    options: ["Fathah (ـَ)", "Kasrah (ـِ)", "Dammah (ـُ)"],
    correctIndex: 0,
  },
  {
    id: 3,
    questionText: "Manakah yang merupakan huruf Jim (ج)?",
    arabicGraphic: "ج",
    options: ["Jim (ج)", "Ha (ح)", "Kho (خ)"],
    correctIndex: 0,
  },
  {
    id: 4,
    questionText: "Manakah yang dibaca dengan Tanwin Kasratain (ـٍ)?",
    arabicGraphic: "◌ٍ",
    options: ["Fathatain (ـً)", "Kasratain (ـٍ)", "Dhommatain (ـٌ)"],
    correctIndex: 1,
  },
  {
    id: 5,
    questionText: "Manakah yang merupakan huruf Sin (س)?",
    arabicGraphic: "س",
    options: ["Sin (س)", "Syin (ش)", "Sod (ص)"],
    correctIndex: 0,
  },
];

export default function OnboardingFlow() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const setActiveModule = useStore((state) => state.setActiveModule);

  const [screen, setScreen] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [childName, setChildName] = useState("");
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState<number | null>(null);

  // Assessment States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0);

  const handleNextScreen = () => {
    setDirection(1);
    setScreen((s) => s + 1);
  };

  const handlePrevScreen = () => {
    setDirection(-1);
    setScreen((s) => s - 1);
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    if (showAnswerFeedback) return; // prevent multiple submits

    setSelectedAnswerIdx(optionIndex);
    setShowAnswerFeedback(true);

    const isCorrect = optionIndex === assessmentQuestions[currentQuestionIdx].correctIndex;
    if (isCorrect) {
      setAssessmentScore((s) => s + 1);
    }

    setTimeout(() => {
      setShowAnswerFeedback(false);
      setSelectedAnswerIdx(null);
      if (currentQuestionIdx < assessmentQuestions.length - 1) {
        setCurrentQuestionIdx((q) => q + 1);
      } else {
        handleNextScreen();
      }
    }, 1200); // feedback delay
  };

  // Complete onboarding, save user to Zustand, and navigate to dashboard
  const handleFinishOnboarding = () => {
    let startingLevel: "hijaiyah_1" | "iqra_2" | "iqra_3" = "hijaiyah_1";
    let calculatedLevelName = "Iqra 1";

    if (assessmentScore >= 5) {
      startingLevel = "iqra_3";
      calculatedLevelName = "Iqra 3";
    } else if (assessmentScore >= 3) {
      startingLevel = "iqra_2";
      calculatedLevelName = "Iqra 2";
    }

    // Update state store
    setUser({
      id: `child_${Date.now()}`,
      name: childName || "Fatih",
      role: "student",
      avatar: avatarOptions[selectedAvatarIdx || 0].id,
    });
    setActiveModule(startingLevel);

    // Navigate to student dashboard
    router.push("/dashboard");
  };

  // Determine path recommendations based on score
  const getStartingPathDetails = () => {
    if (assessmentScore >= 5) {
      return {
        level: "Iqra 3 (Tingkat Lanjut)",
        desc: "Kamu sudah menguasai Hijaiyah dan Harakat dasar dengan sempurna! Siap untuk belajar Tanwin, Sukun, dan Tajwid.",
      };
    } else if (assessmentScore >= 3) {
      return {
        level: "Iqra 2 (Tingkat Menengah)",
        desc: "Kamu sudah tahu huruf Hijaiyah dasar! Mari kita perkuat pembacaan dengan Harakat Pendek dan Sambung.",
      };
    } else {
      return {
        level: "Iqra 1 (Tingkat Dasar)",
        desc: "Pilihan terbaik untuk melatih pengenalan huruf Hijaiyah dasar dengan Makhraj yang tepat dan menyenangkan.",
      };
    }
  };

  // Slide transitions
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="min-h-screen bg-neutral-warm flex items-center justify-center p-4 sm:p-6 font-nunito select-none overflow-hidden">
      
      {/* CARD BODY WITH SHAPE BOUNDS */}
      <div className="bg-white border-4 border-neutral-border rounded-[48px] p-6 sm:p-10 max-w-lg w-full shadow-2xl relative min-h-[580px] flex flex-col justify-between overflow-hidden">
        
        {/* Navigation Indicator */}
        {screen > 1 && screen < 4 && (
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 z-10">
            <button
              onClick={handlePrevScreen}
              className="bg-gray-50 hover:bg-gray-150 p-2.5 rounded-2xl border border-gray-200 text-gray-500 transition-colors"
            >
              <ChevronLeft size={16} className="stroke-[3]" />
            </button>
            <span className="text-xs font-black text-gray-400">
              Langkah {screen} dari 3
            </span>
            <div className="w-10 h-10 opacity-0" /> {/* spacer */}
          </div>
        )}

        <AnimatePresence custom={direction} mode="wait">
          
          {/* SCREEN 1: Welcome & Mascot */}
          {screen === 1 && (
            <motion.div
              key="screen1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center text-center flex-grow justify-center gap-6"
            >
              <div className="w-full max-w-[240px]">
                <KidReadingQuran />
              </div>
              <div>
                <span className="bg-primary-light text-primary-dark font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-primary/20">
                  Selamat Datang di NgajiKidz! 🌟
                </span>
                <h1 className="text-3xl font-black text-gray-800 leading-tight mt-3">
                  Mari Memulai Petualangan Mengaji!
                </h1>
                <p className="text-sm font-semibold text-gray-400 mt-2 max-w-sm">
                  Belajar mengaji Al-Qur'an secara seru seperti bermain game bersama Ustadz dan teman-teman baru.
                </p>
              </div>

              <motion.button
                onClick={handleNextScreen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-lg py-4 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2 group mt-4"
              >
                Ayo Mulai!
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN 2: Name Input & Avatar Grid */}
          {screen === 2 && (
            <motion.div
              key="screen2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col flex-grow justify-between gap-6"
            >
              <div>
                <h2 className="text-2xl font-black text-gray-800 text-center">Siapa Namamu? 👦👧</h2>
                <p className="text-xs font-semibold text-gray-400 text-center mt-1">
                  Ketik nama panggilanmu dan pilih salah satu karakter lucumu!
                </p>

                {/* Name field */}
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Ketik nama panggilanmu..."
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    maxLength={14}
                    className="w-full text-center border-3 border-neutral-border rounded-2xl py-3 px-4 text-base font-extrabold focus:outline-none focus:border-primary transition-colors bg-neutral-warm/25"
                  />
                </div>

                {/* Avatar Selection Grid */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {avatarOptions.map((av, idx) => {
                    const sel = selectedAvatarIdx === idx;
                    return (
                      <motion.button
                        key={av.id}
                        onClick={() => setSelectedAvatarIdx(idx)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-3xl overflow-hidden p-1.5 transition-all ${
                          sel ? "bg-white" : ""
                        }`}
                      >
                        {av.renderSVG(sel)}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <button
                disabled={!childName.trim() || selectedAvatarIdx === null}
                onClick={handleNextScreen}
                className="w-full bg-primary disabled:bg-gray-200 disabled:text-gray-400 disabled:border-transparent hover:bg-primary-dark text-white font-extrabold text-lg py-3.5 rounded-2xl border-b-4 border-primary-dark disabled:active:translate-y-0 active:border-b-0 active:translate-y-1 transition-all shadow-md mt-6"
              >
                Lanjutkan
              </button>
            </motion.div>
          )}

          {/* SCREEN 3: Level Assessment Questions */}
          {screen === 3 && (
            <motion.div
              key="screen3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col flex-grow justify-between gap-6"
            >
              <div>
                <div className="flex justify-between items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl">
                  <span className="text-xs font-black text-gray-500">Kuis Penentu Level 🎯</span>
                  <span className="text-xs font-black text-primary">
                    Soal {currentQuestionIdx + 1} dari 5
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 text-center mt-5">
                  {assessmentQuestions[currentQuestionIdx].questionText}
                </h3>

                {/* Big Arabic Graphic Display */}
                <div className="my-6 bg-amber-50/20 border-3 border-neutral-border rounded-[32px] py-6 flex items-center justify-center shadow-inner select-none">
                  <span className="arabic-text text-5xl sm:text-6xl font-black text-gray-800 drop-shadow-sm leading-normal">
                    {assessmentQuestions[currentQuestionIdx].arabicGraphic}
                  </span>
                </div>

                {/* Assessment Options list */}
                <div className="flex flex-col gap-2.5">
                  {assessmentQuestions[currentQuestionIdx].options.map((option, idx) => {
                    const isSelected = selectedAnswerIdx === idx;
                    const isCorrect = idx === assessmentQuestions[currentQuestionIdx].correctIndex;

                    let cardStyle = "bg-white border-neutral-border text-gray-700 hover:border-primary";
                    let feedbackIcon = null;

                    if (showAnswerFeedback) {
                      if (isSelected) {
                        if (isCorrect) {
                          cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 scale-95 shadow-sm";
                          feedbackIcon = <Check className="text-white fill-emerald-500" size={16} />;
                        } else {
                          cardStyle = "bg-red-50 border-red-500 text-red-800 animate-shake";
                          feedbackIcon = <X className="text-white fill-red-500" size={16} />;
                        }
                      } else if (isCorrect) {
                        // highlight correct answer
                        cardStyle = "bg-emerald-50/50 border-emerald-500/50 text-emerald-800/80";
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        disabled={showAnswerFeedback}
                        onClick={() => handleAnswerSubmit(idx)}
                        whileHover={showAnswerFeedback ? {} : { scale: 1.02 }}
                        whileTap={showAnswerFeedback ? {} : { scale: 0.98 }}
                        className={`w-full py-3 px-5 rounded-2xl border-3 font-extrabold text-sm sm:text-base text-left flex items-center justify-between transition-all duration-150 ${cardStyle}`}
                      >
                        <span>{option}</span>
                        {feedbackIcon && (
                          <div className="w-5 h-5 rounded-full border border-gray-100 flex items-center justify-center">
                            {feedbackIcon}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Dotted Question Progress line */}
              <div className="flex justify-center gap-1.5 mt-4">
                {assessmentQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentQuestionIdx
                        ? "w-8 bg-primary"
                        : idx < currentQuestionIdx
                        ? "w-2.5 bg-primary/45"
                        : "w-2.5 bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: Recommendation & Final Path Confirmation */}
          {screen === 4 && (
            <motion.div
              key="screen4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col flex-grow justify-between text-center gap-6"
            >
              {/* Confetti Explosion background */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, y: -20, x: Math.random() * 400 }}
                    animate={{
                      y: 500,
                      x: Math.random() * 400,
                      rotate: 360,
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 3, delay: i * 0.1, ease: "easeOut" }}
                    className="absolute w-3 h-3 bg-secondary rounded-sm"
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex justify-center mb-4 text-secondary">
                  <Trophy size={56} className="fill-secondary/10" />
                </div>

                <span className="bg-primary-light text-primary-dark font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-primary/20">
                  Skor Penilaianmu: {assessmentScore} / 5 🌟
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-gray-800 leading-tight mt-3">
                  Jalur Belajarmu Sudah Siap!
                </h2>

                {/* Starting Level Card */}
                <div className="mt-6 bg-gradient-to-r from-emerald-50/50 to-amber-50/30 border-3 border-secondary rounded-[32px] p-6 shadow-sm">
                  <span className="text-[10px] bg-secondary text-white font-extrabold px-3 py-1 rounded-full border border-secondary-dark uppercase tracking-wider">
                    Titik Awal Mulaimu
                  </span>
                  <h3 className="font-black text-xl text-secondary-dark mt-2.5">
                    {getStartingPathDetails().level}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-500 leading-relaxed mt-2">
                    {getStartingPathDetails().desc}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleFinishOnboarding}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md relative z-10"
              >
                Masuk ke Dasbor Belajar! 🚀
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
