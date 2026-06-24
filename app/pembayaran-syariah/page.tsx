"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle,
  QrCode,
  Wallet,
  ShieldCheck,
  Info,
  CreditCard,
  Check,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function PembayaranSyariahPage() {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">("premium");
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "gopay" | "ovo" | "shopeepay">("qris");
  const [paymentStep, setPaymentStep] = useState<"select" | "pay" | "success">("select");
  const [countdown, setCountdown] = useState(300); // 5 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentStep === "pay") {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPayment = () => {
    setCountdown(300);
    setPaymentStep("pay");
  };

  const handleSimulateSuccess = () => {
    setPaymentStep("success");
  };

  const planPrice = selectedPlan === "premium" ? 149000 : 0;

  return (
    <div className="min-h-screen bg-neutral-warm font-nunito pb-20 text-gray-800 bg-islamic-pattern select-none">
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

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div className="text-center mb-10">
          <span className="bg-amber-50 text-secondary-dark border border-secondary/20 font-black text-xs px-3.5 py-1.5 rounded-full inline-block uppercase tracking-wider mb-3 shadow-xs">
            Pembayaran Syariah
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
            Sistem Pembayaran Syariah Terintegrasi
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Menghadirkan kenyamanan bertransaksi dengan QRIS, Gopay, OVO, &amp; ShopeePay berlandaskan Akad Ijarah (Sewa Jasa Pengajaran) yang transparan &amp; halal.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Plan & Method */}
          {paymentStep === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Select plan details (7 cols) */}
              <div className="md:col-span-7 bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-xs flex flex-col gap-6">
                <div>
                  <h3 className="font-extrabold text-base text-gray-850">1. Pilih Paket Langganan</h3>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <button
                      onClick={() => setSelectedPlan("basic")}
                      className={`p-4 border-2 rounded-2xl text-left transition-all ${
                        selectedPlan === "basic"
                          ? "bg-emerald-50/20 border-primary text-primary-dark"
                          : "border-neutral-border text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      <h4 className="font-black text-sm">Paket Basic</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">Akses Iqra 1-2 &amp; AI Dasar</p>
                      <p className="text-sm font-black text-gray-800 mt-3">Rp 0</p>
                    </button>
                    <button
                      onClick={() => setSelectedPlan("premium")}
                      className={`p-4 border-2 rounded-2xl text-left transition-all relative ${
                        selectedPlan === "premium"
                          ? "bg-emerald-50/20 border-primary text-primary-dark"
                          : "border-neutral-border text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      <span className="absolute -top-2.5 right-3 bg-secondary text-white font-black text-[8px] px-2 py-0.5 rounded-full border border-secondary-dark uppercase tracking-wider">
                        Populer
                      </span>
                      <h4 className="font-black text-sm">Paket Premium</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">Full AI &amp; Sesi Ustadz Privat</p>
                      <p className="text-sm font-black text-gray-800 mt-3">Rp 149.000 <span className="text-[9px] font-bold text-gray-450">/ bln</span></p>
                    </button>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Select Payment Method */}
                <div>
                  <h3 className="font-extrabold text-base text-gray-850 flex items-center gap-1.5">
                    <Wallet size={16} className="text-primary" />
                    2. Pilih Metode Pembayaran
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {[
                      { id: "qris", name: "QRIS / Semua Bank", desc: "Scan instan barcode" },
                      { id: "gopay", name: "Gopay", desc: "Instant e-wallet" },
                      { id: "ovo", name: "OVO", desc: "Instant e-wallet" },
                      { id: "shopeepay", name: "ShopeePay", desc: "Instant e-wallet" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3.5 border-2 rounded-xl text-left transition-all flex items-center gap-3 ${
                          paymentMethod === method.id
                            ? "border-primary bg-emerald-50/10"
                            : "border-neutral-border hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${paymentMethod === method.id ? "bg-primary text-white" : "bg-neutral-warm border text-gray-400"}`}>
                          {method.id === "qris" ? <QrCode size={16} /> : <Wallet size={16} />}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-xs text-gray-800">{method.name}</h4>
                          <p className="text-[9px] font-bold text-gray-400 mt-0.5">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Checkout info & akad description (5 cols) */}
              <div className="md:col-span-5 bg-white border-3 border-neutral-border rounded-[32px] p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-gray-850 border-b pb-2">Detail Tagihan</h3>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>Harga Paket ({selectedPlan === "premium" ? "Premium" : "Basic"})</span>
                      <span>Rp {planPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>Biaya Layanan</span>
                      <span className="text-primary-dark">Rp 0 (Gratis)</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-sm font-black text-gray-800">
                      <span>Total Tagihan</span>
                      <span className="text-primary-dark text-lg">Rp {planPrice.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Akad ijarah box info */}
                  <div className="bg-amber-50/50 border border-secondary/20 rounded-2xl p-4 mt-6 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-secondary-dark font-black text-[10px] uppercase tracking-wider">
                      <Info size={12} />
                      Ketentuan Akad Ijarah
                    </div>
                    <p className="text-[10px] font-bold text-secondary-dark/85 leading-relaxed">
                      "Dengan menekan tombol bayar, Anda menyetujui Akad Ijarah (sewa-jasa), yaitu membayarkan sejumlah biaya di atas sebagai imbalan jasa penyediaan modul ajar, sistem pelacakan makhraj AI, dan Ustadz pembimbing yang amanah."
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={handleStartPayment}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck size={16} />
                    Bayar Sekarang (Akad Sah)
                  </button>
                  <p className="text-[9px] font-semibold text-gray-400 text-center flex items-center justify-center gap-1">
                    <Lock size={10} /> Enkripsi SSL 3D-Secure
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Gateway Interface */}
          {paymentStep === "pay" && (
            <motion.div
              key="pay"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-3 border-neutral-border rounded-[36px] p-8 max-w-md mx-auto shadow-sm text-center relative overflow-hidden"
            >
              {/* Header pay */}
              <div className="mb-6">
                <span className="bg-amber-50 text-secondary-dark border border-secondary/20 font-black text-[10px] px-3.5 py-1.5 rounded-full inline-block uppercase tracking-wider mb-2">
                  Menunggu Pembayaran
                </span>
                <h3 className="font-extrabold text-lg text-gray-800">Scan Barcode QRIS</h3>
                <p className="text-xs font-semibold text-gray-400 mt-1">Selesaikan pembayaran sebelum waktu habis</p>
                
                {/* Countdown display */}
                <div className="mt-3 text-lg font-black text-secondary-dark font-mono">
                  ⏳ {formatTime(countdown)}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-neutral-warm border-2 border-neutral-border p-4 rounded-3xl inline-block shadow-inner relative">
                <svg viewBox="0 0 160 160" className="w-44 h-44 text-gray-800">
                  {/* Mock QR Code Pattern */}
                  <rect x="0" y="0" width="40" height="40" fill="currentColor" />
                  <rect x="10" y="10" width="20" height="20" fill="white" />
                  <rect x="120" y="0" width="40" height="40" fill="currentColor" />
                  <rect x="130" y="10" width="20" height="20" fill="white" />
                  <rect x="0" y="120" width="40" height="40" fill="currentColor" />
                  <rect x="10" y="130" width="20" height="20" fill="white" />
                  {/* Random pixels */}
                  <rect x="60" y="20" width="10" height="30" fill="currentColor" />
                  <rect x="80" y="10" width="30" height="10" fill="currentColor" />
                  <rect x="50" y="60" width="20" height="20" fill="currentColor" />
                  <rect x="90" y="50" width="10" height="40" fill="currentColor" />
                  <rect x="20" y="70" width="20" height="10" fill="currentColor" />
                  <rect x="110" y="110" width="30" height="20" fill="currentColor" />
                  <rect x="60" y="110" width="20" height="30" fill="currentColor" />
                  <rect x="120" y="70" width="20" height="20" fill="currentColor" />
                  <rect x="80" y="130" width="10" height="20" fill="currentColor" />
                  {/* GPN logo center mockup */}
                  <rect x="65" y="65" width="30" height="30" fill="#10B981" rx="6" />
                  <circle cx="80" cy="80" r="6" fill="white" />
                </svg>
                <div className="absolute top-2 right-2 bg-primary text-white font-black text-[8px] py-0.5 px-2 rounded-full border">
                  QRIS GPN
                </div>
              </div>

              {/* Tagihan details */}
              <div className="border-t border-b border-gray-100 py-3.5 my-6 flex justify-between items-center text-xs font-bold text-gray-500">
                <span>Total Pembayaran:</span>
                <span className="text-sm font-black text-primary-dark">Rp {planPrice.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSimulateSuccess}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md"
                >
                  Simulasikan Pembayaran Sukses ✅
                </button>
                <button
                  onClick={() => setPaymentStep("select")}
                  className="w-full bg-white hover:bg-gray-50 text-gray-500 font-extrabold text-xs py-2.5 rounded-xl border border-gray-200 transition-colors"
                >
                  Ganti Metode Pembayaran
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success Screen */}
          {paymentStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-primary rounded-[40px] p-8 text-center max-w-md mx-auto shadow-xl flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="bg-emerald-50 border-3 border-primary text-primary p-4 rounded-full mb-6">
                <CheckCircle size={40} className="stroke-[3]" />
              </div>
              <h2 className="text-2xl font-black text-gray-800">Pembayaran Sukses! 🎉</h2>
              <p className="text-sm font-semibold text-gray-400 mt-2.5 max-w-xs mx-auto leading-relaxed">
                Alhamdulillah, akad transaksi ijarah Anda sah. Paket **Premium NgajiKidz** kini aktif untuk 30 hari ke depan.
              </p>

              <div className="bg-neutral-warm border border-neutral-border p-4 rounded-2xl text-left mt-6 w-full text-xs font-bold text-gray-550">
                <div className="flex justify-between py-1">
                  <span>No. Transaksi:</span>
                  <span className="text-gray-800 font-extrabold font-mono">NK-94829384</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Tanggal Akad:</span>
                  <span className="text-gray-800 font-extrabold">24 Juni 2026</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Status Paket:</span>
                  <span className="text-primary-dark font-black bg-emerald-50 border border-primary/20 px-2 py-0.5 rounded">AKTIF</span>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="mt-8 w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-base py-3.5 rounded-2xl border-b-4 border-primary-dark active:border-b-0 active:translate-y-1 transition-all shadow-md"
              >
                Mulai Berpetualang 🚀
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
