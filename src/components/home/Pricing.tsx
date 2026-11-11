import { Check, Sparkles } from "lucide-react";
import { SectionHead } from "@/components/ui/Chapter";
import { GooglePlayIcon } from "@/components/ui/primitives";
import { C, Ring } from "@/components/shapes/Shapes";
import { playStoreUrl, rupiah, site } from "@/lib/site";

// Sama dengan tabel fitur di layar Upgrade aplikasi (`UpgradePremiumScreen.kt`).
const FREE = [
  "Kasir digital & scan barcode",
  "Manajemen stok & pengingat restok",
  "Buku hutang pelanggan",
  "Kulakan ke grosir mitra",
  "Laporan harian",
  "Kelola kasir & izin akses",
  "Mode offline",
];
const PRO = [
  "Ringkasan keuangan & grafik omzet",
  "Performa produk: terlaris & paling lambat",
  "Analisis kesehatan toko",
  "Rekomendasi restok",
  "Asisten suara AI Stoqin",
];

export default function Pricing() {
  return (
    <section id="harga" aria-labelledby="harga-title" className="border-t border-line bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHead
          n={8}
          label="Harga"
          id="harga-title"
          title={
            <>
              Mulai gratis. <br className="hidden sm:block" />
              <span className="text-subtle">Naik kelas kapan saja.</span>
            </>
          }
          lead="Fitur jualan sehari-hari gratis selamanya."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article className="reveal relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-canvas p-8 sm:p-10">
            <Ring color={C.mint} className="absolute -right-16 -top-16 hidden size-40 sm:block" />
            <p className="label text-subtle">Gratis</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[2.9rem] font-medium leading-none tracking-[-0.05em] sm:text-7xl">Rp0</span>
              <span className="text-sm text-muted">selamanya</span>
            </p>
            <p className="mt-2 text-muted">Untuk semua warung.</p>
            <ul className="mt-8 grid gap-3 text-[0.95rem] sm:grid-cols-2">
              {FREE.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-leaf" strokeWidth={2.5} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="press btn-ring inline-flex h-13 items-center gap-2 px-6 font-semibold text-ink"
              >
                <GooglePlayIcon className="size-5" /> Mulai gratis
              </a>
            </div>
          </article>

          <article className="reveal relative flex flex-col overflow-hidden rounded-[24px] bg-brand-900 p-8 text-white sm:p-10">
            <Ring color="#1F4A2C" className="absolute -right-16 -top-16 hidden size-40 sm:block" />
            <p className="label flex items-center gap-2 text-white/60">
              Stoqin Pro <Sparkles className="size-3.5 text-brand-300" aria-hidden />
            </p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[2.9rem] font-medium leading-none tracking-[-0.05em] sm:text-7xl">{rupiah(site.proPrice)}</span>
              <span className="text-sm text-white/60">/ bulan</span>
            </p>
            <p className="mt-2 text-white/60">Semua fitur Gratis, ditambah:</p>
            <ul className="mt-8 grid gap-3 text-[0.95rem] sm:grid-cols-2">
              {PRO.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-300" strokeWidth={2.5} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="press inline-flex h-13 w-fit shrink-0 items-center whitespace-nowrap rounded-full bg-white px-6 font-semibold text-ink hover:bg-brand-50"
              >
                Coba Stoqin Pro
              </a>
              <p className="text-xs text-white/50">Dibayar lewat Google Play, diperpanjang otomatis. Batalkan kapan saja.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
