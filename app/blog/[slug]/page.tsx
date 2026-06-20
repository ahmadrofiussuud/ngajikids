"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Calendar, User, Clock, Heart, Share2, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";
import { mockArticles } from "../page";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<typeof mockArticles[0] | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const found = mockArticles.find((a) => a.slug === slug);
    if (found) {
      setArticle(found);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-neutral-warm flex items-center justify-center p-6 text-center font-nunito">
        <div className="bg-white border-3 border-neutral-border rounded-[32px] p-8 max-w-sm w-full shadow-md">
          <span className="text-3xl block mb-2">📄</span>
          <h3 className="font-extrabold text-lg text-gray-800">Artikel Tidak Ditemukan</h3>
          <p className="text-xs font-semibold text-gray-400 mt-2">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link
            href="/blog"
            className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3 px-6 rounded-xl border-b-2 border-primary-dark active:border-b-0 active:translate-y-[1px] transition-all"
          >
            Kembali ke Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-warm pb-20 font-nunito text-gray-800 text-left selection:bg-primary-light selection:text-primary-dark">
      
      {/* HEADER BREADCRUMB */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-extrabold text-sm transition-all"
        >
          <ChevronLeft size={18} className="stroke-[3]" />
          Kembali ke Blog
        </Link>
      </div>

      {/* ARTICLE BODY CONTAINER */}
      <main className="max-w-3xl mx-auto px-4 mt-6">
        <article className="bg-white border-3 border-neutral-border rounded-[36px] p-6 sm:p-10 shadow-sm overflow-hidden flex flex-col gap-6">
          
          {/* CATEGORY & METADATA */}
          <div className="flex flex-col gap-3">
            <span className="self-start text-[9px] font-black uppercase tracking-wider bg-primary-light text-primary-dark border border-primary/20 px-2.5 py-0.5 rounded-md">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 mt-2 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5">
                <User size={13} />
                Penulis: {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 text-primary">
                <Clock size={13} />
                {article.readTime}
              </span>
            </div>
          </div>

          <div className="h-56 sm:h-72 bg-gradient-to-br from-emerald-50 to-teal-50 border border-gray-150 rounded-3xl overflow-hidden flex items-center justify-center select-none">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* CONTENT CONTENT (DUMMY RICH CONTENT) */}
          {/* TODO: integrasikan dengan CMS */}
          <div className="text-sm sm:text-base font-semibold text-gray-650 leading-relaxed flex flex-col gap-6">
            <p className="text-base font-bold text-gray-800 leading-relaxed">
              Belajar mengaji adalah salah satu pilar terpenting dalam pembentukan karakter anak muslim. Namun, tantangan terbesar bagi orang tua adalah bagaimana membuat proses belajar ini terasa menyenangkan dan tidak membebani dunia bermain anak-anak.
            </p>

            <h3 className="text-lg sm:text-xl font-black text-gray-800 mt-2">Mengapa Metode Bermain Sangat Efektif?</h3>
            <p>
              Berdasarkan riset psikologi perkembangan anak, stimulasi otak paling optimal terjadi saat anak berada dalam keadaan senang dan rileks. Di sinilah metode belajar sambil bermain (*play-based learning*) memegang peranan kunci:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2.5">
              <li>**Mengurangi kecemasan belajar**: Mengubah huruf-huruf asing menjadi objek visual yang akrab.</li>
              <li>**Meningkatkan retensi memori**: Permainan yang melibatkan aktivitas fisik atau visual membantu informasi tersimpan dalam jangka panjang.</li>
              <li>**Menumbuhkan motivasi internal**: Anak menyelesaikan tugas karena seru, bukan karena takut dimarahi.</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-black text-gray-800 mt-2">Langkah Mudah yang Bisa Dicoba di Rumah</h3>
            <p>
              Orang tua tidak perlu menyiapkan alat-alat mahal. Cukup gunakan bahan-bahan sederhana yang ada di rumah seperti kartu gambar, papan tulis kecil, atau aplikasi interaktif yang mendidik:
            </p>
            <ol className="list-decimal pl-5 flex flex-col gap-2.5">
              <li>**Tebak Suara &amp; Gerakan**: Kaitkan bunyi huruf dengan benda kesukaan anak.</li>
              <li>**Puzzle Hijaiyah Magnetik**: Pasang huruf magnetik di kulkas dan ajak anak menyusunnya menjadi nama panggilan mereka.</li>
              <li>**Gunakan Fitur Pelacak AI**: Melalui aplikasi seperti NgajiKidz, anak dapat berinteraksi langsung dengan naga pelacak suara untuk berlatih makhraj dengan asyik.</li>
            </ol>

            <p className="border-l-4 border-primary pl-4 py-1.5 bg-primary-light/10 rounded-r-xl italic text-xs sm:text-sm font-semibold text-gray-550 leading-relaxed">
              "Didiklah anak-anakmu dengan tiga perkara: cinta kepada nabi kalian, cinta kepada keluarganya, dan cinta kepada membaca Al-Qur'an." (HR. Ath-Thabarani).
            </p>

            <p>
              Dengan ketelatenan dan pendekatan yang tepat, mengaji tidak lagi menjadi rutinitas sore hari yang terpaksa, melainkan momen seru yang selalu dirindukan anak setiap harinya. Semangat membimbing si kecil ya, Ayah dan Bunda!
            </p>
          </div>

          {/* SOCIAL ACTIONS BAR */}
          <div className="border-t border-b border-gray-100 py-4 mt-6 flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart size={16} className={liked ? "fill-red-500" : ""} />
                <span>{liked ? "Disukai!" : "Suka"}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <MessageCircle size={16} />
                <span>Diskusi (0)</span>
              </button>
            </div>

            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer">
              <Share2 size={16} />
              <span>Bagikan</span>
            </button>
          </div>

          {/* NEWSLETTER / CTA BOX */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 shadow-md border-3 border-teal-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <div className="text-left">
              <h4 className="font-extrabold text-base flex items-center gap-1.5">
                <Sparkles size={16} className="fill-white text-emerald-500 stroke-none" />
                Mulai Belajar Mengaji Interaktif
              </h4>
              <p className="text-xs text-emerald-50 font-semibold mt-1">
                Ingin si kecil belajar melafalkan Hijaiyah dibimbing AI dan guru terverifikasi?
              </p>
            </div>
            <Link
              href="/login"
              className="bg-amber-400 hover:bg-amber-300 text-teal-950 font-black text-xs px-5 py-2.5 rounded-xl border-b-4 border-amber-600 hover:border-amber-500 active:scale-95 transition-all text-center inline-block shrink-0 shadow-sm"
            >
              Coba Gratis ✨
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}
