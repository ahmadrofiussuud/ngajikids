"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Bell,
  Lock,
  Users,
  Check,
  ChevronLeft,
  Shield,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function ParentProfilePage() {
  const [parentName, setParentName] = useState("Fatimah Azzahra");
  const [email, setEmail] = useState("fatimah@example.com");
  const [phone, setPhone] = useState("081234567890");
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [pin, setPin] = useState("1234");
  const [showSavedToast, setShowSavedToast] = useState(false);

  const [children, setChildren] = useState([
    { id: "child_1", name: "Ahmad Fatih", level: "Iqra 3", streak: 7, avatar: "👦" },
    { id: "child_2", name: "Zahra Humaira", level: "Iqra 1", streak: 0, avatar: "👧" },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const handleAddChild = () => {
    const name = prompt("Masukkan nama anak:");
    if (!name) return;
    setChildren([
      ...children,
      {
        id: `child_${Date.now()}`,
        name,
        level: "Iqra 1",
        streak: 0,
        avatar: Math.random() > 0.5 ? "👦" : "👧",
      },
    ]);
  };

  const handleDeleteChild = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus profil anak ini? Semua data progres akan hilang.")) {
      setChildren(children.filter((child) => child.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito relative text-gray-800">
      {/* Toast Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-primary-dark text-white px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-2 border-2 border-primary"
          >
            <Check size={18} className="stroke-[3]" />
            <span>Pengaturan orang tua berhasil disimpan! 👩‍👦</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="bg-white border-b-3 border-neutral-border py-4 px-4 sm:px-8 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard/parent"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-extrabold text-sm transition-all"
          >
            <ChevronLeft size={18} className="stroke-[3]" />
            Dashboard
          </Link>
          <h1 className="font-black text-lg text-gray-800 tracking-tight">
            Profil &amp; Keamanan Orang Tua 👩‍👦
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT AREA: ACCOUNT & SECURITY */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* PERSONAL DATA */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" />
                Data Profil Orang Tua
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-gray-400">Nama Lengkap</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-gray-400 flex items-center gap-1">
                      <Mail size={12} /> Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-gray-400 flex items-center gap-1">
                      <Phone size={12} /> Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-bold text-gray-700 transition-colors bg-neutral-warm/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* NOTIFICATION PREFERENCES */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <Bell size={20} className="text-primary" />
                Preferensi Notifikasi &amp; Laporan
              </h3>
              
              <div className="flex flex-col gap-3.5">
                {/* WA alerts */}
                <button
                  type="button"
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all text-left ${
                    whatsappAlerts ? "border-primary bg-primary-light/10" : "border-neutral-border bg-white"
                  }`}
                >
                  <div>
                    <p className="text-xs font-black text-gray-700">Laporan Kemajuan via WhatsApp</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">Kirim rangkuman harian progres bacaan Iqra santri otomatis</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${whatsappAlerts ? "bg-primary" : "bg-gray-200"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${whatsappAlerts ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

                {/* Email alerts */}
                <button
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all text-left ${
                    emailAlerts ? "border-primary bg-primary-light/10" : "border-neutral-border bg-white"
                  }`}
                >
                  <div>
                    <p className="text-xs font-black text-gray-700">Email Rencana Mingguan &amp; Analisis AI</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">Dapatkan detail diagnosis tajwid &amp; visual grafik mingguan</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${emailAlerts ? "bg-primary" : "bg-gray-200"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${emailAlerts ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

                {/* Session alerts */}
                <button
                  type="button"
                  onClick={() => setSessionAlerts(!sessionAlerts)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all text-left ${
                    sessionAlerts ? "border-primary bg-primary-light/10" : "border-neutral-border bg-white"
                  }`}
                >
                  <div>
                    <p className="text-xs font-black text-gray-700">Pengingat Jadwal Belajar</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">Kirim notifikasi 15 menit sebelum tatap muka video ustadz dimulai</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${sessionAlerts ? "bg-primary" : "bg-gray-200"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${sessionAlerts ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* SECURITY GATE */}
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-2 flex items-center gap-2">
                <Shield size={20} className="text-purple-600" />
                Gerbang Orang Tua (Security PIN)
              </h3>
              <p className="text-xs font-semibold text-gray-400 mb-4 leading-relaxed">
                PIN ini digunakan untuk membuka Portal Orang Tua agar anak tidak dapat mengubah pengaturan belajar secara mandiri.
              </p>
              
              <div className="flex flex-col gap-1.5 max-w-[200px]">
                <label className="text-xs font-black text-gray-400 flex items-center gap-1">
                  <Lock size={12} /> PIN Keamanan (4 Digit)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-border focus:border-primary outline-none font-black text-center text-lg tracking-[0.5em] text-gray-700 transition-colors bg-neutral-warm/20"
                />
              </div>
            </div>

          </div>

          {/* RIGHT AREA: MANAGING LINKED CHILDREN */}
          <div className="md:col-span-1 flex flex-col gap-6">
            
            <div className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-gray-800 flex items-center gap-1.5">
                  <Users size={18} className="text-primary" />
                  Profil Anak
                </h3>
                <button
                  type="button"
                  onClick={handleAddChild}
                  className="bg-primary/10 hover:bg-primary/20 text-primary-dark p-1.5 rounded-xl border border-primary/20 transition-all active:scale-95 flex items-center justify-center"
                >
                  <Plus size={16} className="stroke-[3]" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-150 transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-secondary/20 flex items-center justify-center text-lg shadow-sm">
                        {child.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-800">{child.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                          {child.level} • 🔥 {child.streak} Hari
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleDeleteChild(child.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Hapus Profil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-[10px] font-semibold text-gray-400 leading-relaxed text-center">
                Maksimal 4 profil anak per akun orang tua. Klik ikon tambah untuk mendaftarkan akun santri baru.
              </p>
            </div>

            {/* BUTTON ACTION GROUP */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Simpan Perubahan 💾
              </button>
              <Link
                href="/dashboard/parent"
                className="w-full bg-white hover:bg-gray-50 text-gray-500 font-extrabold text-base text-center py-3.5 rounded-2xl border-2 border-neutral-border border-b-4 border-b-neutral-border active:border-b-2 active:translate-y-0.5 transition-all"
              >
                Batal
              </Link>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
}
