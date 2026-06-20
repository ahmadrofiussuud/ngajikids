// Server-validated Iqra Volume PDF Reader page
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertCircle, BookOpen } from "lucide-react";
import { getServerStudentIqraProgress } from "@/lib/supabase/iqra-server";
import StudentHeader from "@/components/layout/StudentHeader";

interface PageProps {
  params: Promise<{ jilid: string }>;
}

export default async function IqraReaderPage({ params }: PageProps) {
  const resolvedParams = await params;
  const jilidNum = parseInt(resolvedParams.jilid, 10);

  // 1. Sanity check: is jilid number valid (1 to 6)?
  if (isNaN(jilidNum) || jilidNum < 1 || jilidNum > 6) {
    redirect("/dashboard/iqra");
  }

  // 2. Load student level on server side
  const studentId = "child_1"; // Active student
  const progress = await getServerStudentIqraProgress(studentId);

  // 3. Server-side validation: block access to locked volumes and redirect back
  if (jilidNum > progress.current_jilid) {
    redirect("/dashboard/iqra");
  }

  const pdfUrl = `/iqra/jilid-${jilidNum}.pdf`;

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 font-nunito text-gray-800 text-left">
      <StudentHeader />

      <main className="max-w-5xl mx-auto px-4 mt-8 flex flex-col gap-6 animate-fadeIn">
        
        {/* Navigation Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-neutral-border p-4 rounded-3xl shadow-sm">
          <Link
            href="/dashboard/iqra"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-extrabold text-sm transition-all bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 self-start sm:self-auto active:scale-95"
          >
            <ChevronLeft size={16} className="stroke-[3]" />
            Kembali ke Rak
          </Link>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary border border-primary/20">
              <BookOpen size={20} />
            </div>
            <div>
              <h1 className="font-black text-lg text-gray-800 leading-tight">
                Membaca Iqra Jilid {jilidNum}
              </h1>
              <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                Santri: Ahmad Fatih • Status: Sedang Belajar
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-250 font-black px-3 py-1 rounded-full uppercase">
              Jilid Aktif
            </span>
          </div>
        </div>

        {/* PDF Reader Container */}
        <div className="bg-white border-3 border-neutral-border rounded-[36px] p-4 sm:p-6 shadow-sm flex flex-col gap-4">
          <div className="w-full h-[72vh] border border-gray-150 rounded-2xl overflow-hidden bg-gray-50 relative">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-none"
              title={`Iqra Jilid ${jilidNum} PDF Reader`}
            />
          </div>

          {/* Placement Guide Alert */}
          <div className="flex items-start gap-3 bg-amber-50 border border-secondary/20 p-4 rounded-2xl">
            <AlertCircle size={18} className="text-secondary shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-secondary-dark">Catatan Berkas PDF:</p>
              <p className="font-semibold text-gray-550 mt-1 leading-relaxed">
                Pembaca PDF di atas memuat file dari: <code className="bg-white/80 px-1 py-0.5 border rounded font-mono font-bold text-teal-800">public/iqra/jilid-{jilidNum}.pdf</code>.
                Jika tampilan di atas kosong atau ter-download otomatis, pastikan Anda telah menaruh file PDF Iqra jilid Anda di folder tersebut dengan nama berkas yang sesuai.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
