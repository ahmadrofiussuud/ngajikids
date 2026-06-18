import type { Metadata } from "next";
import { Nunito, Amiri, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NgajiKidz - Belajar Al-Qur'an Seru & Interaktif",
  description:
    "NgajiKidz adalah platform belajar Al-Qur'an interaktif untuk anak-anak usia 6-12 tahun di Indonesia. Dilengkapi gamifikasi, tracker progres AI, dan belajar bersama guru.",
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
    <html lang="id" className={`${nunito.variable} ${amiri.variable} ${fredoka.variable}`}>
      <body className="bg-neutral-warm text-gray-800 antialiased font-nunito min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
