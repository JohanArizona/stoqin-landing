import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { Device } from "@/components/ui/Device";
import { GooglePlayIcon } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { playStoreUrl, site } from "@/lib/site";

const SLUG = "/panduan/cara-memilih-aplikasi-kasir-warung";
const TITLE = "Cara Memilih Aplikasi Kasir Terbaik untuk Warung";
const DESC =
  "Panduan memilih aplikasi kasir untuk warung: 7 hal yang wajib dicek, dari gratis, bisa offline, scan barcode, stok otomatis, sampai buku hutang.";
const PUBLISHED = "2026-11-18";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · Stoqin` },
  description: DESC,
  alternates: { canonical: SLUG },
  openGraph: { type: "article", title: TITLE, description: DESC, url: `${site.url}${SLUG}`, publishedTime: PUBLISHED },
};

const CHECKS = [
  {
    t: "Gratis untuk fitur dasar",
    d: "Warung kecil tidak perlu mengeluarkan biaya bulanan hanya untuk mencatat penjualan. Pastikan kasir, stok, dan pencatatan hutang bisa dipakai tanpa bayar, dan fitur berbayar hanya untuk kebutuhan tambahan.",
  },
  {
    t: "Tetap jalan tanpa internet",
    d: "Sinyal hilang atau kuota habis tidak boleh menghentikan jualan. Pilih aplikasi kasir offline yang menyimpan transaksi di HP lalu mengirimnya otomatis saat internet kembali.",
  },
  {
    t: "Scan barcode pakai kamera HP",
    d: "Tidak perlu membeli alat scanner. Aplikasi yang baik memakai kamera HP untuk scan barcode, dan sudah punya katalog produk sehingga nama barang terisi sendiri.",
  },
  {
    t: "Stok berkurang otomatis",
    d: "Setiap penjualan harus langsung memotong stok, lengkap dengan pengingat saat barang laris hampir habis. Dengan begitu kamu tidak perlu menghitung rak setiap malam.",
  },
  {
    t: "Ada buku hutang (kasbon)",
    d: "Di warung, pelanggan sering bayar belakangan. Pastikan transaksi bisa dicatat sebagai hutang, terlihat jatuh temponya, dan bisa ditandai lunas dengan mudah.",
  },
  {
    t: "Bisa dipakai lebih dari satu orang",
    d: "Kalau ada yang ikut menjaga warung, kasir sebaiknya punya akun sendiri dengan izin yang bisa diatur pemilik, sehingga setiap transaksi tetap tercatat jelas.",
  },
  {
    t: "Laporan untung, bukan cuma omzet",
    d: "Omzet ramai belum tentu untung. Pilih aplikasi yang menghitung laba berdasarkan harga beli dan harga jual, plus menunjukkan barang terlaris.",
  },
];

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: TITLE,
        description: DESC,
        datePublished: PUBLISHED,
        dateModified: PUBLISHED,
        inLanguage: "id-ID",
        mainEntityOfPage: `${site.url}${SLUG}`,
        image: `${site.url}/app/home.webp`,
        author: { "@type": "Organization", name: "Tim Stoqin", url: site.url },
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stoqin", item: site.url },
          { "@type": "ListItem", position: 2, name: "Panduan", item: `${site.url}${SLUG}` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SmoothScroll />
      <Navbar />
      <main className="bg-paper pb-24 pt-28 sm:pt-36">
        <article className="mx-auto max-w-[760px] px-4 sm:px-8">
          <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-subtle">
            <Link href="/" className="hover:text-ink">
              Stoqin
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">Panduan</span>
          </nav>
          <h1 className="display-lg mt-8 text-balance">{TITLE}</h1>
          <p className="mt-4 text-sm text-subtle">
            Diperbarui <time dateTime={PUBLISHED}>18 November 2026</time> · 5 menit baca
          </p>
          <p className="lead mt-8 text-pretty text-ink-2">
            Banyak aplikasi kasir dibuat untuk kafe atau minimarket, padahal kebutuhan warung berbeda: modal kecil, sinyal tidak selalu
            stabil, banyak pelanggan yang bayar belakangan, dan belanja stok ke grosir setiap minggu. Berikut tujuh hal yang perlu kamu
            cek sebelum memilih aplikasi kasir untuk warung atau toko kelontong.
          </p>

          <ol className="mt-12 space-y-4">
            {CHECKS.map((c, i) => (
              <li key={c.t} className="reveal rounded-[22px] border border-line bg-canvas p-6 sm:p-7">
                <h2 className="flex items-start gap-3 text-[1.35rem] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-leaf text-sm font-bold leading-none text-white">{i + 1}</span>
                  {c.t}
                </h2>
                <p className="mt-3 leading-relaxed text-muted sm:pl-11">{c.d}</p>
              </li>
            ))}
          </ol>

          <section aria-labelledby="ringkas" className="mt-16">
            <h2 id="ringkas" className="display-md">Daftar cek singkat</h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {CHECKS.map((c) => (
                <li key={c.t} className="flex items-start gap-2.5 leading-normal text-ink-2">
                  <Check className="mt-0.5 size-5 shrink-0 text-leaf" strokeWidth={2.5} aria-hidden />
                  {c.t}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="stoqin" className="mt-16 overflow-hidden rounded-[28px] bg-brand-900 p-7 text-white sm:p-10">
            <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
              <div>
                <h2 id="stoqin" className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.03em]">
                  Stoqin memenuhi ketujuhnya.
                </h2>
                <p className="mt-3 leading-relaxed text-white/75">
                  Kasir, stok, buku hutang, dan kulakan grosir gratis di Android, tetap jalan tanpa internet, dan dibuat bersama pemilik
                  warung di Malang.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener"
                    className="press inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink hover:bg-brand-50"
                  >
                    <GooglePlayIcon className="size-5" /> Unduh gratis
                  </a>
                  <Link href="/aplikasi-kasir-warung" className="inline-flex h-12 items-center gap-1.5 rounded-full px-4 font-semibold text-white hover:bg-white/10">
                    Lihat fitur kasir <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <Device screen="home" className="mx-auto w-[170px] rotate-3" sizes="170px" />
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
