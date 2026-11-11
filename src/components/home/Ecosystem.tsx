import { ArrowUpRight, Warehouse, Bike, Package, MapPin, ShoppingCart } from "lucide-react";
import { SectionHead } from "@/components/ui/Chapter";
import { Tile, Box } from "@/components/shapes/Shapes";
import { playStoreUrl, waUrl } from "@/lib/site";

const APPS = [
  {
    name: "Stoqin",
    for: "Warung & kasir",
    points: ["Kasir, stok & hutang", "Kulakan ke grosir"],
    cta: { label: "Unduh di Google Play", href: playStoreUrl },
    art: (
      <>
        <Box className="absolute left-[16%] top-[20%] size-[38%]" />
        <Tile icon={ShoppingCart} tone="white" className="absolute bottom-[16%] right-[16%] size-[24%] rotate-6" />
      </>
    ),
    bg: "#E6F6E8",
  },
  {
    name: "Stoqin Grosir",
    for: "Grosir & distributor",
    points: ["Terima pesanan warung", "Atur kurir & katalog"],
    cta: { label: "Jadi mitra grosir", href: waUrl("Halo Stoqin, saya pemilik grosir dan ingin bergabung sebagai mitra.") },
    art: (
      <>
        <Tile icon={Warehouse} tone="forest" className="absolute left-[18%] top-[18%] size-[34%] -rotate-6" />
        <Tile icon={Package} tone="leaf" className="absolute bottom-[14%] right-[18%] size-[28%] rotate-6" />
      </>
    ),
    bg: "#EEF1EC",
  },
  {
    name: "Stoqin Kurir",
    for: "Kurir grosir",
    points: ["Tugas antar harian", "Navigasi & bukti foto"],
    cta: { label: "Tanya tim Stoqin", href: waUrl("Halo Stoqin, saya ingin tahu tentang aplikasi Stoqin Kurir.") },
    art: (
      <>
        <Tile icon={Bike} tone="deep" className="absolute left-[18%] top-[22%] size-[34%] rotate-3" />
        <Tile icon={MapPin} tone="mint" className="absolute bottom-[14%] right-[18%] size-[26%] -rotate-6" />
      </>
    ),
    bg: "#DDF2E0",
  },
];

export default function Ecosystem() {
  return (
    <section id="ekosistem" aria-labelledby="ekosistem-title" className="border-t border-line bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHead
          n={7}
          label="Ekosistem"
          id="ekosistem-title"
          title={
            <>
              Satu ekosistem, <span className="text-brand-600">tiga aplikasi.</span>
            </>
          }
          lead="Warung pesan, grosir siapkan, kurir antar. Semua tercatat."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {APPS.map((app) => (
            <article key={app.name} className="reveal group flex flex-col overflow-hidden rounded-[24px] border border-line bg-paper">
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: app.bg }} aria-hidden>
                <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-2 group-hover:scale-[1.05]">
                  {app.art}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink">{app.name}</h3>
                <p className="label mt-2 text-subtle">{app.for}</p>
                <ul className="mt-5 space-y-2 text-[0.95rem] text-ink-2">
                  {app.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-leaf" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={app.cta.href}
                  target="_blank"
                  rel="noopener"
                  className="press mt-7 inline-flex w-fit items-center gap-1.5 rounded-full border border-line-strong bg-canvas px-4 py-2 text-sm font-semibold text-ink hover:border-leaf hover:text-brand-700"
                >
                  {app.cta.label} <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
