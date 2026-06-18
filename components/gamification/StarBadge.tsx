"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

interface StarBadgeProps {
  level: string | number;
  title: string;
  xpReward?: number;
  unlocked?: boolean;
}

export default function StarBadge({
  level,
  title,
  xpReward = 50,
  unlocked = true,
}: StarBadgeProps) {
  const controls = useAnimation();

  const handleHoverStart = () => {
    if (unlocked) {
      controls.start("sparkle");
    }
  };

  const sparkleVariants: Variants = {
    initial: { scale: 0, opacity: 0, x: 0, y: 0 },
    sparkle: (i: number) => ({
      scale: [0, 1.3, 0],
      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5), 0],
      y: [0, (i < 2 ? -1 : 1) * (20 + i * 5), 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      whileHover={{ scale: unlocked ? 1.05 : 1, y: unlocked ? -5 : 0 }}
      whileTap={{ scale: unlocked ? 0.95 : 1 }}
      className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border-3 shadow-sm w-36 transition-all duration-300 ${
        unlocked
          ? "bg-white border-secondary text-gray-800 hover:shadow-lg"
          : "bg-gray-100 border-gray-300 text-gray-400 select-none"
      }`}
      aria-label={`Badge: ${title}, ${unlocked ? "Terbuka" : "Terkunci"}`}
    >
      {/* Sparkles */}
      {unlocked &&
        [0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="initial"
            variants={sparkleVariants}
            animate={controls}
            className="absolute z-10 text-secondary"
            style={{ top: "35%", left: "45%" }}
          >
            <Star size={10} fill="currentColor" className="stroke-none" />
          </motion.div>
        ))}

      {/* Main Star */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={unlocked ? { rotate: [0, 6, -6, 0] } : {}}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className={`${unlocked ? "text-secondary" : "text-gray-300"}`}
        >
          <Star
            size={60}
            fill={unlocked ? "#F59E0B" : "#D1D5DB"}
            className="stroke-[1.5]"
          />
        </motion.div>
        <span
          className={`absolute font-extrabold text-lg ${
            unlocked ? "text-white drop-shadow-sm" : "text-gray-500"
          }`}
          style={{ transform: "translateY(-2px)" }}
        >
          {level}
        </span>
      </div>

      <h4 className="mt-3 font-extrabold text-sm text-center leading-tight line-clamp-2 h-9 flex items-center justify-center">
        {title}
      </h4>
      <p className="text-xs mt-1 font-semibold text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">
        {unlocked ? "Selesai" : `Min Lvl ${level}`}
      </p>
    </motion.div>
  );
}
