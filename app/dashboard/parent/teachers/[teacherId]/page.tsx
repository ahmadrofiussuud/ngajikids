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
  Send,
  Check,
  ShieldCheck,
  Coins,
} from "lucide-react";
import Link from "next/link";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.teacherId as string;

  const teachers = useTeacherStore((state) => state.teachers);
  const availabilities = useTeacherStore((state) => state.availabilities);
  const reviews = useTeacherStore((state) => state.reviews);
  
  const bookSlot = useTeacherStore((state) => state.bookSlot);
  const addReview = useTeacherStore((state) => state.addReview);

  // States
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [selectedDayTab, setSelectedDayTab] = useState<number>(1); // default Senin
  
  // Booking Modal
  const [bookingSlot, setBookingSlot] = useState<AvailabilitySlot | null>(null);
  const [studentName, setStudentName] = useState("Ahmad Fatih");
  const [studentLevel, setStudentLevel] = useState("Iqra 3");
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Review Form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("Bunda Fatih");
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

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
            href="/dashboard/parent/teachers"
            className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3 px-6 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // Filter availability slots for this teacher and selected day
  const dailySlots = availabilities.filter(
    (slot) => slot.teacher_id === teacher.id && slot.day_of_week === selectedDayTab
  );

  // Filter reviews for this teacher
  const teacherReviews = reviews.filter((r) => r.teacher_id === teacher.id);

  // Mask parent name for privacy (e.g. "Bunda Fatih" -> "Bunda F.")
  const maskName = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      const initials = lastPart[0].toUpperCase();
      return `${parts.slice(0, -1).join(" ")} ${initials}.`;
    }
    return name;
  };

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingSlot) return;

    bookSlot(
      teacher.id,
      studentName,
      studentLevel,
      daysOfWeek[bookingSlot.day_of_week],
      bookingSlot.day_of_week,
      bookingSlot.time_slot
    );

    setBookingSlot(null);
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview(teacher.id, reviewAuthor, reviewRating, reviewComment);
    setReviewComment("");
    setReviewRating(5);
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito text-gray-800 text-left relative">
      
      {/* Toast Notification Booking Success */}
      <AnimatePresence>
        {showBookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-2 border-2 border-emerald-600"
          >
            <Check size={18} className="stroke-[3]" />
            <span>Booking Kelas Sukses! Jadwal sudah ter-update. 🎉</span>
          </motion.div>
        )}

        {showReviewSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-2 border-2 border-emerald-600"
          >
            <Check size={18} className="stroke-[3]" />
            <span>Ulasan berhasil dikirim! Terima kasih. 🌟</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Dialog Modal */}
      <AnimatePresence>
        {bookingSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-primary rounded-[40px] p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
            >
              <h3 className="text-xl font-black text-gray-800 mb-2">Konfirmasi Booking 🕌</h3>
              <p className="text-xs font-semibold text-gray-400 mb-6">
                Sesi mengaji {daysOfWeek[bookingSlot.day_of_week]} Jam {bookingSlot.time_slot} WIB bersama {teacher.title} {teacher.full_name}.
              </p>

              <form onSubmit={handleBookingConfirm} className="flex flex-col gap-4">
                {/* Student Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-wider pl-1">Nama Santri (Anak)</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full border-2 border-neutral-border rounded-xl py-2 px-3 text-sm font-bold focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Level */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-wider pl-1">Materi / Level Belajar</label>
                  <select
                    value={studentLevel}
                    onChange={(e) => setStudentLevel(e.target.value)}
                    className="w-full border-2 border-neutral-border rounded-xl py-2.5 px-3 text-sm font-bold focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="Iqra 1">Iqra 1</option>
                    <option value="Iqra 2">Iqra 2</option>
                    <option value="Iqra 3">Iqra 3</option>
                    <option value="Iqra 4">Iqra 4</option>
                    <option value="Iqra 5">Iqra 5</option>
                    <option value="Iqra 6">Iqra 6</option>
                    <option value="Al-Qur'an">Al-Qur'an</option>
                  </select>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setBookingSlot(null)}
                    className="flex-1 bg-gray-150 hover:bg-gray-200 text-gray-600 font-extrabold text-xs py-3 rounded-xl border border-gray-300 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all"
                  >
                    Konfirmasi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="bg-white border-b-3 border-neutral-border py-4 px-4 sm:px-8 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard/parent/teachers"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-extrabold text-sm transition-all"
          >
            <ChevronLeft size={18} className="stroke-[3]" />
            Kembali
          </Link>
          <h1 className="font-black text-lg text-gray-800 tracking-tight">
            Profil Pengajar 🎓
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
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

          {/* REVIEWS LIST */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-5">
            <h3 className="text-base font-black text-gray-800 flex items-center gap-1.5">
              <MessageSquare size={18} className="text-primary" />
              Ulasan Orang Tua ({teacherReviews.length})
            </h3>

            <div className="flex flex-col gap-4">
              {teacherReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-150 flex flex-col gap-2">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-150/60">
                    <div className="text-xs font-black text-gray-700">{maskName(rev.parent_name)}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < rev.rating ? "fill-amber-400 text-amber-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            {/* ADD A REVIEW FORM */}
            <form onSubmit={handleReviewSubmit} className="border-t border-gray-150 pt-5 mt-2 flex flex-col gap-4">
              <h4 className="text-xs font-black text-gray-800">Tulis Ulasan Baru</h4>
              
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-grow">
                  <label className="text-[10px] font-black text-gray-400">Nama Anda</label>
                  <input
                    type="text"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    required
                    className="border-2 border-neutral-border rounded-xl py-2 px-3 text-xs font-bold focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black text-gray-400">Pilih Rating</label>
                  <div className="flex items-center gap-1 h-9">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star size={16} className={star <= reviewRating ? "fill-amber-400 text-amber-500" : "text-gray-300"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-gray-400">Komentar Ulasan</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ceritakan pengalaman belajar mengaji anak Anda..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="border-2 border-neutral-border rounded-xl py-2 px-3 text-xs font-bold focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-end bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-2.5 px-4 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center gap-1.5"
              >
                <Send size={12} />
                Kirim Ulasan
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: BOOKINGS AVAILABILITY CALENDAR */}
        <div id="booking" className="md:col-span-1 flex flex-col gap-6 scroll-mt-24">
          
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-4 text-center sm:text-left">
            <h3 className="text-base font-black text-gray-800 flex items-center gap-1.5 justify-center sm:justify-start">
              <Calendar size={18} className="text-primary" />
              Jadwal Mengajar
            </h3>
            
            {/* Weekday tab switcher */}
            <div className="grid grid-cols-4 gap-1.5 bg-gray-100 p-1 rounded-2xl border-2 border-gray-200">
              {[
                { label: "Sen", val: 1 },
                { label: "Sel", val: 2 },
                { label: "Rab", val: 3 },
                { label: "Kam", val: 4 },
              ].map((day) => (
                <button
                  key={day.val}
                  type="button"
                  onClick={() => setSelectedDayTab(day.val)}
                  className={`py-1.5 rounded-xl text-[10px] font-black transition-all ${
                    selectedDayTab === day.val
                      ? "bg-white text-primary-dark shadow-sm border border-gray-200"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>

            {/* Time Slot Availability List */}
            <div className="flex flex-col gap-2 mt-2">
              {dailySlots.length === 0 ? (
                <div className="py-6 text-center text-gray-400">
                  <p className="text-xs font-bold">Ustadz Libur Mengajar</p>
                  <p className="text-[10px] font-semibold mt-0.5">Silakan pilih hari lainnya di atas.</p>
                </div>
              ) : (
                dailySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      slot.is_blocked
                        ? "bg-gray-100/50 border-gray-200 opacity-60"
                        : "bg-white border-neutral-border hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black text-gray-700">{slot.time_slot}</span>
                      <span className="text-[9px] font-semibold text-gray-400">WIB Jakarta</span>
                    </div>

                    {slot.is_blocked ? (
                      <span className="text-[9px] bg-gray-250 text-gray-400 font-black px-2.5 py-1 rounded-lg border border-gray-300 select-none">
                        TERISI 👥
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBookingSlot(slot)}
                        className="bg-primary hover:bg-primary-dark text-white font-extrabold text-[10px] py-1.5 px-3 rounded-lg border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center gap-1 shadow-sm"
                      >
                        Booking 📹
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Pricing Tag details */}
            <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between items-center text-xs">
              <span className="font-extrabold text-gray-400">Tarif per Sesi</span>
              <span className="font-black text-primary-dark text-sm bg-primary-light px-2.5 py-1 rounded-lg border border-primary/20">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(teacher.price_per_session)}
              </span>
            </div>

          </div>

          {/* ACCREDITATIONS & BADGES INFO */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-3 text-left">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Garansi Mengaji Ceria</h4>
            <ul className="text-xs font-semibold text-gray-500 leading-relaxed flex flex-col gap-2.5">
              <li className="flex items-start gap-1.5">
                <span className="text-primary">•</span>
                <span>Ustadz dan Ustazah telah melalui seleksi wawancara makhraj dan metode mengajar santri cilik.</span>
              </li>
              <li className="flex items-start gap-1.5 border-t border-gray-100 pt-2.5">
                <span className="text-primary">•</span>
                <span>Setiap sesi berdurasi 30 menit penuh tatap muka video interaktif menggunakan Google Meet.</span>
              </li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
}
