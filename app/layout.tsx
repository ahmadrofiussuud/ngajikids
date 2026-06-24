import type { Metadata } from "next";
import "./globals.css";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "NgajiKidz - Belajar Al-Qur'an Seru & Interaktif",
  description:
    "NgajiKidz adalah platform belajar Al-Qur'an interaktif untuk anak-anak usia 6-12 tahun di Indonesia. Dilengkapi gamifikasi, tracker progres AI, dan belajar bersama Ustadz.",
  keywords: [
    "ngaji",
    "belajar mengaji",
    "al-quran anak",
    "edukasi islam",
    "gamifikasi",
    "indonesia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-neutral-warm text-gray-800 antialiased font-nunito min-h-screen overflow-x-hidden">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
