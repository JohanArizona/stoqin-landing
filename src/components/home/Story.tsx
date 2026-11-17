import { Wallet, CloudOff, ScanBarcode, PackageCheck, BookOpen, Truck } from "lucide-react";
import { Chapter } from "@/components/ui/Chapter";
import { Tile, type Tone } from "@/components/shapes/Shapes";
import { site } from "@/lib/site";

const PERKS: { icon: typeof Wallet; tone: Tone; title: string; body: string; before: string }[] = [
  { icon: Wallet, tone: "leaf", title: "Gratis", body: "Kasir, stok, hutang, dan kulakan tanpa biaya.", before: "Beli mesin kasir jutaan" },
  { icon: CloudOff, tone: "forest", title: "Jalan tanpa sinyal", body: "Kuota habis? Jualan tetap tercatat.", before: "Aplikasi macet saat offline" },
  { icon: ScanBarcode, tone: "deep", title: "Cukup kamera HP", body: `Scan barcode, ${site.catalogSize} produk langsung dikenali.`, before: "Ketik nama barang satu-satu" },
  { icon: PackageCheck, tone: "mint", title: "Stok hitung sendiri", body: "Berkurang otomatis setiap ada yang beli.", before: "Hitung stok tiap malam" },
  { icon: BookOpen, tone: "leaf", title: "Hutang tak hilang", body: "Catatan kasbon rapi, tinggal tandai lunas.", before: "Buku hutang sobek & hilang" },
  { icon: Truck, tone: "forest", title: "Kulakan diantar", body: "Pesan dari HP, barang sampai depan warung.", before: "Keliling pasar, habis bensin" },
];

export default function Story() {
  return (
    <section id="keunggulan" aria-labelledby="keunggulan-title" className="relative border-t border-line bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <Chapter n={1}>Keunggulan</Chapter>
        <h2 id="keunggulan-title" className="display-lg mt-6 max-w-3xl text-balance">
          Kenapa warung pilih <span className="text-brand-600">Stoqin?</span>
        </h2>

        <ul className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p) => (
            <li key={p.title} className="reveal group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-paper p-6 sm:p-7">
              <Tile
                icon={p.icon}
                tone={p.tone}
                className="size-14 text-[1.75rem] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110"
              />
              <h3 className="mt-6 text-[1.6rem] font-semibold leading-[1.2] tracking-[-0.03em] text-ink">{p.title}</h3>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-muted">{p.body}</p>
              <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm leading-normal text-subtle">
                <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/5 text-[0.7rem] font-bold leading-none">
                  ✕
                </span>
                <span>
                  Dulu: <span className="line-through decoration-ink/30">{p.before}</span>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
