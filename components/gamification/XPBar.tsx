"use client";

import { motion } from "framer-motion";
import React from "react";

interface XPBarProps {
  xp: number;
  level: number;
}

export default function XPBar({ xp, level }: XPBarProps) {
  const nextLevelXP = level * 100;
  const percentage = Math.min(100, (xp / nextLevelXP) * 100);

  return (
    <div
      className="w-full flex items-center gap-3 select-none"
      aria-label={`Level ${level}, XP: ${xp} dari ${nextLevelXP}`}
    >
      {/* Level Badge */}
      <div className="flex-shrink-0 bg-secondary text-white font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-2xl border-2 border-secondary-dark shadow-sm flex items-center justify-center min-w-[64px]">
        LVL {level}
      </div>

      {/* Progress Bar Track */}
      <div className="relative flex-grow h-6 bg-gray-200 rounded-full border-2 border-gray-300 overflow-hidden shadow-inner flex items-center">
        {/* Animated Bar Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full relative overflow-hidden"
        >
          {/* Highlight shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
          <motion.div
            animate={{ x: ["-150%", "250%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute inset-y-0 w-8 bg-white/20 skew-x-12"
          />
        </motion.div>

        {/* Text overlay showing XP */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black text-gray-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {xp} / {nextLevelXP} XP
          </span>
        </div>
      </div>
    </div>
  );
}
