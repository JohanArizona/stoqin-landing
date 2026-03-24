import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Stoqin",
  description:
    "Aplikasi All-in-One Marketplace Grosir, Kasir Digital, dan Analisis Penjualan untuk Usaha Ritel",
  keywords: "kasir digital, warung kelontong, marketplace grosir, POS Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${jakarta.variable} ${poppins.variable} font-body bg-[#0A0A0A] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}