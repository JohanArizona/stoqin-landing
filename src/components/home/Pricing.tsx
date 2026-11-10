import { Check, Sparkles } from "lucide-react";
import { SectionHeading, GooglePlayIcon } from "@/components/ui/primitives";
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
    <section id="harga" aria-labelledby="harga-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="harga-title"
          eyebrow="Harga"
          title={
            <>
              Mulai gratis. <br className="hidden sm:block" />
              <span className="text-muted">Naik kelas kapan saja.</span>
            </>
          }
          lead="Semua fitur untuk berjualan sehari-hari gratis, tanpa batas waktu. Pro untuk kamu yang ingin membaca untung-rugi lebih dalam."
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 md:grid-cols-2">
          <article className="card reveal flex flex-col p-8 sm:p-10">
            <h3 className="text-lg font-bold">Gratis</h3>
            <p className="mt-1 text-sm text-muted">Untuk semua warung</p>
            <p className="mt-8 flex items-baseline gap-1.5">
              <span className="text-5xl font-extrabold tracking-[-0.04em]">Rp0</span>
              <span className="text-sm font-medium text-muted">selamanya</span>
            </p>
            <ul className="mt-8 space-y-3.5 text-[0.95rem]">
              {FREE.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={2.5} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="press flex h-13 items-center justify-center gap-2 rounded-2xl bg-paper font-semibold text-ink ring-1 ring-line-strong hover:bg-brand-50"
              >
                <GooglePlayIcon className="size-5" /> Mulai gratis
              </a>
            </div>
          </article>

          <article className="reveal relative flex flex-col overflow-hidden rounded-[28px] bg-brand-950 p-8 text-white shadow-[0_40px_80px_-30px_rgb(10_26_16/0.6)] sm:p-10">
            <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <h3 className="text-lg font-bold">Stoqin Pro</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-brand-950">
                <Sparkles className="size-3.5" aria-hidden /> Analisis AI
              </span>
            </div>
            <p className="relative mt-1 text-sm text-white/60">Untuk warung yang ingin tumbuh</p>
            <p className="relative mt-8 flex items-baseline gap-1.5">
              <span className="text-5xl font-extrabold tracking-[-0.04em]">{rupiah(site.proPrice)}</span>
              <span className="text-sm font-medium text-white/60">/ bulan</span>
            </p>
            <p className="relative mt-8 text-sm font-semibold text-white/60">Semua fitur Gratis, ditambah:</p>
            <ul className="relative mt-4 space-y-3.5 text-[0.95rem]">
              {PRO.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-400" strokeWidth={2.5} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="press flex h-13 items-center justify-center rounded-2xl bg-white font-bold text-ink hover:bg-brand-50"
              >
                Coba Stoqin Pro
              </a>
              <p className="mt-4 text-center text-xs text-white/50">
                Dibayar lewat Google Play, diperpanjang otomatis. Batalkan kapan saja.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
