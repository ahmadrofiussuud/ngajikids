"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore, UserRole } from "@/lib/store";
import AvatarKid from "@/components/ui/AvatarKid";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const setRole = useStore((state) => state.setRole);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setLoading(true);

    // Simulate login duration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Save user to Zustand state store
      setUser({
        id: role === "student" ? "child_1" : role === "parent" ? "parent_1" : "teacher_1",
        name: role === "student" ? "Fatih" : role === "parent" ? "Bunda Fatih" : "Ustadz Riza",
        role: role,
        avatar: role === "student" ? "star" : "default",
      });
      setRole(role);

      // Redirect based on role
      setTimeout(() => {
        if (role === "student") {
          router.push("/dashboard");
        } else if (role === "parent") {
          router.push("/dashboard/parent");
        } else if (role === "teacher") {
          router.push("/guru");
        } else {
          router.push("/");
        }
      }, 1000);
    }, 1200);
  };

  const roleCards = [
    {
      role: "student" as UserRole,
      title: "Santri 👦",
      desc: "Masuk gerbang belajar seru, kumpulkan koin & lencana menarik!",
      avatar: <AvatarKid character="star" size={54} animated />,
      colorClass: "hover:bg-emerald-50/40 hover:border-emerald-500 border-neutral-border",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      role: "parent" as UserRole,
      title: "Orang Tua 👩‍👦",
      desc: "Pantau kemajuan bacaan anak, absensi, & rekomendasi AI.",
      avatar: (
        <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-2xl border-2 border-purple-200 shadow-sm select-none">
          👩‍👦
        </div>
      ),
      colorClass: "hover:bg-purple-50/40 hover:border-purple-500 border-neutral-border",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      role: "teacher" as UserRole,
      title: "Ustadz 🎓",
      desc: "Kelola kelas bimbingan, jadwal tatap muka, & input laporan AI.",
      avatar: (
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-2xl border-2 border-amber-250 shadow-sm select-none">
          🎓
        </div>
      ),
      colorClass: "hover:bg-amber-50/40 hover:border-amber-500 border-neutral-border",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito flex items-center justify-center p-4 sm:p-6 select-none bg-islamic-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white border-4 border-neutral-border rounded-[40px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Top Sunbeams */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-primary-light/30 rounded-full filter blur-xl" />
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-secondary-light/30 rounded-full filter blur-xl" />

        {/* Close Button to return to landing page */}
        <Link
          href="/"
          className="absolute top-6 right-6 bg-gray-50 hover:bg-gray-100 text-gray-400 p-2 rounded-full border border-gray-150 transition-colors z-20"
          title="Kembali ke Beranda"
        >
          <X size={16} className="stroke-[3]" />
        </Link>

        {/* Brand Logo & Greeting */}
        <div className="flex flex-col items-center text-center mb-6 relative z-10">
          <img
            src="/images/logongajikids.png"
            alt="NgajiKidz Logo"
            className="h-12 w-auto object-contain mb-3"
          />
          <p className="text-sm font-bold text-gray-400 mt-1">
            Masuk ke gerbang petualangan mengaji Al-Qur'an!
          </p>
        </div>

        {/* Loading / Success Overlays */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-3.5 h-3.5 bg-primary rounded-full animate-bounce" />
                <span className="w-3.5 h-3.5 bg-primary rounded-full animate-bounce delay-100" />
                <span className="w-3.5 h-3.5 bg-primary rounded-full animate-bounce delay-200" />
              </div>
              <h2 className="text-lg font-black text-gray-700">Mempersiapkan Portal...</h2>
              <p className="text-xs font-bold text-gray-400 mt-1">Sabar ya, halaman sedang dimuat ✨</p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-emerald-50 border-2 border-primary text-primary p-4 rounded-full mb-4"
              >
                <CheckCircle2 size={40} className="stroke-[2.5]" />
              </motion.div>
              <h2 className="text-2xl font-black text-gray-800">Berhasil Masuk! 🎉</h2>
              <p className="text-sm font-semibold text-gray-400 mt-1">
                Menghubungkan ke dasbor {selectedRole === "student" ? "Santri" : selectedRole === "parent" ? "Orang Tua" : "Ustadz"}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roles Option Grid */}
        <div className="flex flex-col gap-4 relative z-10">
          <h3 className="text-xs font-black text-gray-400 tracking-wider text-center mb-1">
            Pilih Akun Untuk Masuk:
          </h3>

          {roleCards.map((card) => (
            <div key={card.role} className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handleRoleSelect(card.role)}
                className={`w-full p-4 rounded-3xl border-3 text-left transition-all active:scale-[0.98] flex items-center justify-between gap-4 bg-white hover:shadow-md ${card.colorClass}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {card.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-gray-800 flex items-center gap-2">
                      {card.title}
                    </h4>
                    <p className="text-xs font-semibold text-gray-400 mt-1 leading-relaxed max-w-[240px]">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 bg-neutral-warm border border-neutral-border p-2 rounded-xl text-gray-400 group-hover:text-primary transition-colors">
                  <ChevronRight size={18} className="stroke-[3]" />
                </div>
              </button>
              {card.role === "teacher" && (
                <div className="text-center text-xs mt-1">
                  <span className="font-semibold text-gray-400">Calon Ustadz? </span>
                  <Link href="/guru/register" className="font-extrabold text-amber-600 hover:underline">
                    Daftar Baru di Sini ➔
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-[10px] font-semibold text-gray-400 mt-6 text-center relative z-10">
          NgajiKidz Platform Belajar Al-Qur'an Anak Berbasis AI &amp; Gamifikasi.
        </p>

      </motion.div>
    </div>
  );
}
