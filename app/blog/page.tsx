"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export const mockArticles: Article[] = [
  {
    slug: "mengenalkan-hijaiyah-metode-bermain",
    title: "Mengenalkan Huruf Hijaiyah dengan Metode Bermain",
    excerpt: "Belajar hijaiyah tidak harus kaku. Yuk coba 5 permainan seru di rumah yang bisa membantu si kecil menghafal huruf hijaiyah dengan ceria!",
    category: "Tips Parenting Islami",
    author: "Bunda Sarah",
    date: "19 Juni 2026",
    readTime: "4 mnt baca",
    imageUrl: "/images/blog/parenting.png",
  },
  {
    slug: "kisah-keteladanan-nabi-ismail",
    title: "Kisah Keteladanan Nabi Ismail & Kepatuhannya",
    excerpt: "Bagaimana ketaatan Nabi Ismail Alaihissalam kepada ayahnya Nabi Ibrahim dapat menginspirasi akhlak dan adab berbakti anak di zaman modern.",
    category: "Kisah Nabi",
    author: "Ustadz Riza",
    date: "15 Juni 2026",
    readTime: "6 mnt baca",
    imageUrl: "/images/blog/story.png",
  },
  {
    slug: "mengajarkan-adab-makan-sunnah",
    title: "Tips Mengajarkan Adab Makan Sesuai Sunnah",
    excerpt: "Membiasakan anak makan menggunakan tangan kanan, membaca basmalah, dan tidak mencela makanan dengan cara-cara yang asyik bagi anak.",
    category: "Adab & Akhlak",
    author: "Ustazah Aisyah",
    date: "10 Juni 2026",
    readTime: "5 mnt baca",
    imageUrl: "/images/blog/adab.png",
  },
  {
    slug: "panduan-tajwid-nun-sukun-tanwin",
    title: "Panduan Tajwid Cilik: Hukum Nun Sukun & Tanwin",
    excerpt: "Penjelasan sederhana mengenai Izhar, Idgham, Iqlab, dan Ikhfa yang dilengkapi dengan contoh suara dan trik visual mudah diingat anak.",
    category: "Tajwid",
    author: "Ustadz Khalid",
    date: "05 Juni 2026",
    readTime: "8 mnt baca",
    imageUrl: "/images/blog/tajwid.png",
  },
  {
    slug: "kebiasaan-mengaji-tanpa-paksaan",
    title: "Cara Menumbuhkan Kebiasaan Mengaji Tanpa Paksaan",
    excerpt: "Hindari memarahi anak saat menyuruh mengaji. Terapkan 4 tips psikologis ini agar anak secara sukarela merindukan waktu mengaji harian.",
    category: "Tips Parenting Islami",
    author: "Bunda Sarah",
    date: "28 Mei 2026",
    readTime: "5 mnt baca",
    imageUrl: "/images/blog/parenting.png",
  },
  {
    slug: "kisah-nabi-dawud-melawan-jalut",
    title: "Kisah Keberanian Nabi Dawud Melawan Jalut",
    excerpt: "Kisah kepahlawanan Nabi Dawud saat masih muda dalam menghadapi raksasa Jalut. Mengajarkan keberanian dan tawakal kepada Allah.",
    category: "Kisah Nabi",
    author: "Ustadz Riza",
    date: "20 Mei 2026",
    readTime: "7 mnt baca",
    imageUrl: "/images/blog/story.png",
  },
];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4); // simple load more pagination

  const categories = ["Semua", "Tajwid", "Kisah Nabi", "Adab & Akhlak", "Tips Parenting Islami"];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesCategory = selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-neutral-warm pb-20 font-nunito text-gray-800 text-left selection:bg-primary-light selection:text-primary-dark">
      <main className="max-w-5xl mx-auto px-4 mt-12 flex flex-col gap-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="bg-primary-light text-primary-dark border border-primary/20 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full inline-block uppercase tracking-wider mb-3 shadow-sm">
            📚 Literasi Islami Anak
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight leading-tight">
            Blog &amp; Artikel Edukasi
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-2">
            Temukan tips pengasuhan islami, kisah-kisah penuh hikmah, dan panduan belajar Al-Qur'an ramah anak di sini.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="flex flex-col gap-4 bg-white border-3 border-neutral-border p-5 rounded-[28px] shadow-sm">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari judul artikel atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-2 border-neutral-border rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(4); // Reset pagination on category change
                }}
                className={`py-2 px-4 rounded-xl font-extrabold text-xs flex-shrink-0 border-2 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-secondary border-secondary-dark text-white shadow-sm"
                    : "bg-white border-neutral-border hover:border-gray-300 text-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        <AnimatePresence mode="popLayout">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-3 border-neutral-border rounded-[32px] p-12 text-center shadow-sm max-w-sm mx-auto flex flex-col items-center gap-3"
            >
              <span className="text-3xl">🔍</span>
              <h3 className="font-extrabold text-base text-gray-800">Artikel Tidak Ditemukan</h3>
              <p className="text-xs font-semibold text-gray-400">Coba ganti kategori filter atau kata kunci pencarian Anda.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {displayedArticles.map((article, idx) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border-3 border-neutral-border rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-gray-100 overflow-hidden flex items-center justify-center select-none">
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-6 text-left flex flex-col gap-3">
                      <span className="self-start text-[9px] font-black uppercase tracking-wider bg-primary-light text-primary-dark border border-primary/20 px-2.5 py-0.5 rounded-md">
                        {article.category}
                      </span>
                      <h3 className="font-black text-lg text-gray-800 hover:text-primary transition-colors leading-snug">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-gray-450">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-primary">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PAGINATION / LOAD MORE */}
        {filteredArticles.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-xs py-3.5 px-8 rounded-2xl border-2 border-neutral-border shadow-sm active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              Tampilkan Lebih Banyak
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
