"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Check, Star } from "lucide-react";
import React from "react";

interface GuruCardProps {
  name: string;
  specialization: string;
  rating: number;
  sessionCount: number;
  availableTime: string;
  verified?: boolean;
}

export default function GuruCard({
  name,
  specialization,
  rating,
  sessionCount,
  availableTime,
  verified = true,
}: GuruCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white border-3 border-neutral-border hover:border-primary rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-left w-full"
    >
      {/* Header Info */}
      <div className="flex gap-4 items-center">
        {/* Playful Circle Avatar */}
        <div className="relative w-16 h-16 rounded-full border-2 border-primary bg-emerald-50/50 flex items-center justify-center text-primary-dark font-black text-xl select-none">
          {name.charAt(0)}
          {verified && (
            <div
              className="absolute -bottom-1 -right-1 bg-primary text-white border-2 border-white rounded-full p-0.5 flex items-center justify-center"
              aria-label="Guru Terverifikasi"
            >
              <Check size={12} className="stroke-[4]" />
            </div>
          )}
        </div>

        {/* Name and specialization */}
        <div>
          <h3 className="font-extrabold text-base md:text-lg flex items-center gap-1.5 text-gray-800">
            {name}
          </h3>
          <p className="text-xs md:text-sm font-semibold text-gray-500 mt-0.5">
            {specialization}
          </p>
        </div>
      </div>

      {/* Ratings & Sessions count */}
      <div className="flex items-center gap-4 border-y border-gray-100 py-3 text-xs md:text-sm font-bold text-gray-600">
        <div className="flex items-center gap-1">
          <Star size={16} fill="#F59E0B" className="text-secondary stroke-none" />
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <div>
          <span>{sessionCount} Kelas</span>
        </div>
        {verified && (
          <>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-0.5 text-primary-dark text-xs">
              <Award size={14} className="fill-primary text-white stroke-[1.5]" />
              <span>Sertifikasi</span>
            </div>
          </>
        )}
      </div>

      {/* Availability info & Call to action */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-2xl">
          <Calendar size={14} className="stroke-[2.5]" />
          <span>Tersedia: {availableTime}</span>
        </div>

        <button className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-2.5 px-4 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 hover:brightness-105 transition-all duration-150">
          Hubungi Guru
        </button>
      </div>
    </motion.div>
  );
}
