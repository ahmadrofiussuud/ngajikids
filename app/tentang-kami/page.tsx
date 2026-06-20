"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Compass,
  Award,
  ShieldCheck,
  Scale,
  Users,
  Code,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function TentangKamiPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary-dark" />,
      title: "Materi Ditinjau Ustadz",
      desc: "Semua kurikulum belajar Iqra, tajwid, dan kisah nabi divalidasi langsung oleh dewan penasihat syariah ustadz terkemuka.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-secondary-dark" />,
      title: "Guru Terseleksi Ketat",
      desc: "Ustadz dan ustazah kami merupakan lulusan universitas Islam & pesantren terkemuka yang terlatih secara psikologi pengajaran anak.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent-dark" />,
      title: "AI Sebagai Pendukung",
      desc: "Teknologi AI Makhraj Tracker dirancang sebagai alat bantu latihan harian anak, bukan menggantikan peran krusial ustadz/ustazah.",
    },
    {
      icon: <Scale className="w-6 h-6 text-primary-dark" />,
      title: "Gamifikasi Bebas Maysir",
      desc: "Sistem reward koin dan lencana didesain murni sebagai motivasi belajar harian tanpa unsur spekulasi/judi (maysir).",
    },
    {
      icon: <Award className="w-6 h-6 text-secondary-dark" />,
      title: "Akad Sewa Jasa (Ijarah)",
      desc: "Biaya langganan menggunakan akad ijarah yang jelas dan transparan untuk penyediaan jasa pengajaran serta pemeliharaan sistem.",
    },
  ];

  const team = {
    management: [
      { name: "Muhammad Rofi'us Su'ud", role: "Chief Executive Officer & Founder", avatar: "/images/team/ceo.png" },
      { name: "Ahmad Mujadid", role: "Chief Operating Officer", avatar: "/images/team/coo.png" },
    ],
    syariah: [
      { name: "Ustadz KH. Abdul Wahab, Lc.", role: "Ketua Dewan Penasihat Syariah", avatar: "/images/team/syariah_wahab.png" },
      { name: "Ustadzah Fatimah Azzahra, M.Ag.", role: "Anggota Dewan Syariah & Kurikulum", avatar: "/images/team/syariah_fatimah.png" },
    ],
    tech: [
      { name: "Fatih Al-Faruq", role: "Lead Software Architect", avatar: "/images/team/lead_dev.png" },
      { name: "Aisyah Humaira", role: "Senior UX/UI Designer", avatar: "/images/team/designer.png" },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-warm pb-20 font-nunito text-gray-800 text-left selection:bg-primary-light selection:text-primary-dark">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-primary-light/25 to-transparent pt-16 pb-12 px-4 sm:px-6 bg-islamic-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn duration={0.6}>
            <span className="bg-primary-light text-primary-dark border border-primary/20 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-4 shadow-sm">
              ✨ Mengenal NgajiKidz
            </span>
          </FadeIn>
          <FadeIn delay={0.15} duration={0.6}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 tracking-tight leading-tight">
              Membentuk Generasi Cinta Al-Qur'an dengan{" "}
              <span className="text-primary relative inline-block">
                Cara Seru!
                <span className="absolute bottom-2 left-0 w-full h-3 bg-secondary/35 -z-10 rounded-full" />
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} duration={0.6}>
            <p className="text-base sm:text-lg text-gray-500 mt-6 max-w-2xl mx-auto font-semibold leading-relaxed">
              NgajiKidz lahir dari mimpi untuk menghadirkan platform belajar mengaji yang menggabungkan 
              kedisiplinan ilmu tajwid tradisional dengan kegembiraan teknologi modern dan psikologi anak.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-white border-3 border-neutral-border rounded-[32px] p-8 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-150">
          <div className="pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-primary">10,000+</p>
            <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 uppercase">Santri Cilik Aktif</p>
          </div>
          <div className="pt-6 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-secondary">50+</p>
            <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 uppercase">Ustadz &amp; Ustazah Pilihan</p>
          </div>
          <div className="pt-6 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-accent">98.4%</p>
            <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 uppercase">Tingkat Kepuasan Orang Tua</p>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-8 shadow-sm hover:border-primary transition-all flex flex-col gap-4 relative overflow-hidden">
            <div className="bg-primary-light/50 border border-primary/20 p-3.5 rounded-2xl text-primary-dark self-start">
              <Target size={26} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-gray-800">Visi Kami</h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              Menjadi platform edukasi Al-Qur'an digital anak-anak terbesar dan terpercaya di Asia Tenggara yang dirindukan anak-anak setiap hari, membentuk dasar karakter islami yang kuat sejak dini.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white border-3 border-neutral-border rounded-[32px] p-8 shadow-sm hover:border-secondary transition-all flex flex-col gap-4 relative overflow-hidden">
            <div className="bg-amber-50 border border-secondary/20 p-3.5 rounded-2xl text-secondary-dark self-start">
              <Compass size={26} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-gray-800">Misi Kami</h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              Menghadirkan kurikulum tajwid terstandar dengan metode gamifikasi yang interaktif, menyeleksi guru ngaji berkompetensi psikologi anak, serta menerapkan teknologi AI sebagai asisten latihan interaktif.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SHARIA VALUES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-extrabold text-secondary-dark bg-secondary-light/60 border border-secondary/20 px-4 py-1.5 rounded-full inline-block">
            KEPATUHAN SYARIAH &amp; NILAI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mt-3">
            Prinsip &amp; Aspek Syariah dalam Sistem Belajar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
              <div className="p-3 bg-gray-50 border border-gray-150 rounded-2xl self-start">
                {v.icon}
              </div>
              <h3 className="font-extrabold text-base text-gray-800">{v.title}</h3>
              <p className="text-xs font-semibold text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM STRUCTURE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-extrabold text-primary-dark bg-primary-light/50 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
            STRUKTUR TIM KAMI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mt-3">
            Keluarga di Balik Layar NgajiKidz
          </h2>
        </div>

        {/* Tim Manajemen */}
        <div className="mb-12">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-6 pl-2 border-l-4 border-primary">
            Tim Manajemen / Founder
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.management.map((t, idx) => (
              <div key={idx} className="bg-white border-3 border-neutral-border rounded-[28px] p-5 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-50 border-2 border-primary/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner select-none flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-800">{t.name}</h4>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dewan Penasihat Syariah */}
        <div className="mb-12">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-6 pl-2 border-l-4 border-secondary">
            Dewan Penasihat Syariah
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.syariah.map((t, idx) => (
              <div key={idx} className="bg-white border-3 border-neutral-border rounded-[28px] p-5 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-50 border-2 border-secondary/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner select-none flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-800">{t.name}</h4>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tim Produk & Teknologi */}
        <div>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-6 pl-2 border-l-4 border-accent">
            Tim Produk &amp; Teknologi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.tech.map((t, idx) => (
              <div key={idx} className="bg-white border-3 border-neutral-border rounded-[28px] p-5 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-50 border-2 border-accent/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner select-none flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-800">{t.name}</h4>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
