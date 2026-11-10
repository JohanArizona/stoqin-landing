import Image from "next/image";
import { SectionHeading } from "@/components/ui/primitives";

const STEPS = [
  {
    n: "01",
    title: "Unduh & daftar",
    body: "Pasang Stoqin dari Google Play, daftar dengan email atau akun Google, lalu isi nama dan lokasi warung. Kurang dari 2 menit.",
    img: "/illustrations/onboarding-1.webp",
    alt: "Pemilik warung tersenyum memegang HP",
  },
  {
    n: "02",
    title: "Masukkan barang",
    body: "Scan barcode barang di rak. Nama dan fotonya terisi dari katalog Stoqin — kamu tinggal isi harga dan jumlah stok.",
    img: "/illustrations/onboarding-3.webp",
    alt: "Pemilik warung memindai barcode kardus barang dengan kamera HP",
  },
  {
    n: "03",
    title: "Jualan & restok",
    body: "Catat penjualan dari layar kasir. Saat barang menipis, kulakan dari HP dan barang diantar sampai warung.",
    img: "/illustrations/onboarding-2.webp",
    alt: "Pemilik warung menerima kardus barang kulakan",
  },
];

export default function HowToStart() {
  return (
    <section id="cara-mulai" aria-labelledby="cara-mulai-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="cara-mulai-title"
          eyebrow="Cara mulai"
          title="Siap dipakai hari ini."
          lead="Tidak perlu beli mesin kasir, tidak perlu pelatihan. Cukup HP Android yang sudah kamu punya."
        />
        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="card reveal overflow-hidden">
              <div className="relative aspect-[1290/1000] overflow-hidden bg-paper">
                <Image
                  src={s.img}
                  alt={s.alt}
                  width={1290}
                  height={1368}
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="absolute inset-x-0 top-0 w-full"
                />
              </div>
              <div className="p-7">
                <p className="text-sm font-bold tabular-nums text-brand-600">{s.n}</p>
                <h3 className="title mt-2">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
