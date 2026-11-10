import { Store, Warehouse, Bike, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { playStoreUrl, waUrl } from "@/lib/site";

const APPS = [
  {
    icon: Store,
    name: "Stoqin",
    for: "Untuk pemilik warung & kasir",
    points: ["Kasir, stok & buku hutang", "Kulakan ke grosir terdekat", "Laporan untung & asisten AI"],
    cta: { label: "Unduh di Google Play", href: playStoreUrl },
    accent: "bg-brand-600 text-white",
  },
  {
    icon: Warehouse,
    name: "Stoqin Grosir",
    for: "Untuk grosir & distributor",
    points: ["Katalog, harga & minimal beli", "Terima pesanan dari warung", "Tugaskan kurir & pantau pengantaran"],
    cta: { label: "Jadi mitra grosir", href: waUrl("Halo Stoqin, saya pemilik grosir dan ingin bergabung sebagai mitra.") },
    accent: "bg-ink text-white",
  },
  {
    icon: Bike,
    name: "Stoqin Kurir",
    for: "Untuk kurir grosir",
    points: ["Daftar tugas antar harian", "Navigasi ke warung tujuan", "Bukti foto & chat dengan warung"],
    cta: { label: "Tanya tim Stoqin", href: waUrl("Halo Stoqin, saya ingin tahu tentang aplikasi Stoqin Kurir.") },
    accent: "bg-honey text-[#2b2000]",
  },
];

export default function Ecosystem() {
  return (
    <section id="ekosistem" aria-labelledby="ekosistem-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="ekosistem-title"
          eyebrow="Ekosistem Stoqin"
          title={
            <>
              Satu ekosistem. <span className="text-muted">Tiga aplikasi.</span>
            </>
          }
          lead="Warung memesan, grosir menyiapkan, kurir mengantar — semuanya tercatat dan terhubung secara langsung. Tidak ada lagi pesanan lewat telepon yang terlupa."
        />

        <ol className="reveal mx-auto mt-14 hidden max-w-3xl flex-wrap sm:flex items-center justify-center gap-2 text-sm font-semibold text-ink-2" aria-label="Alur pesanan">
          {["Warung pesan", "Grosir terima & siapkan", "Kurir antar", "Warung terima barang"].map((s, i, a) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full bg-white px-4 py-2 shadow-[0_0_0_1px_rgb(12_24_16/0.08)]">{s}</span>
              {i < a.length - 1 ? <ArrowRight className="size-4 text-subtle" aria-hidden /> : null}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {APPS.map((app) => (
            <article key={app.name} className="card reveal flex flex-col p-7 sm:p-8">
              <span aria-hidden className={`grid size-14 place-items-center rounded-2xl ${app.accent}`}>
                <app.icon className="size-7" strokeWidth={1.75} />
              </span>
              <h3 className="title mt-6">{app.name}</h3>
              <p className="mt-1 text-sm font-medium text-muted">{app.for}</p>
              <ul className="mt-6 space-y-3 text-sm text-ink-2">
                {app.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-500" strokeWidth={2.5} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={app.cta.href}
                target="_blank"
                rel="noopener"
                className="press mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink hover:bg-brand-50"
              >
                {app.cta.label} <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
