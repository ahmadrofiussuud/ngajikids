"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTeacherStore, Teacher, AvailabilitySlot } from "@/lib/teacherStore";
import {
  ChevronLeft,
  Star,
  GraduationCap,
  Clock,
  Users,
  Calendar,
  AlertCircle,
  MessageSquare,
  Lock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function PublicTeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.teacherId as string;

  const teachers = useTeacherStore((state) => state.teachers);
  const availabilities = useTeacherStore((state) => state.availabilities);
  const reviews = useTeacherStore((state) => state.reviews);

  // States
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [selectedDayTab, setSelectedDayTab] = useState<number>(1); // default Senin
  const [showLoginModal, setShowLoginModal] = useState(false);

  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  useEffect(() => {
    const t = teachers.find((x) => x.id === teacherId);
    if (t) {
      setTeacher(t);
    }
  }, [teacherId, teachers]);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-neutral-warm flex items-center justify-center p-6 text-center font-nunito">
        <div className="bg-white border-3 border-neutral-border rounded-[32px] p-8 max-w-sm w-full shadow-md">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
          <h3 className="font-extrabold text-lg text-gray-800">Guru Tidak Ditemukan</h3>
          <p className="text-xs font-semibold text-gray-400 mt-2">Data profil guru ngaji tidak tersedia di sistem.</p>
          <Link
            href="/ustadz"
            className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3 px-6 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all"
          >
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    );
  }

  const dailySlots = availabilities.filter(
    (slot) => slot.teacher_id === teacher.id && slot.day_of_week === selectedDayTab
  );

  const teacherReviews = reviews.filter((r) => r.teacher_id === teacher.id);

  const maskName = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      const initials = lastPart[0].toUpperCase();
      return `${parts.slice(0, -1).join(" ")} ${initials}.`;
    }
    return name;
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-20 font-nunito text-gray-800 text-left relative selection:bg-primary-light selection:text-primary-dark">
      
      {/* Login Prompt Modal for Booking */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-primary rounded-[40px] p-8 max-w-sm w-full shadow-2xl relative text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary-light/50 border border-primary/20 flex items-center justify-center text-primary-dark">
                <Lock size={28} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-800 mb-2">Ingin Booking Kelas? 🕌</h3>
                <p className="text-xs font-semibold text-gray-400 leading-relaxed">
                  Silakan masuk atau daftar akun Orang Tua terlebih dahulu untuk menjadwalkan sesi belajar mengaji privat dengan {teacher.title} {teacher.full_name}.
                </p>
              </div>

              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-250 text-gray-600 font-extrabold text-xs py-3 rounded-xl border border-gray-300 transition-colors"
                >
                  Batal
                </button>
                <Link
                  href={`/login?redirect=/dashboard/parent/teachers/${teacher.id}`}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center justify-center shadow-sm"
                >
                  Masuk Sekarang
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER CRUMB */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <Link
          href="/ustadz"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-extrabold text-sm transition-all"
        >
          <ChevronLeft size={18} className="stroke-[3]" />
          Kembali ke Daftar
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PROFILE CARD, BIO & REVIEWS */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* PROFILE SUMMARY */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 relative overflow-hidden">
            {teacher.is_verified && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] font-black px-3.5 py-1 rounded-bl-2xl border-l border-b border-blue-600 flex items-center gap-1 shadow-sm uppercase tracking-wider">
                <ShieldCheck size={11} className="stroke-[3]" />
                <span>Terverifikasi</span>
              </div>
            )}

            <div className="w-24 h-24 rounded-[24px] bg-gradient-to-br from-emerald-100 to-teal-100 border-3 border-primary/20 flex items-center justify-center text-primary-dark font-black text-3xl shadow-inner select-none flex-shrink-0 overflow-hidden">
              {teacher.avatar_url ? (
                <img src={teacher.avatar_url} alt={teacher.full_name} className="w-full h-full object-cover" />
              ) : (
                teacher.full_name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
              )}
            </div>

            <div className="flex-grow mt-2 sm:mt-0">
              <span className="text-[10px] bg-primary-light text-primary-dark font-black px-2.5 py-0.5 rounded-full border border-primary/20 uppercase">
                {teacher.title}
              </span>
              <h2 className="text-2xl font-black text-gray-800 mt-2">{teacher.full_name}</h2>
              
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-400 font-semibold mt-1">
                <GraduationCap size={15} />
                <span>{teacher.education}</span>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-4">
                {teacher.specialties.map((s) => (
                  <span key={s} className="text-[9px] font-black bg-amber-50 text-secondary-dark border border-secondary/20 px-2 py-0.5 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BIO & EXPERIENCE DETAILS */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-2">Tentang Ustadz</h3>
              <p className="text-xs font-semibold text-gray-600 leading-relaxed">{teacher.bio}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4 text-center mt-2">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Pengalaman</span>
                <p className="text-sm font-black text-gray-800 mt-0.5">{teacher.years_experience} Tahun</p>
              </div>
              <div className="border-l border-r border-gray-150">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Total Santri</span>
                <p className="text-sm font-black text-gray-800 mt-0.5">{teacher.total_students} Santri</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Rating Guru</span>
                <p className="text-sm font-black text-amber-500 mt-0.5 flex items-center justify-center gap-0.5">
                  ★ {teacher.rating_avg}
                </p>
              </div>
            </div>
          </div>

          {/* STUDENT REVIEWS LIST */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-5">
            <h3 className="text-base font-black text-gray-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" />
              Ulasan Orang Tua ({teacherReviews.length})
            </h3>

            <div className="flex flex-col gap-4">
              {teacherReviews.length === 0 ? (
                <p className="text-xs font-semibold text-gray-400 py-4 text-center italic">
                  Belum ada ulasan untuk ustadz ini.
                </p>
              ) : (
                teacherReviews.map((review) => (
                  <div key={review.id} className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-gray-800">{maskName(review.parent_name)}</h4>
                        <span className="text-[9px] font-semibold text-gray-400">{review.created_at}</span>
                      </div>
                      <div className="flex gap-0.5 text-amber-400 text-xs">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" className="stroke-none" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Public Review Callout Block */}
            <div className="bg-amber-50/50 border border-secondary/20 p-4 rounded-2xl text-center flex flex-col items-center gap-2 mt-2">
              <p className="text-xs font-extrabold text-secondary-dark">Ingin menulis ulasan untuk Ustadz?</p>
              <p className="text-[10px] text-gray-400 font-semibold max-w-xs">Ulasan hanya dapat dikirim oleh orang tua santri yang sudah terdaftar dan mengikuti kelas.</p>
              <Link
                href="/login"
                className="mt-1 bg-white hover:bg-gray-50 text-secondary-dark font-black text-[10px] px-3.5 py-1.5 rounded-lg border border-secondary/20 shadow-sm transition-all"
              >
                Masuk untuk Menulis Ulasan
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING CALENDAR PREVIEW */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-5 sticky top-24">
            <div>
              <h3 className="text-base font-black text-gray-800 flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Jadwal Mengaji Tersedia
              </h3>
              <p className="text-[10px] font-semibold text-gray-400 mt-1">
                Pilih hari di bawah untuk melihat slot kelas ustadz minggu ini.
              </p>
            </div>

            {/* Horizontal Day Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDayTab(d)}
                  className={`py-2 px-3.5 rounded-xl font-extrabold text-xs flex-shrink-0 border-2 transition-all ${
                    selectedDayTab === d
                      ? "bg-primary border-primary-dark text-white shadow-sm"
                      : "bg-white border-neutral-border hover:border-gray-300 text-gray-500"
                  }`}
                >
                  {daysOfWeek[d].slice(0, 3)}
                </button>
              ))}
            </div>

            <hr className="border-gray-100" />

            {/* Availability Slots Grid */}
            <div className="flex flex-col gap-3 min-h-[180px]">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider pl-1">
                Sesi {daysOfWeek[selectedDayTab]}:
              </span>

              {dailySlots.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  <Clock size={20} className="text-gray-300 mb-1" />
                  <p className="text-[10px] font-semibold text-gray-400 italic">Libur / Tidak ada sesi</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {dailySlots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={slot.is_blocked}
                      onClick={() => setShowLoginModal(true)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left font-extrabold text-xs flex items-center justify-between transition-all group ${
                        slot.is_blocked
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white border-neutral-border hover:border-primary hover:bg-primary-light/10 text-gray-700 active:scale-[0.99] cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className={slot.is_blocked ? "text-gray-300" : "text-primary"} />
                        <span>{slot.time_slot} WIB</span>
                      </div>
                      
                      {slot.is_blocked ? (
                        <span className="bg-gray-200 text-gray-400 font-bold px-2 py-0.5 rounded-md text-[9px] uppercase">Booked</span>
                      ) : (
                        <span className="bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary-dark font-black px-2.5 py-1 rounded-lg text-[9px] uppercase border border-primary/20 transition-colors">Booking</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sharia Pricing Note */}
            <div className="bg-gray-50/50 border border-gray-150 p-4 rounded-2xl flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Investasi Belajar:</span>
              <div className="flex items-baseline gap-1 text-gray-800 font-black">
                <span className="text-sm">Rp</span>
                <span className="text-xl">
                  {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(teacher.price_per_session)}
                </span>
                <span className="text-xs text-gray-400 font-semibold">/ sesi</span>
              </div>
              <p className="text-[9px] font-semibold text-gray-400 leading-tight">Biaya jasa pengajaran langsung diserahkan kepada ustadz dengan akad ijarah.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
