"use client";

import { motion } from "framer-motion";
import React from "react";

interface AvatarKidProps {
  character?: "star" | "crescent" | "sheep" | "sun";
  size?: number;
  animated?: boolean;
}

export default function AvatarKid({
  character = "star",
  size = 64,
  animated = true,
}: AvatarKidProps) {
  const renderStar = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Smiling Star */}
      <polygon
        points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36"
        fill="#FFC107"
        stroke="#E28C00"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <ellipse cx="38" cy="48" rx="4" ry="6" fill="#2C1A0E" />
      <ellipse cx="62" cy="48" rx="4" ry="6" fill="#2C1A0E" />
      {/* Blush */}
      <ellipse cx="28" cy="56" rx="5" ry="3" fill="#FF8A8A" opacity="0.6" />
      <ellipse cx="72" cy="56" rx="5" ry="3" fill="#FF8A8A" opacity="0.6" />
      {/* Smile */}
      <path
        d="M 42 58 Q 50 66 58 58"
        stroke="#2C1A0E"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const renderCrescent = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Smiling Moon */}
      <path
        d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z"
        fill="#93C5FD"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <ellipse cx="40" cy="48" rx="4" ry="6" fill="#1E3A8A" />
      {/* Smile */}
      <path
        d="M 38 58 Q 45 64 48 54"
        stroke="#1E3A8A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const renderSheep = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Sheep head/body */}
      <circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="#EAE6DF" strokeWidth="4" />
      {/* Fluffy ears */}
      <ellipse cx="15" cy="45" rx="10" ry="6" fill="#EAE6DF" />
      <ellipse cx="85" cy="45" rx="10" ry="6" fill="#EAE6DF" />
      {/* Fluff top */}
      <circle cx="40" cy="22" r="12" fill="#FFFFFF" />
      <circle cx="60" cy="22" r="12" fill="#FFFFFF" />
      <circle cx="50" cy="18" r="14" fill="#FFFFFF" />
      {/* Face skin */}
      <ellipse cx="50" cy="52" rx="26" ry="22" fill="#FFEAE2" />
      {/* Eyes */}
      <circle cx="42" cy="48" r="3" fill="#2C1A0E" />
      <circle cx="58" cy="48" r="3" fill="#2C1A0E" />
      {/* Cheeks */}
      <ellipse cx="34" cy="54" rx="4" ry="2" fill="#FF8A8A" opacity="0.6" />
      <ellipse cx="66" cy="54" rx="4" ry="2" fill="#FF8A8A" opacity="0.6" />
      {/* Smile */}
      <path
        d="M 46 58 Q 50 62 54 58"
        stroke="#2C1A0E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const renderSun = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="28" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="10"
          x2="50"
          y2="20"
          stroke="#D97706"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${angle}, 50, 50)`}
        />
      ))}
      {/* Eyes */}
      <ellipse cx="44" cy="48" rx="3" ry="5" fill="#78350F" />
      <ellipse cx="56" cy="48" rx="3" ry="5" fill="#78350F" />
      {/* Smile */}
      <path
        d="M 44 56 Q 50 62 56 56"
        stroke="#78350F"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const characterMap = {
    star: renderStar,
    crescent: renderCrescent,
    sheep: renderSheep,
    sun: renderSun,
  };

  const selectedRenderer = characterMap[character] || renderStar;

  return (
    <motion.div
      animate={
        animated
          ? {
              y: [0, -5, 0],
              scaleY: [1, 1.02, 1],
            }
          : {}
      }
      transition={{
        repeat: Infinity,
        duration: 3.5,
        ease: "easeInOut",
      }}
      className="inline-block flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {selectedRenderer()}
    </motion.div>
  );
}
