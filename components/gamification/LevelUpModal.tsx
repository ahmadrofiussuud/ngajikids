"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy, Sparkles, X } from "lucide-react";

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  newTitle: string;
  onClose: () => void;
}

export default function LevelUpModal({
  isOpen,
  newLevel,
  newTitle,
  onClose,
}: LevelUpModalProps) {
  // Confetti helper particles
  const confettiColors = ["#10B981", "#F59E0B", "#8B5CF6", "#3B82F6", "#FF6B6B"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          {/* Confetti Particle Explosion */}
          {[...Array(30)].map((_, i) => {
            const randomColor = confettiColors[i % confettiColors.length];
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: 0,
                  y: 50,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0.6, 1.4, 0.4],
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.7) * 450,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeOut",
                }}
                className="absolute w-4 h-4 rounded-full"
                style={{ backgroundColor: randomColor }}
              />
            );
          })}

          {/* Sunbeams Backdrop Rotating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.5 }}
            exit={{ opacity: 0 }}
            className="absolute z-0 pointer-events-none"
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="w-[450px] h-[450px] text-secondary"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            >
              {[...Array(12)].map((_, i) => (
                <polygon
                  key={i}
                  points="50,50 45,0 55,0"
                  fill="currentColor"
                  transform={`rotate(${i * 30}, 50, 50)`}
                />
              ))}
            </motion.svg>
          </motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: 100 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
              },
            }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            className="bg-white border-4 border-secondary rounded-[48px] p-8 max-w-sm w-full text-center shadow-2xl relative z-10 overflow-hidden"
          >
            {/* Corner Stars */}
            <div className="absolute top-8 left-8 text-secondary/30">
              <Star size={24} fill="currentColor" />
            </div>
            <div className="absolute bottom-8 right-8 text-secondary/30">
              <Star size={24} fill="currentColor" />
            </div>

            {/* Glowing Big Level Ring */}
            <div className="flex justify-center mb-6 relative">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-24 h-24 bg-gradient-to-tr from-secondary/30 to-primary/20 rounded-full filter blur-md"
              />
              <div className="relative w-20 h-20 bg-secondary text-white border-4 border-secondary-dark rounded-full shadow-lg flex items-center justify-center font-black text-3xl">
                {newLevel}
              </div>
            </div>

            <motion.h2
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-3xl font-black text-gray-800 leading-tight"
            >
              Naik Level! 🎉
            </motion.h2>
            
            <p className="text-sm font-semibold text-gray-400 mt-2">
              Selamat! Kamu naik ke Level {newLevel}
            </p>

            {/* Rank Title Box */}
            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-amber-50 border-3 border-secondary rounded-3xl p-4 shadow-sm relative">
              <span className="text-[10px] bg-secondary text-white font-extrabold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 border border-secondary-dark uppercase tracking-wider">
                Gelar Barumu
              </span>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <Trophy className="text-secondary fill-secondary/10" size={24} />
                <h3 className="font-black text-xl text-secondary-dark tracking-wide">
                  {newTitle}
                </h3>
              </div>
            </div>

            {/* Claim button */}
            <button
              onClick={onClose}
              className="mt-8 w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-lg py-3.5 px-6 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles size={20} className="fill-white stroke-none" />
              Lanjutkan Belajar!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
