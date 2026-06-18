"use client";

import { motion } from "framer-motion";
import React from "react";

export default function KidReadingQuran() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Background Glow Halo */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary-light via-primary-light/40 to-accent-light filter blur-2xl -z-10"
      />

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        {/* Sparkles / Floating Knowledge Particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={40 + i * 30}
            cy={120 - (i % 2 === 0 ? 30 : 10)}
            r={1.5 + (i % 2)}
            fill="#F59E0B"
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* REHAL (Wooden Book Stand) */}
        <path
          d="M 50 145 L 85 130 L 100 135 L 115 130 L 150 145 L 135 155 L 100 142 L 65 155 Z"
          fill="#5c381c"
          stroke="#40220c"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Rehal Shadow */}
        <ellipse cx="100" cy="158" rx="45" ry="6" fill="#000" opacity="0.1" />

        {/* KID (Body + Head - Bobbing up and down) */}
        <motion.g
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
          }}
        >
          {/* Sitting Legs (Crossed) */}
          <path
            d="M 45 138 Q 100 152 155 138 C 150 128 140 122 130 122 C 105 125 95 125 70 122 C 60 122 50 128 45 138 Z"
            fill="#0F9D58"
            stroke="#065F46"
            strokeWidth="3"
          />

          {/* Green Robe / Body */}
          <path
            d="M 68 122 L 78 88 L 122 88 L 132 122 Z"
            fill="#10B981"
            stroke="#065F46"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* White Collar */}
          <path
            d="M 90 88 Q 100 96 110 88 Q 100 84 90 88 Z"
            fill="#FFFFFF"
            stroke="#065F46"
            strokeWidth="2"
          />

          {/* Little Hands resting on Quran */}
          <circle cx="82" cy="118" r="7" fill="#FFEAE2" stroke="#40220c" strokeWidth="2.5" />
          <circle cx="118" cy="118" r="7" fill="#FFEAE2" stroke="#40220c" strokeWidth="2.5" />

          {/* Neck */}
          <rect
            x="95"
            y="76"
            width="10"
            height="14"
            rx="4"
            fill="#FFEAE2"
            stroke="#065F46"
            strokeWidth="2.5"
          />

          {/* Head & Hair */}
          <motion.g
            animate={{
              rotate: [-1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            style={{ originX: "100px", originY: "80px" }}
          >
            {/* Cute ears */}
            <circle cx="71" cy="58" r="6" fill="#FFEAE2" stroke="#065F46" strokeWidth="2.5" />
            <circle cx="129" cy="58" r="6" fill="#FFEAE2" stroke="#065F46" strokeWidth="2.5" />

            {/* Round face */}
            <circle cx="100" cy="58" r="28" fill="#FFEAE2" stroke="#065F46" strokeWidth="3" />

            {/* Rosy Cheeks */}
            <ellipse cx="80" cy="65" rx="4" ry="2" fill="#FF8A8A" opacity="0.6" />
            <ellipse cx="120" cy="65" rx="4" ry="2" fill="#FF8A8A" opacity="0.6" />

            {/* Smiling Eyes (Closed, Peaceful) */}
            <path
              d="M 83 55 Q 89 50 95 55"
              fill="none"
              stroke="#2C1A0E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 105 55 Q 111 50 117 55"
              fill="none"
              stroke="#2C1A0E"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Cute Smile */}
            <path
              d="M 95 65 Q 100 70 105 65"
              fill="none"
              stroke="#2C1A0E"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Hair peeking out */}
            <path
              d="M 75 42 Q 100 32 125 42 C 120 38 108 38 100 40 C 92 38 80 38 75 42 Z"
              fill="#2C1A0E"
            />

            {/* KOPIAH / SONGKOK (Traditional Islamic Cap) */}
            <path
              d="M 77 38 Q 100 24 123 38 L 120 30 Q 100 18 80 30 Z"
              fill="#0F9D58"
              stroke="#065F46"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Gold Stripe on Kopiah */}
            <path
              d="M 78 35 Q 100 23 122 35"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
            />
          </motion.g>
        </motion.g>

        {/* QURAN BOOK (Open, on top of Rehal) */}
        <motion.g
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
          }}
        >
          {/* Outer Cover */}
          <path
            d="M 68 126 L 100 132 L 132 126 L 130 116 L 100 120 L 70 116 Z"
            fill="#D97706"
            stroke="#B45309"
            strokeWidth="2"
          />

          {/* Left Page (Glowing slightly) */}
          <path
            d="M 70 122 C 80 122 90 125 100 129 C 100 119 96 109 72 109 C 68 115 69 119 70 122 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Arabic Mock Text lines on Left Page */}
          <path d="M 76 114 H 92 M 74 118 H 94 M 75 122 H 90" stroke="#000" strokeWidth="1" opacity="0.4" />

          {/* Right Page */}
          <path
            d="M 130 122 C 120 122 110 125 100 129 C 100 119 104 109 128 109 C 132 115 131 119 130 122 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Arabic Mock Text lines on Right Page */}
          <path d="M 108 114 H 124 M 106 118 H 126 M 110 122 H 125" stroke="#000" strokeWidth="1" opacity="0.4" />

          {/* Golden Center Ribbon (Bookmarker) */}
          <path d="M 100 129 L 100 140 L 98 137 Z" fill="#F59E0B" />
        </motion.g>

        {/* Glowing aura coming from the Quran */}
        <motion.ellipse
          cx="100"
          cy="123"
          rx="12"
          ry="6"
          fill="#10B981"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="filter blur-sm"
        />
      </svg>
    </div>
  );
}
