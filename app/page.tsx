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
} from "lucide-react";
import KidReadingQuran from "@/components/animations/KidReadingQuran";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

export default function LandingPage() {
  // States for interactive components
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
      a: "Dalam prinsip muamalah syariah, kami menggunakan Akad Ijarah (sewa-jasa). Anda membayarkan biaya sebagai kompensasi atas penyediaan jasa pengajaran, pemeliharaan sistem aplikasi, dan penyediaan guru ngaji terverifikasi secara syar'i.",
    },
    {
      q: "Apakah anak saya bisa belajar langsung dengan guru ngaji secara tatap muka virtual?",
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
      text: "Metode gamifikasi Islami yang dipadukan dengan bimbingan guru ngaji di platform ini sangat terstruktur. Anak saya belajar tajwid tanpa merasa sedang dipaksa belajar.",
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

      {/* 4. FEATURES */}
      <section id="fitur" className="py-20 px-4 sm:px-6 bg-white border-y-3 border-neutral-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-secondary-dark bg-secondary-light/60 border border-secondary/20 px-4 py-1.5 rounded-full inline-block">
              FITUR UNGGULAN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mt-3">
              Fitur yang Membuat Belajar Ngaji Lebih Menyenangkan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <FadeIn delay={0.1} direction="up">
              <div className="bg-neutral-warm/30 border-3 border-neutral-border rounded-3xl p-6 hover:border-primary transition-all duration-300 flex items-start gap-4">
                <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl text-primary-dark">
                  <Brain size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-800">AI Learning Path</h3>
                  <p className="text-sm font-semibold text-gray-500 mt-1 leading-relaxed">
                    Menganalisis intonasi dan tajwid anak secara real-time. Memberikan latihan koreksi pelafalan secara langsung tanpa membuat anak berkecil hati.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={0.2} direction="up">
              <div className="bg-neutral-warm/30 border-3 border-neutral-border rounded-3xl p-6 hover:border-primary transition-all duration-300 flex items-start gap-4">
                <div className="bg-amber-50 border border-secondary/20 p-3 rounded-2xl text-secondary-dark">
                  <Shield size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-800">Guru Terverifikasi</h3>
                  <p className="text-sm font-semibold text-gray-500 mt-1 leading-relaxed">
                    Pengajar adalah alumni pesantren terkemuka yang telah melalui seleksi ketat dan pelatihan kurikulum edukasi psikologi anak dasar.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Feature 3 */}
            <FadeIn delay={0.3} direction="up">
              <div className="bg-neutral-warm/30 border-3 border-neutral-border rounded-3xl p-6 hover:border-primary transition-all duration-300 flex items-start gap-4">
                <div className="bg-purple-50 border border-accent/20 p-3 rounded-2xl text-accent-dark">
                  <Gamepad2 size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-800">Gamifikasi Islami</h3>
                  <p className="text-sm font-semibold text-gray-500 mt-1 leading-relaxed">
                    Sistem naik level, koin yang bisa ditukar dengan kustomisasi avatar, lencana penghargaan hafalan surah, dan papan peringkat harian yang ramah anak.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Feature 4 */}
            <FadeIn delay={0.4} direction="up">
              <div className="bg-neutral-warm/30 border-3 border-neutral-border rounded-3xl p-6 hover:border-primary transition-all duration-300 flex items-start gap-4">
                <div className="bg-emerald-50 border border-primary/20 p-3 rounded-2xl text-primary-dark">
                  <TrendingUp size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-800">Progress Report Orang Tua</h3>
                  <p className="text-sm font-semibold text-gray-500 mt-1 leading-relaxed">
                    Akses dashboard khusus orang tua untuk melihat grafik akurasi tajwid anak, laporan pertemuan guru, dan notifikasi kelulusan modul anak.
                  </p>
                </div>
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
              PILIHAN PAKET LANGGANAN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mt-3">
              Investasi Terbaik untuk Masa Depan Akhirat Anak
            </h2>
            
            {/* Syar'i Akad Framing Alert Box */}
            <div className="bg-amber-50 border border-secondary/25 p-3 rounded-2xl mt-4 flex items-center justify-center gap-2 max-w-lg mx-auto">
              <Award size={16} className="text-secondary" />
              <span className="text-xs font-bold text-secondary-dark leading-tight">
                Menggunakan Akad Ijarah (Sewa Jasa Pengajaran) yang Syar'i dan Transparan.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            {/* Tier 1: Gratis */}
            <div className="bg-white border-3 border-neutral-border rounded-3xl p-8 flex flex-col justify-between shadow-sm relative">
              <div>
                <span className="text-xs font-extrabold uppercase bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                  Basic (Gratis)
                </span>
                <div className="mt-4 flex items-baseline text-gray-800 font-extrabold">
                  <span className="text-2xl">Rp</span>
                  <span className="text-5xl">0</span>
                  <span className="text-gray-400 font-bold ml-2">/ selamanya</span>
                </div>
                <p className="text-sm font-semibold text-gray-400 mt-2">
                  Cocok untuk mencoba metode gamifikasi dan evaluasi awal AI.
                </p>

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h4 className="font-extrabold text-sm text-gray-800 uppercase tracking-wider mb-4">
                    Fitur yang didapatkan:
                  </h4>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      Akses modul Iqra 1 &amp; 2
                    </li>
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      Deteksi Makhorijul Huruf AI (10x / hari)
                    </li>
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      Buat 1 Kustomisasi Avatar
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-center block py-3 rounded-2xl border-2 border-neutral-border shadow-sm transition-all"
                >
                  Mulai Gratis
                </Link>
              </div>
            </div>

            {/* Tier 2: Premium */}
            <div className="bg-white border-3 border-primary rounded-3xl p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-primary text-white font-black text-[10px] uppercase tracking-wider py-1.5 px-5 rounded-bl-2xl">
                Paling Diminati ⭐
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase bg-primary-light text-primary-dark px-3 py-1 rounded-full">
                  Premium
                </span>
                <div className="mt-4 flex items-baseline text-gray-800 font-extrabold">
                  <span className="text-2xl">Rp</span>
                  <span className="text-5xl">149K</span>
                  <span className="text-gray-400 font-bold ml-2">/ bulan</span>
                </div>
                <p className="text-sm font-semibold text-gray-400 mt-2">
                  Komitmen penuh bimbingan tatap muka guru ngaji dan analitik tajwid tanpa batas.
                </p>

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h4 className="font-extrabold text-sm text-gray-800 uppercase tracking-wider mb-4">
                    Semua Fitur Basic + Tambahan:
                  </h4>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      Analisis AI tanpa batas (Seluruh Surah)
                    </li>
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      4x Sesi Kelas Guru Privat (virtual) / bln
                    </li>
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      Dashboard evaluasi tajwid AI orang tua
                    </li>
                    <li className="flex items-center gap-2.5 text-sm font-bold text-gray-600">
                      <Check size={16} className="text-primary stroke-[3]" />
                      Bebas Iklan &amp; Akses Lencana Spesial
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-center block py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md"
                >
                  Langganan Premium
                </Link>
              </div>
            </div>
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
