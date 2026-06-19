"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  AlertCircle,
  Plus,
  Lock,
  User,
} from "lucide-react";
import Link from "next/link";

interface Booking {
  id: string;
  studentName: string;
  level: string;
  timeSlot: string;
  day: string;
  status: "ready" | "waiting" | "scheduled";
  meetUrl: string;
}

export default function TeacherSchedulePage() {
  const [activeTabDay, setActiveTabDay] = useState("Senin");
  const [showBlockedAlert, setShowBlockedAlert] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>( [
    { id: "b1", studentName: "Ahmad Fatih", level: "Iqra 3", timeSlot: "15:30 - 16:00", day: "Senin", status: "ready", meetUrl: "https://meet.google.com/abc-defg-hij" },
    { id: "b2", studentName: "Rian Kurniawan", level: "Iqra 2", timeSlot: "16:30 - 17:00", day: "Senin", status: "waiting", meetUrl: "https://meet.google.com/abc-defg-hij" },
    { id: "b3", studentName: "Zahra Humaira", level: "Iqra 1", timeSlot: "16:00 - 16:30", day: "Selasa", status: "scheduled", meetUrl: "https://meet.google.com/abc-defg-hij" },
    { id: "b4", studentName: "Ahmad Fatih", level: "Iqra 3", timeSlot: "15:30 - 16:00", day: "Rabu", status: "scheduled", meetUrl: "https://meet.google.com/abc-defg-hij" },
  ]);

  const [activeHours, setActiveHours] = useState([
    { id: "h1", time: "15:00 - 15:30", booked: false, blocked: false },
    { id: "h2", time: "15:30 - 16:00", booked: true, blocked: false },
    { id: "h3", time: "16:00 - 16:30", booked: false, blocked: false },
    { id: "h4", time: "16:30 - 17:00", booked: true, blocked: false },
    { id: "h5", time: "17:00 - 17:30", booked: false, blocked: true },
    { id: "h6", time: "19:30 - 20:00", booked: false, blocked: false },
    { id: "h7", time: "20:00 - 20:30", booked: false, blocked: false },
  ]);

  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const toggleBlockHour = (id: string) => {
    setActiveHours(
      activeHours.map((hour) => {
        if (hour.id === id) {
          if (hour.booked) {
            alert("Jam ini sudah di-booking siswa. Batalkan booking terlebih dahulu!");
            return hour;
          }
          const nextBlocked = !hour.blocked;
          return { ...hour, blocked: nextBlocked };
        }
        return hour;
      })
    );
    setShowBlockedAlert(true);
    setTimeout(() => setShowBlockedAlert(false), 2500);
  };

  const handleJoinMeet = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito text-gray-800">
      
      {/* HEADER */}
      <header className="bg-white border-b-3 border-neutral-border py-4 px-4 sm:px-8 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/guru"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-extrabold text-sm transition-all"
          >
            <ChevronLeft size={18} className="stroke-[3]" />
            Portal Pengajar
          </Link>
          <h1 className="font-black text-lg text-gray-800 tracking-tight flex items-center gap-2">
            Kalender Jadwal Mengajar 📅
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: AVAILABILITY WEEKLY SLOTS & CONTROLS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* WEEKDAYS SELECTOR */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm text-left">
            <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              Pilih Hari Jadwal
            </h3>

            <div className="flex flex-col gap-2">
              {daysOfWeek.map((day) => {
                const countBookings = bookings.filter((b) => b.day === day).length;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setActiveTabDay(day)}
                    className={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all flex justify-between items-center ${
                      activeTabDay === day
                        ? "border-primary bg-primary-light text-primary-dark"
                        : "border-neutral-border hover:border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    <span>{day}</span>
                    {countBookings > 0 && (
                      <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                        {countBookings} Booking
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC SHIFT HOURS CONFIG */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm text-left">
            <h3 className="text-base font-black text-gray-800 mb-2 flex items-center gap-2">
              <Clock size={18} className="text-primary" />
              Sesi Jam {activeTabDay}
            </h3>
            <p className="text-xs font-semibold text-gray-400 mb-4">
              Klik pada jam libur untuk memblokir jadwal mengajar Anda:
            </p>

            <div className="flex flex-col gap-2.5">
              {activeHours.map((hour) => (
                <div
                  key={hour.id}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    hour.blocked
                      ? "bg-red-50/50 border-red-200 opacity-80"
                      : hour.booked
                      ? "bg-emerald-50/55 border-emerald-250"
                      : "bg-white border-neutral-border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gray-700">{hour.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {hour.booked ? (
                      <span className="text-[9px] bg-primary text-white font-black px-2.5 py-0.5 rounded-full uppercase">
                        Terisi 👥
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleBlockHour(hour.id)}
                        className={`text-[9px] font-black px-2.5 py-0.5 rounded-lg border transition-all ${
                          hour.blocked
                            ? "bg-red-500 text-white border-red-600"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-500 border-gray-300"
                        }`}
                      >
                        {hour.blocked ? "TERBLOKIR 🔒" : "BLOKIR 🔓"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: BOOKINGS LIST & VIDEO MEET TRIGGER */}
        <div className="lg:col-span-2 flex flex-col gap-6 text-left">
          
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
              <Video size={18} className="text-primary" />
              Siswa Terjadwal Mengaji ({activeTabDay})
            </h3>

            {bookings.filter((b) => b.day === activeTabDay).length === 0 ? (
              <div className="py-12 text-center text-gray-400 flex flex-col items-center justify-center">
                <AlertCircle size={40} className="text-gray-300 mb-2" />
                <p className="text-xs font-bold text-gray-500">Tidak ada jadwal booking hari ini.</p>
                <p className="text-[10px] font-semibold text-gray-400 mt-1">Siswa dapat melakukan booking pada jam aktif Anda yang kosong.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {bookings
                  .filter((b) => b.day === activeTabDay)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-white rounded-2xl border-3 border-neutral-border flex flex-col sm:flex-row justify-between sm:items-center gap-4 relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full border-2 border-primary bg-primary-light flex items-center justify-center text-primary-dark font-black text-lg select-none">
                          {booking.studentName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                            {booking.studentName}
                            <span className="text-[9px] bg-secondary-light text-secondary-dark px-2 py-0.5 rounded-full font-black border border-secondary/15 uppercase">
                              {booking.level}
                            </span>
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-gray-400" />
                            <span className="text-xs font-bold text-gray-400">{booking.timeSlot} WIB</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 self-start sm:self-center">
                        {booking.status === "ready" && (
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] bg-emerald-50 text-primary-dark font-black px-2 py-1 rounded border border-primary/20 animate-pulse">
                              SIAP MULAI
                            </span>
                            <button
                              type="button"
                              onClick={() => handleJoinMeet(booking.meetUrl)}
                              className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-2 px-3.5 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all flex items-center gap-1 shadow-sm"
                            >
                              <Video size={12} />
                              Mulai GMeet 📹
                            </button>
                          </div>
                        )}
                        {booking.status === "waiting" && (
                          <button
                            type="button"
                            onClick={() => handleJoinMeet(booking.meetUrl)}
                            className="bg-gray-100 hover:bg-gray-250 text-gray-600 font-extrabold text-xs py-2 px-3.5 rounded-xl border border-gray-300 transition-all flex items-center gap-1"
                          >
                            <Video size={12} />
                            Masuk Room
                          </button>
                        )}
                        {booking.status === "scheduled" && (
                          <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                            <CheckCircle size={14} className="text-gray-400" />
                            Terjadwal
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* SCHEDULE ANNOUNCEMENT BOARD */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Peraturan Jam Mengajar</h4>
            <ul className="text-xs font-semibold text-gray-500 leading-relaxed flex flex-col gap-2">
              <li className="flex items-start gap-1.5">
                <span className="text-primary">•</span>
                <span>Ustadz diharapkan masuk ke dalam Google Meet 5 menit sebelum jadwal sesi mengaji santri dimulai.</span>
              </li>
              <li className="flex items-start gap-1.5 border-t border-gray-100 pt-2">
                <span className="text-primary">•</span>
                <span>Jika Ustadz mendadak berhalangan hadir, harap segera memblokir jam mengajar agar orang tua tidak memesan slot tersebut.</span>
              </li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
}
