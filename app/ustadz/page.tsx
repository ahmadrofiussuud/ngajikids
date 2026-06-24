"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTeacherStore } from "@/lib/teacherStore";
import { useTeacherFilterStore } from "@/lib/teacherFilterStore";
import TeacherCard from "@/components/ui/TeacherCard";
import TeacherFilterBar from "@/components/ui/TeacherFilterBar";
import { Search, ChevronRight, X, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PublicTeachersListPage() {
  const teachers = useTeacherStore((state) => state.teachers);
  const availabilities = useTeacherStore((state) => state.availabilities);
  
  const { specialty, availabilityDay, minRating } = useTeacherFilterStore();
  const [loading, setLoading] = useState(true);

  // Simulate skeleton loading on first load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const todayDayOfWeek = new Date().getDay();

  // Filter logic
  const filteredTeachers = teachers.filter((teacher) => {
    // 1. Specialty Filter
    if (specialty !== "Semua") {
      const match = teacher.specialties.some((spec) =>
        spec.toLowerCase().includes(specialty.toLowerCase())
      );
      if (!match) return false;
    }

    // 2. Rating Filter
    if (minRating > 0 && teacher.rating_avg < minRating) {
      return false;
    }

    // 3. Availability Filter
    if (availabilityDay === "Hari Ini") {
      const hasTodaySlots = availabilities.some(
        (slot) =>
          slot.teacher_id === teacher.id &&
          slot.day_of_week === todayDayOfWeek &&
          !slot.is_blocked
      );
      if (!hasTodaySlots) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-warm pb-20 font-nunito text-gray-800 text-left selection:bg-primary-light selection:text-primary-dark">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 flex flex-col gap-6">
        
        {/* PAGE TITLE & SUMMARY */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <span className="bg-primary-light text-primary-dark border border-primary/20 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-2 shadow-sm">
              Ustazah &amp; Ustadz Terbaik cilik 🕌
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-tight">
              Daftar Ustadz &amp; Ustazah NgajiKidz
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1">
              Bimbingan intensif personal secara virtual dengan Ustadz tersertifikasi ramah anak.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div className="bg-white border-2 border-neutral-border px-4 py-2.5 rounded-2xl shadow-sm text-right">
              <span className="text-xs font-bold text-gray-400">Total Pengajar Pilihan</span>
              <p className="text-sm font-black text-primary-dark">{filteredTeachers.length} Ustadz Aktif</p>
            </div>
            <Link
              href="/guru/register"
              className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs sm:text-sm py-3 px-5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-[2px] transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Bergabung Jadi Ustadz ➔</span>
            </Link>
          </div>
        </div>

        {/* FILTER BAR */}
        <TeacherFilterBar />

        {/* SKELETON LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-5 animate-pulse"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                  <div className="flex-grow flex flex-col gap-2">
                    <div className="w-12 h-4 bg-gray-200 rounded-md" />
                    <div className="w-24 h-6 bg-gray-200 rounded-md" />
                    <div className="w-32 h-4 bg-gray-200 rounded-md" />
                  </div>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 bg-gray-200 rounded-xl" />
                  <div className="h-10 bg-gray-200 rounded-xl" />
                  <div className="h-10 bg-gray-200 rounded-xl" />
                  <div className="h-10 bg-gray-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {filteredTeachers.length === 0 ? (
              /* EMPTY STATE */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-3 border-neutral-border rounded-[32px] p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[320px] max-w-md mx-auto"
              >
                <div className="p-4 bg-amber-50 rounded-full border-2 border-secondary/20 mb-4 text-secondary">
                  <AlertCircle size={36} />
                </div>
                <h3 className="font-extrabold text-lg text-gray-800">Ustadz Tidak Ditemukan</h3>
                <p className="text-xs font-bold text-gray-400 mt-2 leading-relaxed">
                  Tidak ada ustadz/ustazah yang cocok dengan filter aktif Anda. Coba atur ulang filter pencarian Anda.
                </p>
              </motion.div>
            ) : (
              /* GRID OF CARDS */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTeachers.map((teacher, index) => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    index={index}
                    isPublic={true}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
