"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, GraduationCap, Users, Clock, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Teacher } from "@/lib/teacherStore";

interface TeacherCardProps {
  teacher: Teacher;
  index: number;
  isPublic?: boolean;
}

export default function TeacherCard({ teacher, index, isPublic = false }: TeacherCardProps) {
  // Format price to IDR
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Avatar generator (shows initials if avatar_url is null)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden"
    >
      {/* Verification Header Tag */}
      {teacher.is_verified && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] font-black px-3.5 py-1 rounded-bl-2xl border-l border-b border-blue-600 flex items-center gap-1 shadow-sm uppercase tracking-wider select-none">
          <ShieldCheck size={11} className="stroke-[3]" />
          <span>Terverifikasi</span>
        </div>
      )}

      {/* Profile summary */}
      <div className="flex gap-4 items-start text-left mt-2">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border-3 border-primary/20 flex items-center justify-center text-primary-dark font-black text-xl shadow-inner select-none flex-shrink-0">
          {teacher.avatar_url ? (
            <img src={teacher.avatar_url} alt={teacher.full_name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            getInitials(teacher.full_name)
          )}
        </div>

        {/* Title, Name, Education */}
        <div className="flex-grow">
          <span className="text-[10px] bg-primary-light text-primary-dark font-black px-2 py-0.5 rounded-full border border-primary/15 uppercase">
            {teacher.title}
          </span>
          <h3 className="font-extrabold text-lg text-gray-800 mt-1 leading-tight">
            {teacher.full_name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mt-1.5">
            <GraduationCap size={14} className="text-gray-400" />
            <span className="truncate max-w-[180px]">{teacher.education}</span>
          </div>
        </div>
      </div>

      {/* Specialties Tag chips */}
      <div className="flex flex-wrap gap-1.5 text-left">
        {teacher.specialties.map((specialty) => (
          <span
            key={specialty}
            className="text-[10px] font-black bg-amber-50 text-secondary-dark border border-secondary/20 px-2.5 py-1 rounded-lg"
          >
            {specialty}
          </span>
        ))}
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 gap-3 bg-gray-50/50 border border-gray-150 p-3 rounded-2xl">
        {/* Rating */}
        <div className="flex items-center gap-2 text-left">
          <div className="p-1.5 rounded-lg bg-amber-50 border border-secondary/20 text-secondary">
            <Star size={14} className="fill-secondary stroke-1" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Rating</p>
            <p className="text-xs font-black text-gray-800">
              {teacher.rating_avg} <span className="text-[10px] text-gray-400 font-semibold">({teacher.rating_count})</span>
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-2 text-left">
          <div className="p-1.5 rounded-lg bg-emerald-50 border border-primary/20 text-primary">
            <Clock size={14} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Pengalaman</p>
            <p className="text-xs font-black text-gray-800">{teacher.years_experience} Tahun</p>
          </div>
        </div>

        {/* Total Students */}
        <div className="flex items-center gap-2 text-left">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-600">
            <Users size={14} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Santri</p>
            <p className="text-xs font-black text-gray-800">{teacher.total_students} Santri</p>
          </div>
        </div>

        {/* Price Per Session */}
        <div className="flex items-center gap-2 text-left">
          <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-600">
            <CalendarDays size={14} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Biaya Sesi</p>
            <p className="text-xs font-black text-gray-800">{formatIDR(teacher.price_per_session)}</p>
          </div>
        </div>
      </div>

      {/* Button actions */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        <Link
          href={isPublic ? `/ustadz/${teacher.id}` : `/dashboard/parent/teachers/${teacher.id}`}
          className="bg-gray-150 hover:bg-gray-250 text-gray-600 font-extrabold text-xs text-center py-3 rounded-xl border-b-2 border-gray-300 active:border-b-0 active:translate-y-[1px] transition-all flex items-center justify-center"
        >
          Lihat Profil
        </Link>
        
        {isPublic ? (
          <Link
            href="/login"
            className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs text-center py-3 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <CalendarDays size={14} />
            Booking Kelas
          </Link>
        ) : (
          <Link
            href={`/dashboard/parent/teachers/${teacher.id}#booking`}
            className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs text-center py-3 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <CalendarDays size={14} />
            Booking Kelas
          </Link>
        )}
      </div>

    </motion.div>
  );
}
