"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Compass,
  Award,
  TrendingUp,
  Brain,
  Shield,
  Gamepad2,
  Calendar,
  Lock,
  Heart,
  Gem,
  Mic,
  Laptop,
  QrCode,
  Wallet,
  FileText,
  Tag,
  RotateCcw,
} from "lucide-react";
import KidReadingQuran from "@/components/animations/KidReadingQuran";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

export default function LandingPage() {
  // Framer Motion Variants for 3 accounts section
  const roleSectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const roleCardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // States for interactive components
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [kelompokPlan, setKelompokPlan] = useState<"tahsin" | "tahfidz" | "hafidz">("tahsin");
  const [privatPlan, setPrivatPlan] = useState<"tasmi" | "talaqqi" | "mutqin">("talaqqi");

  // FAQ Accordion Data
  const faqs = [
    {
      q: "Untuk usia berapa platform NgajiKidz ini dirancang?",
      a: "NgajiKidz dirancang khusus untuk anak-anak sekolah dasar usia 6 sampai 12 tahun. Antarmuka dan metode belajarnya disesuaikan agar terasa seperti bermain game yang mendidik.",
    },
    {
      q: "Bagaimana cara kerja teknologi kecerdasan buatan (AI) di NgajiKidz?",
      a: "AI kami menganalisis rekaman suara pelafalan huruf Hijaiyah dan ayat Al-Qur'an anak secara real-time. Sistem kemudian mendeteksi kesalahan makhraj secara otomatis dan menyusun rekomendasi latihan khusus agar pelafalan anak menjadi sempurna.",
    },
    {
      q: "Apa yang dimaksud dengan Akad Ijarah dalam biaya langganan?",
      a: "Dalam prinsip muamalah syariah, kami menggunakan Akad Ijarah (sewa-jasa). Anda membayarkan biaya sebagai kompensasi atas penyediaan jasa pengajaran, pemeliharaan sistem aplikasi, dan penyediaan Ustadz terverifikasi secara syar'i.",
    },
    {
      q: "Apakah anak saya bisa belajar langsung dengan Ustadz secara tatap muka virtual?",
      a: "Ya! Di paket Premium, anak Anda mendapatkan akses sesi interaktif 1-on-1 bersama Ustadz atau Ustadzah terverifikasi yang dilatih khusus metode pengajaran ramah anak.",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Bunda Sarah Amelia",
      role: "Ibu Rumah Tangga, Jakarta Selatan",
      text: "Dulu susah sekali menyuruh si kembar ngaji sore-sore. Sekarang dengan NgajiKidz, mereka malah berebutan menyelesaikan misi harian demi membuka lencana baru. Terbaik!",
      rating: 5,
    },
    {
      name: "Ayah Hendra Wijaya",
      role: "Karyawan Swasta, Surabaya",
      text: "Sistem laporan progresnya sangat membantu saya yang sibuk bekerja. Saya bisa melihat perkembangan makhraj dan tajwid anak langsung melalui WhatsApp report berkala. Sangat transparan.",
      rating: 5,
    },
    {
      name: "Umi Fatimah",
      role: "Pendidik & Orangtua, Bandung",
      text: "Metode gamifikasi Islami yang dipadukan dengan bimbingan Ustadz di platform ini sangat terstruktur. Anak saya belajar tajwid tanpa merasa sedang dipaksa belajar.",
      rating: 5,
    },
  ];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito flex flex-col selection:bg-primary-light selection:text-primary-dark">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-primary-light/25 to-transparent pt-12 pb-20 px-4 sm:px-6 overflow-hidden bg-islamic-pattern">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <FadeIn duration={0.6}>
              <span className="bg-primary-light text-primary-dark border border-primary/20 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-4 shadow-sm">
                🕌 Edukasi Al-Qur'an Anak Abad 21
              </span>
            </FadeIn>
            <FadeIn delay={0.15} duration={0.6}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                Membentuk Generasi Cinta Al-Qur'an dengan{" "}
                <span className="text-primary relative inline-block">
                  Cara Seru!
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-secondary/35 -z-10 rounded-full" />
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} duration={0.6}>
              <p className="text-base sm:text-lg text-gray-500 mt-4 max-w-xl mx-auto lg:mx-0 font-semibold leading-relaxed">
                NgajiKidz memadukan teknologi kecerdasan buatan (AI) dengan gamifikasi islami 
                dan bimbingan Ustadz tersertifikasi untuk menghadirkan pengalaman mengaji yang dirindukan anak setiap hari.
              </p>
            </FadeIn>
            <FadeIn delay={0.45} duration={0.6}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/login"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 px-8 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  Coba Gratis Sekarang
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </Link>
                <Link
                  href="/#cara-kerja"
                  className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-base py-3.5 px-8 rounded-2xl border-2 border-neutral-border shadow-sm flex items-center justify-center"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Hero Animation Mascot */}
          <div className="flex-1 w-full max-w-[450px]">
            <FadeIn delay={0.2} duration={0.7} direction="none">
              <div className="bg-white/40 border-3 border-neutral-border rounded-3xl p-4 shadow-sm backdrop-blur-sm relative">
                <KidReadingQuran />
                <div className="absolute -bottom-3 -right-3 bg-secondary text-white border-2 border-secondary-dark px-3 py-1.5 rounded-2xl text-xs font-black rotate-3 shadow-md flex items-center gap-1">
                  <Star size={14} fill="currentColor" className="stroke-none" />
                  AI Makhraj Tracker
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF SECTION */}
      <section className="border-y-3 border-neutral-border bg-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-extrabold text-gray-400 uppercase tracking-widest">
            Dipercaya oleh 10.000+ Keluarga Muslim di Seluruh Indonesia
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            <span className="font-extrabold text-lg sm:text-xl text-gray-600 tracking-wider">REPUBLIKA</span>
            <span className="font-extrabold text-lg sm:text-xl text-gray-600 tracking-wider">KOMPAS</span>
            <span className="font-extrabold text-lg sm:text-xl text-gray-600 tracking-wider">DETIK.EDU</span>
            <span className="font-extrabold text-lg sm:text-xl text-gray-600 tracking-wider">ISLAMIC.POST</span>
          </div>
        </div>
      </section>

      {/* 2.5. THREE ACCOUNTS EXPLAINER */}
      <section className="py-20 px-4 sm:px-6 bg-neutral-warm border-b-3 border-neutral-border">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-4 shadow-xs">
            Pilihan Akun Akses
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
            Satu Platform, Tiga Pengalaman Berbeda
          </h2>
          <p className="text-sm font-semibold text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            NgajiKidz dirancang khusus untuk tiga peran — setiap pengguna mendapat dasbor, fitur, dan pengalaman yang disesuaikan.
          </p>

          <motion.div
            variants={roleSectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left"
          >
            {/* Card 1: Santri */}
            <motion.div
              variants={roleCardVariants}
              className="bg-white border-3 border-emerald-500 rounded-[32px] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full filter blur-lg pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 border-2 border-emerald-250 flex items-center justify-center text-3xl shadow-sm mb-6 select-none font-bold">
                  👦
                </div>
                <h3 className="font-extrabold text-lg text-gray-850">Akun Santri</h3>
                <p className="text-xs font-semibold text-gray-400 mt-2.5 leading-relaxed">
                  Anak belajar Iqra dan Al-Qur'an lewat peta petualangan interaktif. Kumpulkan koin, raih lencana, dan naiki level bersama teman-teman.
                </p>
                
                {/* Key Features bullet points list */}
                <div className="mt-4 pt-4 border-t border-gray-100/60">
                  <span className="text-[10px] font-black text-gray-450 uppercase tracking-widest block mb-2">Fitur Kunci:</span>
                  <p className="text-[11px] font-bold text-gray-500 leading-relaxed">
                    Peta belajar Iqra 1–6 · Gamifikasi koin &amp; lencana · AI Tajwid Checker · Toko avatar
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-center block py-3 rounded-2xl border-b-4 border-[#047857] active:border-b-0 active:translate-y-1 transition-all text-xs sm:text-sm shadow-sm"
                >
                  Coba sebagai Santri ➔
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Orang Tua */}
            <motion.div
              variants={roleCardVariants}
              className="bg-white border-3 border-cyan-400 rounded-[32px] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/5 rounded-full filter blur-lg pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-850 border-2 border-cyan-250 flex items-center justify-center text-3xl shadow-sm mb-6 select-none font-bold">
                  👩‍👦
                </div>
                <h3 className="font-extrabold text-lg text-gray-850">Akun Orang Tua</h3>
                <p className="text-xs font-semibold text-gray-400 mt-2.5 leading-relaxed">
                  Pantau progres anak secara real-time tanpa harus duduk mendampingi. Laporan lengkap dari AI dan catatan langsung ustadz tersedia di genggaman.
                </p>

                {/* Key Features bullet points list */}
                <div className="mt-4 pt-4 border-t border-gray-100/60">
                  <span className="text-[10px] font-black text-gray-450 uppercase tracking-widest block mb-2">Fitur Kunci:</span>
                  <p className="text-[11px] font-bold text-gray-500 leading-relaxed">
                    Laporan progres real-time · Catatan ustadz · Unduh worksheet cetak · PIN keamanan dasbor
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-extrabold text-center block py-3 rounded-2xl border-b-4 border-[#0e7490] active:border-b-0 active:translate-y-1 transition-all text-xs sm:text-sm shadow-sm"
                >
                  Coba sebagai Orang Tua ➔
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Ustadz */}
            <motion.div
              variants={roleCardVariants}
              className="bg-white border-3 border-amber-400 rounded-[32px] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/5 rounded-full filter blur-lg pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-850 border-2 border-amber-250 flex items-center justify-center text-3xl shadow-sm mb-6 select-none font-bold">
                  🎓
                </div>
                <h3 className="font-extrabold text-lg text-gray-850">Akun Ustadz</h3>
                <p className="text-xs font-semibold text-gray-400 mt-2.5 leading-relaxed">
                  Kelola jadwal mengajar, evaluasi santri, dan rekap absensi dalam satu dasbor. AI membantu merancang jalur belajar personal tiap santri.
                </p>

                {/* Key Features bullet points list */}
                <div className="mt-4 pt-4 border-t border-gray-100/60">
                  <span className="text-[10px] font-black text-gray-450 uppercase tracking-widest block mb-2">Fitur Kunci:</span>
                  <p className="text-[11px] font-bold text-gray-500 leading-relaxed">
                    Jadwal &amp; booking kelas · Absensi dinamis · Form evaluasi santri · AI Learning Path Generator
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-center block py-3 rounded-2xl border-b-4 border-[#B45309] active:border-b-0 active:translate-y-1 transition-all text-xs sm:text-sm shadow-sm"
                >
                  Coba sebagai Ustadz ➔
                </Link>
                <Link
                  href="/guru/register"
                  className="text-[11px] font-black text-[#D97706] hover:underline text-center block mt-3"
                >
                  Tertarik Mengajar? Daftar Jadi Ustadz ➔
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="cara-kerja" className="py-20 px-4 sm:px-6 bg-islamic-pattern">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
            TAHAPAN BELAJAR
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mt-3">
            3 Langkah Mudah Menuju Hafalan Sempurna
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
            {/* Step 1 */}
            <FadeIn delay={0.1} duration={0.6}>
              <div className="bg-white border-3 border-neutral-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative flex flex-col items-center">
                <div className="bg-amber-50 border-2 border-secondary text-secondary w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl mb-6 shadow-sm">
                  1
                </div>
                <h3 className="font-extrabold text-lg text-gray-800">Tes Level Awal</h3>
                <p className="text-sm font-semibold text-gray-400 mt-2 leading-relaxed">
                  Anak membuat avatar dan mengikuti kuis interaktif singkat untuk memetakan kemampuan dasar mengaji mereka.
                </p>
              </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn delay={0.25} duration={0.6}>
              <div className="bg-white border-3 border-neutral-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative flex flex-col items-center">
                <div className="bg-emerald-50 border-2 border-primary text-primary w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl mb-6 shadow-sm">
                  2
                </div>
                <h3 className="font-extrabold text-lg text-gray-800">Jalur Belajar AI</h3>
                <p className="text-sm font-semibold text-gray-400 mt-2 leading-relaxed">
                  Kecerdasan buatan menyusun jalur materi Iqra &amp; Surah secara personal sesuai hasil deteksi pelafalan anak.
                </p>
              </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn delay={0.4} duration={0.6}>
              <div className="bg-white border-3 border-neutral-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative flex flex-col items-center">
                <div className="bg-purple-50 border-2 border-accent text-accent w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl mb-6 shadow-sm">
                  3
                </div>
                <h3 className="font-extrabold text-lg text-gray-800">Bimbingan Ustadz</h3>
                <p className="text-sm font-semibold text-gray-400 mt-2 leading-relaxed">
                  Sesi tatap muka virtual interaktif bersama Ustadz &amp; Ustadzah tersertifikasi untuk penyempurnaan makhraj.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>



      {/* 5. TESTIMONIALS */}
      <section className="py-20 px-4 bg-islamic-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
            KATA ORANG TUA
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mt-3 mb-12">
            Cerita Sukses Bersama NgajiKidz
          </h2>

          <div className="relative bg-white border-3 border-neutral-border rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
            <div className="flex justify-center gap-1 text-secondary mb-6">
              {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" className="stroke-none" />
              ))}
            </div>

            <p className="text-base sm:text-lg font-bold text-gray-700 italic leading-relaxed">
              "{testimonials[testimonialIndex].text}"
            </p>

            <h4 className="font-black text-gray-800 mt-6 text-base sm:text-lg">
              {testimonials[testimonialIndex].name}
            </h4>
            <p className="text-xs sm:text-sm font-bold text-gray-400 mt-0.5">
              {testimonials[testimonialIndex].role}
            </p>

            {/* Slider Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 border-2 border-neutral-border hover:border-primary rounded-xl flex items-center justify-center transition-colors active:scale-95 bg-white"
              >
                <ChevronLeft size={20} className="stroke-[2.5]" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 border-2 border-neutral-border hover:border-primary rounded-xl flex items-center justify-center transition-colors active:scale-95 bg-white"
              >
                <ChevronRight size={20} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section id="harga" className="py-20 px-4 sm:px-6 bg-white border-y-3 border-neutral-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
              PILIHAN PAKET LANGGANAN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mt-3">
              Investasi Terbaik untuk Masa Depan Akhirat Anak
            </h2>
            
            {/* Syar'i Akad Framing & Transparency Alert Box */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 max-w-3xl mx-auto">
              <div className="bg-amber-50 border border-secondary/25 p-3 rounded-2xl flex items-center justify-center gap-2 flex-1">
                <Award size={16} className="text-secondary shrink-0" />
                <span className="text-xs font-bold text-secondary-dark leading-tight text-left">
                  Menggunakan Akad Ijarah (Sewa Jasa Pengajaran) yang Syar'i dan Transparan.
                </span>
              </div>
              <div className="bg-emerald-50 border border-primary/20 p-3 rounded-2xl flex items-center justify-center gap-2 flex-1">
                <Shield size={16} className="text-primary-dark shrink-0" />
                <span className="text-xs font-bold text-primary-dark leading-tight text-left">
                  Transparan: Platform menerima fee 15% untuk operasional, 85% disalurkan langsung sebagai ujrah Ustadz.
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Card 1: Gratis */}
            <div className="bg-white border-3 border-neutral-border rounded-3xl p-6 flex flex-col justify-between shadow-sm relative text-left">
              <div>
                <span className="text-[10px] font-black uppercase bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200">
                  Belajar Mandiri
                </span>
                <h3 className="font-extrabold text-xl text-gray-850 mt-4">Paket Gratis</h3>
                <div className="mt-3 flex items-baseline text-gray-800 font-extrabold">
                  <span className="text-2xl">Rp</span>
                  <span className="text-5xl">0</span>
                  <span className="text-gray-400 font-bold ml-2">/ selamanya</span>
                </div>
                <p className="text-xs font-semibold text-gray-400 mt-2 leading-relaxed">
                  Santri dapat belajar secara mandiri, melatih makhraj huruf dasar, dan mencoba petualangan awal.
                </p>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <h4 className="font-extrabold text-xs text-gray-800 uppercase tracking-wider mb-3">
                    Fitur yang didapatkan:
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-primary stroke-[3]" />
                      Akses Modul Iqra 1, 2, &amp; 3
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-primary stroke-[3]" />
                      Deteksi Makhraj AI Dasar (10x/hari)
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-primary stroke-[3]" />
                      Sistem Gamifikasi &amp; 1 Kustom Avatar
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-center block py-3 rounded-2xl border-2 border-neutral-border shadow-sm transition-all text-xs"
                >
                  Mulai Belajar Gratis
                </Link>
              </div>
            </div>

            {/* Card 2: B2C Kelompok */}
            <div className="bg-white border-3 border-secondary rounded-3xl p-6 flex flex-col justify-between shadow-sm relative text-left">
              <span className="absolute -top-3.5 left-6 bg-secondary text-white font-black text-[9px] px-3 py-1 rounded-full border border-secondary-dark uppercase tracking-wider">
                5-6 Santri per Kelas
              </span>
              <div>
                <span className="text-[10px] font-black uppercase bg-amber-50 text-secondary-dark px-3 py-1 rounded-full border border-secondary/20">
                  Kelas Kelompok (2 Jam)
                </span>
                
                {/* Dynamic Price Display */}
                <div className="mt-4 flex items-baseline text-gray-800 font-extrabold">
                  <span className="text-2xl">Rp</span>
                  <span className="text-5xl">
                    {kelompokPlan === "tahsin" ? "49K" : kelompokPlan === "tahfidz" ? "89K" : "139K"}
                  </span>
                  <span className="text-gray-400 font-bold ml-2">/ bulan</span>
                </div>

                {/* Sub Plan Selector */}
                <div className="bg-gray-50 border border-gray-150 p-1 rounded-xl flex gap-1 mt-4">
                  {(["tahsin", "tahfidz", "hafidz"] as const).map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setKelompokPlan(plan)}
                      className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-black capitalize transition-all ${
                        kelompokPlan === plan
                          ? "bg-secondary text-white shadow-xs"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-secondary-dark uppercase tracking-wider mb-3">
                    <span>Sesi Pertemuan:</span>
                    <span>
                      {kelompokPlan === "tahsin" ? "4 Sesi / Bln" : kelompokPlan === "tahfidz" ? "8 Sesi / Bln" : "12 Sesi / Bln"}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-secondary stroke-[3]" />
                      Kelas interaktif (5-6 anak)
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-secondary stroke-[3]" />
                      Durasi panjang 2 jam per sesi
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-secondary stroke-[3]" />
                      {kelompokPlan === "tahsin" && "Tahsin: Fokus makhraj & hukum tajwid lisan"}
                      {kelompokPlan === "tahfidz" && "Tahfidz: Setoran hafalan baru & murajaah"}
                      {kelompokPlan === "hafidz" && "Hafidz: Pengulangan intensif juz 30 & surah"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="w-full bg-secondary hover:bg-secondary-dark text-white font-extrabold text-center block py-3 rounded-2xl border-b-4 border-secondary-dark active:border-b-0 active:translate-y-1 transition-all text-xs shadow-md"
                >
                  Pilih Paket Kelompok
                </Link>
              </div>
            </div>

            {/* Card 3: B2C Privat */}
            <div className="bg-white border-3 border-primary rounded-3xl p-6 flex flex-col justify-between shadow-md relative text-left overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white font-black text-[9px] uppercase tracking-wider py-1 px-4 rounded-bl-2xl">
                Eksklusif 1-on-1 ⭐
              </div>
              <div>
                <span className="text-[10px] font-black uppercase bg-primary-light text-primary-dark px-3 py-1 rounded-full border border-primary/20">
                  Kelas Privat (1 Jam)
                </span>
                
                {/* Dynamic Price Display */}
                <div className="mt-4 flex items-baseline text-gray-800 font-extrabold">
                  <span className="text-2xl">Rp</span>
                  <span className="text-5xl">
                    {privatPlan === "tasmi" ? "109K" : privatPlan === "talaqqi" ? "199K" : "289K"}
                  </span>
                  <span className="text-gray-400 font-bold ml-2">/ bulan</span>
                </div>

                {/* Sub Plan Selector */}
                <div className="bg-gray-50 border border-gray-150 p-1 rounded-xl flex gap-1 mt-4">
                  {(["tasmi", "talaqqi", "mutqin"] as const).map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setPrivatPlan(plan)}
                      className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-black capitalize transition-all ${
                        privatPlan === plan
                          ? "bg-primary text-white shadow-xs"
                          : "text-gray-450 hover:bg-gray-100"
                      }`}
                    >
                      {plan === "tasmi" ? "Tasmi'" : plan === "talaqqi" ? "Talaqqi" : "Mutqin"}
                    </button>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-primary-dark uppercase tracking-wider mb-3">
                    <span>Sesi Pertemuan:</span>
                    <span>
                      {privatPlan === "tasmi" ? "4 Sesi / Bln" : privatPlan === "talaqqi" ? "8 Sesi / Bln" : "12 Sesi / Bln"}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-primary stroke-[3]" />
                      Belajar privat 1 anak bersama 1 Ustadz
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-primary stroke-[3]" />
                      Bebas booking jadwal &amp; Ustadz pilihan
                    </li>
                    <li className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Check size={14} className="text-primary stroke-[3]" />
                      {privatPlan === "tasmi" && "Tasmi': Menyimak setoran hafalan santri secara jeli"}
                      {privatPlan === "talaqqi" && "Talaqqi: Tatap muka face-to-face makhraj & kelancaran"}
                      {privatPlan === "mutqin" && "Mutqin: Target hafalan kuat & murajaah melekat kuat"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-center block py-3 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all text-xs shadow-md"
                >
                  Pilih Paket Privat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. DEWAN SYARIAH & PEMBAYARAN SYARIAH */}
      <section className="py-20 px-4 sm:px-6 bg-emerald-50/10 border-b-3 border-neutral-border relative overflow-hidden">
        {/* Floating Dewan Syariah Badge */}
        <div className="absolute top-6 right-6 md:top-12 md:right-12 bg-amber-400 text-teal-950 border-2 border-amber-600 rounded-2xl px-3 py-2 text-xs font-black rotate-6 shadow-md flex items-center gap-1.5 z-10 select-none">
          <Award size={16} className="text-teal-950 animate-bounce" />
          <span>Ditinjau Dewan Syariah</span>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-[#4C9A84] bg-emerald-50 border border-emerald-250 px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-3">
              Kepatuhan Syariah
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              Pembayaran Tenang, Sesuai Syariah
            </h2>
            <p className="text-sm font-semibold text-gray-450 mt-3 leading-relaxed">
              Setiap transaksi di NgajiKidz menggunakan akad ijarah — akad jasa yang jelas, transparan, dan bebas dari unsur riba serta gharar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Point 1: Akad Ijarah yang Jelas */}
            <div className="bg-white border-2 border-neutral-border rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-primary transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-primary/20 text-[#4C9A84] flex items-center justify-center mb-4">
                  <FileText size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-gray-850">Akad Ijarah yang Jelas</h3>
                <p className="text-[11px] font-semibold text-gray-450 mt-2 leading-relaxed">
                  Setiap pembayaran adalah akad sewa manfaat jasa pendidikan. Hak dan kewajiban kedua pihak jelas sejak awal, tidak ada biaya tersembunyi.
                </p>
              </div>
            </div>

            {/* Point 2: Bebas Riba & Gharar */}
            <div className="bg-white border-2 border-neutral-border rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-primary transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-primary/20 text-[#4C9A84] flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-gray-850">Bebas Riba &amp; Gharar</h3>
                <p className="text-[11px] font-semibold text-gray-450 mt-2 leading-relaxed">
                  Tidak ada bunga, tidak ada ketidakjelasan layanan. Anda tahu persis apa yang dibayar dan apa yang didapat.
                </p>
              </div>
            </div>

            {/* Point 3: Harga Transparan, Tidak Ada Biaya Kejutan */}
            <div className="bg-white border-2 border-neutral-border rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-primary transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-primary/20 text-[#4C9A84] flex items-center justify-center mb-4">
                  <Tag size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-gray-850">Harga Transparan</h3>
                <p className="text-[11px] font-semibold text-gray-450 mt-2 leading-relaxed">
                  Harga tertera adalah harga final. Tidak ada biaya tambahan tersembunyi setelah pembayaran dikonfirmasi.
                </p>
              </div>
            </div>

            {/* Point 4: Pembatalan Adil Sesuai Ketentuan */}
            <div className="bg-white border-2 border-neutral-border rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-primary transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-primary/20 text-[#4C9A84] flex items-center justify-center mb-4">
                  <RotateCcw size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-gray-850">Pembatalan Adil</h3>
                <p className="text-[11px] font-semibold text-gray-450 mt-2 leading-relaxed">
                  Kebijakan pembatalan dan refund mengikuti prinsip keadilan Islam — proporsional terhadap layanan yang sudah dinikmati.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="mt-16 text-center border-t border-gray-150 pt-8 flex flex-col items-center gap-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Didukung oleh:</span>
            
            {/* Payment Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-black text-gray-500">
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">QRIS</span>
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">GoPay</span>
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">OVO</span>
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">Dana</span>
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">BCA Virtual Account</span>
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">Mandiri Virtual Account</span>
              <span className="bg-white border border-neutral-border px-3 py-1.5 rounded-xl shadow-xs">BRI Virtual Account</span>
            </div>

            {/* Midtrans Footnote */}
            <p className="text-[10px] font-semibold text-gray-400 mt-2 leading-relaxed max-w-md">
              Diproses secara aman oleh Midtrans. NgajiKidz tidak menyimpan data kartu atau rekening Anda.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="py-20 px-4 bg-islamic-pattern">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
              PERTANYAAN UMUM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-3">
              Ada Pertanyaan? Kami Punya Jawabannya
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border-3 border-neutral-border rounded-3xl p-5 shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-extrabold text-base sm:text-lg text-gray-800"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform duration-300 text-gray-400 ${
                      activeFaq === idx ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm sm:text-base font-semibold text-gray-500 mt-3 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA CONVERSION FOOTER */}
      <section className="bg-gradient-to-t from-primary-light/30 to-transparent border-t-3 border-neutral-border py-20 px-4 sm:px-6 text-center relative overflow-hidden bg-islamic-pattern">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <FadeIn>
            <div className="bg-primary p-3 rounded-3xl border-2 border-primary-dark inline-block shadow-sm mb-6">
              <Sparkles className="text-white w-6 h-6 animate-spin-slow" />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.15}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Siap Menjadikan Mengaji Aktivitas Favorit si Kecil?
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-base sm:text-lg text-gray-500 mt-4 max-w-lg font-medium">
              Bergabunglah sekarang dengan ribuan keluarga muslim lainnya. Mulai evaluasi kecakapan makhraj anak gratis!
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 px-10 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                Coba Gratis Sekarang
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
