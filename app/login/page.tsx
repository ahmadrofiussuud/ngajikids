"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore, UserRole } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const setRole = useStore((state) => state.setRole);

  const [activeRole, setActiveRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // Basic form validation
    if (!email || !password) {
      setErrorMsg("Email dan kata sandi wajib diisi!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Kata sandi harus minimal 6 karakter!");
      setLoading(false);
      return;
    }

    // Simulate login duration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Save user to Zustand state store
      setUser({
        id: activeRole === "student" ? "child_1" : activeRole === "parent" ? "parent_1" : "teacher_1",
        name: activeRole === "student" ? "Fatih" : activeRole === "parent" ? "Bunda Fatih" : "Ustadz Riza",
        role: activeRole,
        avatar: activeRole === "student" ? "star" : "default",
      });
      setRole(activeRole);

      // Redirect based on role
      setTimeout(() => {
        if (activeRole === "student") {
          router.push("/dashboard");
        } else if (activeRole === "parent") {
          router.push("/dashboard/parent");
        } else if (activeRole === "teacher") {
          router.push("/guru");
        } else {
          router.push("/");
        }
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito flex items-center justify-center p-4 sm:p-6 select-none bg-islamic-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white border-4 border-neutral-border rounded-[40px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Top Sunbeams */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-primary-light/30 rounded-full filter blur-xl" />
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-secondary-light/30 rounded-full filter blur-xl" />

        {/* Brand Logo & Greeting */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="bg-primary p-2.5 rounded-2xl border-2 border-primary-dark shadow-sm mb-3">
            <Sparkles className="text-white w-6 h-6 animate-pulse" />
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight text-primary-dark">
            Ngaji<span className="text-secondary">Kidz</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-1">
            Masuk ke gerbang petualangan mengaji Al-Qur'an!
          </p>
        </div>

        {/* Success Modal Simulation */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
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
                Menghubungkan ke dasbor dalam hitungan detik...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role Selection Tabs */}
        <div className="flex justify-between gap-1 bg-gray-100 p-1.5 rounded-2xl border-2 border-gray-200 mb-6 relative z-10">
          {(["student", "parent", "teacher"] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setActiveRole(r);
                setErrorMsg("");
              }}
              className={`flex-1 text-xs font-black py-2.5 px-2 rounded-xl capitalize transition-all duration-200 relative ${
                activeRole === r
                  ? "bg-white text-primary-dark shadow-sm border border-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {r === "student" ? "👦 Siswa" : r === "parent" ? "👩‍👦 Orangtua" : "🎓 Guru"}
            </button>
          ))}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2 text-red-600 text-xs font-bold mb-4"
            >
              <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credentials Form */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 relative z-10">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider pl-1">
              Alamat Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                placeholder="fatih@ngajikids.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-3 border-neutral-border rounded-2xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:border-primary bg-neutral-warm/25 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider pl-1">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-3 border-neutral-border rounded-2xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:border-primary bg-neutral-warm/25 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-extrabold text-base py-3.5 rounded-2xl border-b-4 border-primary-dark disabled:border-transparent active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
              </span>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={18} className="stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* Onboarding registration redirect */}
        <div className="mt-8 text-center relative z-10 border-t border-gray-100 pt-6">
          <p className="text-xs sm:text-sm font-semibold text-gray-400">
            Belum punya akun?{" "}
            <Link
              href="/onboarding"
              className="text-primary-dark font-black hover:underline inline-flex items-center gap-0.5"
            >
              Daftar Baru Di Sini <ChevronRightIcon />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Icon helper
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-primary-dark stroke-[3] fill-none">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
