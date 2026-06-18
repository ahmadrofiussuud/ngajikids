"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface DailyStreakTrackerProps {
  streak: number;
  completedDays: string[]; // e.g. ["Senin", "Selasa", "Rabu"]
  onCheckIn?: () => void;
}

export default function DailyStreakTracker({
  streak,
  completedDays,
  onCheckIn,
}: DailyStreakTrackerProps) {
  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Ahad"];
  const today = "Kamis";

  return (
    <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-4 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-gray-800 flex items-center gap-1.5">
            <Flame className="text-red-500 fill-red-500 animate-bounce" size={20} />
            Misi Rutinitas Harian
          </h3>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">
            Jaga api belajarmu tetap menyala setiap hari!
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 px-3.5 py-1 rounded-2xl text-red-500 font-extrabold text-xs sm:text-sm flex items-center gap-1">
          <span>🔥</span>
          <span>{streak} Hari</span>
        </div>
      </div>

      {/* Horizontal Streak Calendar */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {daysOfWeek.map((day) => {
          const isCompleted = completedDays.includes(day);
          const isToday = day === today;

          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span
                className={`text-[10px] font-black uppercase tracking-wider ${
                  isToday ? "text-primary-dark" : "text-gray-400"
                }`}
              >
                {day.slice(0, 3)}
              </span>
              <motion.button
                whileHover={isToday && !isCompleted ? { scale: 1.08 } : {}}
                whileTap={isToday && !isCompleted ? { scale: 0.95 } : {}}
                onClick={isToday && !isCompleted ? onCheckIn : undefined}
                className={`w-full aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-red-50 border-red-400 text-red-500 shadow-sm"
                    : isToday
                    ? "bg-white border-primary border-dashed hover:border-solid hover:bg-emerald-50/50 text-primary-dark cursor-pointer"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-default"
                }`}
                aria-label={`Hari ${day}: ${isCompleted ? "Selesai" : "Belum Selesai"}`}
              >
                {isCompleted ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 6, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="text-lg"
                  >
                    🔥
                  </motion.div>
                ) : isToday ? (
                  <span className="text-[10px] font-black text-primary">KLIK</span>
                ) : (
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
