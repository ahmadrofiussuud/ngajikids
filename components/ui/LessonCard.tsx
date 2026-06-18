"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Lock } from "lucide-react";
import React from "react";

interface LessonCardProps {
  id: string;
  title: string;
  arabicText?: string;
  xpReward: number;
  completed?: boolean;
  locked?: boolean;
  onClick?: () => void;
}

export default function LessonCard({
  id,
  title,
  arabicText,
  xpReward,
  completed = false,
  locked = false,
  onClick,
}: LessonCardProps) {
  return (
    <motion.button
      disabled={locked}
      onClick={onClick}
      whileHover={locked ? {} : { scale: 1.02, y: -4 }}
      whileTap={locked ? {} : { scale: 0.98 }}
      className={`relative w-full text-left p-5 rounded-3xl border-3 flex items-center justify-between gap-4 transition-all duration-300 shadow-sm ${
        locked
          ? "bg-gray-50 border-gray-300 text-gray-400 cursor-not-allowed select-none"
          : completed
          ? "bg-emerald-50/40 border-primary text-gray-800 hover:shadow-md"
          : "bg-white border-neutral-border text-gray-800 hover:border-secondary hover:shadow-md"
      }`}
      aria-label={`Pelajaran: ${title}, ${
        completed ? "Selesai" : locked ? "Terkunci" : "Belum Selesai"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Playful Icon Container */}
        <div
          className={`p-3.5 rounded-2xl border-2 flex items-center justify-center ${
            locked
              ? "bg-gray-200 border-gray-300"
              : completed
              ? "bg-primary text-white border-primary-dark shadow-sm"
              : "bg-amber-50 text-secondary border-secondary"
          }`}
        >
          {locked ? (
            <Lock size={22} className="stroke-[2.5]" />
          ) : (
            <BookOpen size={22} className="stroke-[2.5]" />
          )}
        </div>

        {/* Text Details */}
        <div>
          <h3 className="font-extrabold text-base md:text-lg leading-tight text-gray-800">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                locked
                  ? "bg-gray-200 text-gray-500"
                  : completed
                  ? "bg-primary-light text-primary-dark border border-primary/20"
                  : "bg-secondary-light text-secondary-dark border border-secondary/20"
              }`}
            >
              +{xpReward} XP
            </span>
            {completed && (
              <span className="flex items-center gap-1 text-xs font-bold text-primary-dark">
                <CheckCircle size={14} className="fill-primary text-white stroke-[2]" />
                Selesai
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Playful Arabic Text preview */}
      {arabicText && !locked && (
        <div className="hidden sm:block bg-neutral-warm border border-neutral-border px-3.5 py-1.5 rounded-2xl max-w-28 text-center shadow-inner">
          <p className="arabic-text text-xl font-bold text-gray-700 leading-normal">
            {arabicText}
          </p>
        </div>
      )}
    </motion.button>
  );
}
