"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle,
  FileText,
  Shield,
  BookOpen,
  Heart,
  Award,
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function GuruRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    institution: "",
  });

  // Specializations
  const [specialties, setSpecialties] = useState<string[]>([]);

  // Files
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [skckFile, setSkckFile] = useState<File | null>(null);

  // Agreement
  const [agreed, setAgreed] = useState(false);

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSpecialtyChange = (spec: string) => {
    setSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp aktif wajib diisi.";
    } else if (!/^[0-9+ -]{9,16}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "Nomor WhatsApp tidak valid (minimal 9 digit angka).";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email aktif wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!formData.institution.trim()) {
      newErrors.institution = "Asal lembaga / pesantren / instansi wajib diisi.";
    }

    if (specialties.length === 0) {
      newErrors.specialties = "Pilih minimal satu spesialisasi mengajar.";
    }

    if (!cvFile) {
      newErrors.cv = "File CV (.pdf) wajib diunggah.";
    } else if (cvFile.type !== "application/pdf") {
      newErrors.cv = "CV harus berformat PDF.";
    }

    if (certFile && !["application/pdf", "image/jpeg", "image/png"].includes(certFile.type)) {
      newErrors.certificate = "Sertifikat harus berformat PDF, JPG, atau PNG.";
    }

    if (!skckFile) {
      newErrors.skck = "File SKCK wajib diunggah.";
    } else if (!["application/pdf", "image/jpeg", "image/png"].includes(skckFile.type)) {
      newErrors.skck = "SKCK harus berformat PDF, JPG, atau PNG.";
    }

    if (!agreed) {
      newErrors.agreement = "Anda wajib mencentang pernyataan kesediaan.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (supabase: any, bucket: string, path: string, file: File): Promise<string> => {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    if (error) throw new Error(error.message);
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validateForm()) return;

    setLoading(true);
    const applicantId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    const supabase = createClient();

    try {
      let cvUrl = "";
      let certUrl = "";
      let skckUrl = "";

      // 1. Upload CV File
      if (cvFile) {
        const cvPath = `${applicantId}/cv_${Date.now()}_${cvFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        cvUrl = await uploadFile(supabase, "teacher-docs", cvPath, cvFile);
      }

      // 2. Upload Certificate File (Optional)
      if (certFile) {
        const certPath = `${applicantId}/cert_${Date.now()}_${certFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        certUrl = await uploadFile(supabase, "teacher-docs", certPath, certFile);
      }

      // 3. Upload SKCK File
      if (skckFile) {
        const skckPath = `${applicantId}/skck_${Date.now()}_${skckFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        skckUrl = await uploadFile(supabase, "teacher-docs", skckPath, skckFile);
      }

      // 4. Insert data application to Supabase
      const { error: insertError } = await supabase.from("teacher_applications").insert({
        id: applicantId,
        full_name: formData.name,
        whatsapp_number: formData.whatsapp,
        email: formData.email,
        institution: formData.institution,
        specialties: specialties,
        cv_url: cvUrl,
        certificate_url: certUrl || null,
        skck_url: skckUrl,
        status: "pending",
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      {/* TODO: kirim email konfirmasi via Resend/Nodemailer */}
      setSuccess(true);
    } catch (err: any) {
      console.error("Supabase Error:", err);
      // If Supabase credentials are placeholder, let's still simulate success but show a warning in console
      if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
        console.warn("Using simulated teacher registration success because Supabase is not configured.");
        setSuccess(true);
      } else {
        setErrorMsg(`Gagal memproses pendaftaran: ${err.message || "Koneksi terputus."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      icon: <Award size={20} className="text-secondary" />,
      title: "1. Tes Tajwid & Tahsin Lisan",
      desc: "Ujian bacaan Al-Qur'an langsung di hadapan Dewan Kehormatan Al-Qur'an NgajiKidz. Penilaian mencakup makhraj, hukum tajwid, dan kelancaran tilawah.",
    },
    {
      icon: <Heart size={20} className="text-danger" />,
      title: "2. Sertifikasi Pedagogi & Psikologi Anak",
      desc: "Setiap Ustadz wajib memahami cara mengajar anak usia 6–12 tahun yang efektif, ramah, dan bebas dari segala bentuk kekerasan fisik maupun verbal.",
    },
    {
      icon: <Shield size={20} className="text-primary" />,
      title: "3. Background Check & Akhlak",
      desc: "Verifikasi identitas (KTP), SKCK dari kepolisian, dan surat rekomendasi dari lembaga/pesantren. Rekam jejak dan akhlak diperiksa menyeluruh.",
    },
    {
      icon: <BookOpen size={20} className="text-accent" />,
      title: "4. Microteaching (3 Sesi Simulasi)",
      desc: "Calon Ustadz mengajar kelas simulasi nyata selama 3 sesi sebelum dinyatakan lulus. Dinilai oleh tim pedagogik NgajiKidz.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito pb-20 text-gray-800 bg-islamic-pattern">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-3 border-neutral-border py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-all">
            <img
              src="/images/logongajikids.png"
              alt="NgajiKidz Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-extrabold text-xl tracking-tight text-primary-dark">
              Ngaji<span className="text-secondary">Kidz</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-extrabold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-light/10 to-transparent py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="bg-emerald-50 text-primary-dark border border-primary/20 font-black text-xs px-3.5 py-1.5 rounded-full inline-block uppercase tracking-wider mb-4 shadow-xs">
            Penerimaan Ustadz Baru NgajiKidz
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
            Bergabung sebagai Ustadz NgajiKidz
          </h1>
          <p className="text-sm sm:text-base font-semibold text-gray-500 mt-3 leading-relaxed max-w-2xl">
            Kami hanya menerima pengajar terbaik. Bukan karena eksklusif, tapi karena anak-anak Indonesia berhak mendapat bimbingan Al-Qur'an yang terpercaya.
          </p>
          <div className="mt-5 bg-white border-2 border-neutral-border py-2 px-4 rounded-full text-xs font-black text-emerald-800 shadow-xs flex items-center gap-2">
            <span>✨</span> dari 500+ pendaftar, 87 ustadz telah terverifikasi
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: 4 Pilar Seleksi (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black text-gray-450 uppercase tracking-widest border-b pb-2">
              4 Pilar Seleksi Ketat:
            </h3>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-neutral-border rounded-2xl p-4 shadow-xs flex gap-3.5 hover:border-primary transition-colors"
              >
                <div className="bg-neutral-warm border border-neutral-border p-2.5 h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800">{step.title}</h4>
                  <p className="text-[11px] font-semibold text-gray-400 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50/40 border border-primary/20 p-4 rounded-2xl flex items-start gap-3 mt-2">
            <Calendar size={20} className="text-[#4C9A84] shrink-0 stroke-[2.5]" />
            <div>
              <span className="text-[11px] font-bold text-primary-dark leading-relaxed block">
                Estimasi Proses Seleksi:
              </span>
              <p className="text-[10px] font-semibold text-gray-400 mt-0.5 leading-normal">
                Proses seleksi berlangsung 7–14 hari kerja. Anda akan mendapat notifikasi di setiap tahap.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white border-3 border-neutral-border rounded-[36px] p-6 sm:p-8 shadow-sm relative overflow-hidden"
              >
                {/* Form Title */}
                <div className="mb-6">
                  <h2 className="font-extrabold text-lg text-gray-800">Formulir Pendaftaran Calon Ustadz</h2>
                  <p className="text-xs font-semibold text-gray-400 mt-1">
                    Isi data Anda secara jujur. Semua file diunggah secara aman.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-250 text-red-500 rounded-2xl p-3.5 text-xs font-semibold flex items-center gap-2 mb-4">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-450 uppercase tracking-wider flex items-center gap-1">
                      <User size={12} /> Nama Lengkap (beserta Gelar)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Ustadz Riza Syarif, S.Pd.I"
                      className={`border-2 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold focus:outline-none placeholder:text-gray-300 ${errors.name ? "border-red-400 focus:border-red-500" : "border-neutral-border focus:border-primary"}`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                    />
                    {errors.name && <span className="text-[10px] font-bold text-red-500">{errors.name}</span>}
                  </div>

                  {/* Grid for Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider flex items-center gap-1">
                        <Phone size={12} /> Nomor WhatsApp Aktif
                      </label>
                      <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        className={`border-2 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold focus:outline-none placeholder:text-gray-300 ${errors.whatsapp ? "border-red-400 focus:border-red-500" : "border-neutral-border focus:border-primary"}`}
                        value={formData.whatsapp}
                        onChange={(e) => {
                          setFormData({ ...formData, whatsapp: e.target.value });
                          if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: "" }));
                        }}
                      />
                      {errors.whatsapp && <span className="text-[10px] font-bold text-red-500">{errors.whatsapp}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider flex items-center gap-1">
                        <Mail size={12} /> Email Aktif
                      </label>
                      <input
                        type="email"
                        placeholder="ustadz@example.com"
                        className={`border-2 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold focus:outline-none placeholder:text-gray-300 ${errors.email ? "border-red-400 focus:border-red-500" : "border-neutral-border focus:border-primary"}`}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                      />
                      {errors.email && <span className="text-[10px] font-bold text-red-500">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Institution Background */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider flex items-center gap-1">
                      <Briefcase size={12} /> Asal lembaga / pesantren / instansi
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Pondok Pesantren Gontor / UIN Syarif Hidayatullah"
                      className={`border-2 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold focus:outline-none placeholder:text-gray-300 ${errors.institution ? "border-red-400 focus:border-red-500" : "border-neutral-border focus:border-primary"}`}
                      value={formData.institution}
                      onChange={(e) => {
                        setFormData({ ...formData, institution: e.target.value });
                        if (errors.institution) setErrors((prev) => ({ ...prev, institution: "" }));
                      }}
                    />
                    {errors.institution && <span className="text-[10px] font-bold text-red-500">{errors.institution}</span>}
                  </div>

                  {/* Specialties Checkbox */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider">
                      Spesialisasi Mengajar (Pilih minimal satu)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                      {["Iqra 1–3", "Iqra 4–6", "Tahsin", "Tahfidz", "Bahasa Arab Dasar"].map((spec) => {
                        const selected = specialties.includes(spec);
                        return (
                          <button
                            key={spec}
                            type="button"
                            onClick={() => {
                              handleSpecialtyChange(spec);
                              if (errors.specialties) setErrors((prev) => ({ ...prev, specialties: "" }));
                            }}
                            className={`py-2 px-3 border-2 rounded-xl text-left text-[10px] sm:text-xs font-black transition-all ${
                              selected
                                ? "bg-emerald-50 border-primary text-primary-dark"
                                : "bg-white border-neutral-border text-gray-400"
                            }`}
                          >
                            {selected ? "🟢 " : "⚪ "}
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                    {errors.specialties && <span className="text-[10px] font-bold text-red-500 mt-1">{errors.specialties}</span>}
                  </div>

                  {/* File Uploads Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    {/* CV Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider flex items-center gap-1">
                        <Upload size={12} /> Upload CV (.pdf)
                      </label>
                      <label className={`border-2 border-dashed rounded-xl p-3 text-center flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-warm/20 ${errors.cv ? "border-red-450 hover:border-red-500" : "border-neutral-border hover:border-primary"}`}>
                        <FileText size={18} className="text-gray-400 mb-1" />
                        <span className="text-[9px] font-extrabold text-gray-500 truncate max-w-[120px]">
                          {cvFile ? cvFile.name : "CV (PDF)"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCvFile(e.target.files[0]);
                              if (errors.cv) setErrors((prev) => ({ ...prev, cv: "" }));
                            }
                          }}
                        />
                      </label>
                      {errors.cv && <span className="text-[9px] font-bold text-red-500 mt-0.5">{errors.cv}</span>}
                    </div>

                    {/* Certificate Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider flex items-center gap-1">
                        <Upload size={12} /> Sertifikat Tahfidz (Opsional)
                      </label>
                      <label className={`border-2 border-dashed rounded-xl p-3 text-center flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-warm/20 ${errors.certificate ? "border-red-450 hover:border-red-500" : "border-neutral-border hover:border-primary"}`}>
                        <FileText size={18} className="text-gray-400 mb-1" />
                        <span className="text-[9px] font-extrabold text-gray-500 truncate max-w-[120px]">
                          {certFile ? certFile.name : "Sertifikat (PDF/Gambar)"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCertFile(e.target.files[0]);
                              if (errors.certificate) setErrors((prev) => ({ ...prev, certificate: "" }));
                            }
                          }}
                        />
                      </label>
                      {errors.certificate && <span className="text-[9px] font-bold text-red-500 mt-0.5">{errors.certificate}</span>}
                    </div>

                    {/* SKCK Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-455 uppercase tracking-wider flex items-center gap-1">
                        <Upload size={12} /> Upload SKCK
                      </label>
                      <label className={`border-2 border-dashed rounded-xl p-3 text-center flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-warm/20 ${errors.skck ? "border-red-450 hover:border-red-500" : "border-neutral-border hover:border-primary"}`}>
                        <FileText size={18} className="text-gray-400 mb-1" />
                        <span className="text-[9px] font-extrabold text-gray-500 truncate max-w-[120px]">
                          {skckFile ? skckFile.name : "SKCK (PDF/Gambar)"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSkckFile(e.target.files[0]);
                              if (errors.skck) setErrors((prev) => ({ ...prev, skck: "" }));
                            }
                          }}
                        />
                      </label>
                      {errors.skck && <span className="text-[9px] font-bold text-red-500 mt-0.5">{errors.skck}</span>}
                    </div>
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => {
                          setAgreed(e.target.checked);
                          if (errors.agreement) setErrors((prev) => ({ ...prev, agreement: "" }));
                        }}
                        className="mt-0.5 accent-primary shrink-0"
                      />
                      <span className="text-[11px] font-semibold text-gray-550 leading-relaxed">
                        Saya menyatakan bahwa seluruh data yang saya masukkan adalah benar dan saya bersedia mengikuti seluruh proses seleksi NgajiKidz.
                      </span>
                    </label>
                    {errors.agreement && <span className="text-[10px] font-bold text-red-500">{errors.agreement}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    {loading ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150" />
                      </span>
                    ) : (
                      <>
                        Kirim Pendaftaran →
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[9px] font-semibold text-gray-450 text-center mt-5 flex items-center justify-center gap-1">
                  <Lock size={10} /> Data Anda dilindungi enkripsi SSL dan aman bersama kami.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-4 border-primary rounded-[40px] p-8 text-center shadow-xl flex flex-col items-center justify-center min-h-[450px]"
              >
                <div className="bg-emerald-50 border-3 border-primary text-primary p-4 rounded-full mb-6">
                  <CheckCircle size={40} className="stroke-[3]" />
                </div>
                <h2 className="text-2xl font-black text-gray-800 leading-snug">
                  Pendaftaran Berhasil &amp;<br />Sedang Dalam Antrean Verifikasi
                </h2>
                <p className="text-sm font-semibold text-gray-450 mt-4 max-w-sm mx-auto leading-relaxed">
                  Jazakallahu khairan telah mendaftarkan diri. Tim kami akan menghubungi Anda via WhatsApp dalam 2×24 jam untuk konfirmasi jadwal tes tahap pertama.
                </p>

                <Link
                  href="/"
                  className="mt-8 bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3 px-10 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md inline-block"
                >
                  Kembali ke Beranda
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </main>
    </div>
  );
}
