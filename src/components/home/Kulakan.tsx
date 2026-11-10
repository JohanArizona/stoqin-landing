import Image from "next/image";
import { MessageCircle, Store, Star, ArrowDownUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";

const PAY = [
  { id: "qris", name: "QRIS" },
  { id: "bca", name: "BCA" },
  { id: "bri", name: "BRI" },
  { id: "bni", name: "BNI" },
  { id: "mandiri", name: "Mandiri" },
  { id: "bsi", name: "BSI" },
  { id: "permata", name: "Permata" },
  { id: "cimb", name: "CIMB Niaga" },
  { id: "dana", name: "DANA" },
  { id: "ovo", name: "OVO" },
  { id: "shopeepay", name: "ShopeePay" },
  { id: "linkaja", name: "LinkAja" },
  { id: "alfamart", name: "Alfamart" },
  { id: "indomaret", name: "Indomaret" },
];

const OFFERS = [
  { name: "Grosir Sumber Rejeki", price: "Rp112.000", note: "min. 1 dus", best: true, rating: "4,9" },
  { name: "Toko Makmur Jaya", price: "Rp114.500", note: "min. 2 dus", rating: "4,8" },
  { name: "UD Berkah Abadi", price: "Rp116.000", note: "min. 1 dus", rating: "4,7" },
];

export default function Kulakan() {
  return (
    <section id="kulakan" aria-labelledby="kulakan-title" className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgb(43_184_59/0.22),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="kulakan-title"
          tone="dark"
          eyebrow="Kulakan grosir"
          title={
            <>
              Kulakan tanpa ke pasar.
            </>
          }
          lead="Hemat bensin, parkir, dan waktu. Bandingkan harga dari grosir terdekat, pesan dari HP, lalu barang diantar kurir sampai depan warung."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {/* 1. Bandingkan */}
          <article className="reveal flex flex-col rounded-[28px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
            <Step n="1" title="Bandingkan harga" body="Satu barang, banyak grosir. Termurah tampil paling atas, lengkap dengan minimal pembelian." />
            <div className="mt-8 rounded-2xl bg-white p-3 text-ink">
              <div className="flex items-center justify-between px-1.5 pb-2">
                <p className="text-sm font-bold">Indomie Goreng · 1 dus</p>
                <span className="flex items-center gap-1 text-[0.7rem] font-semibold text-muted">
                  <ArrowDownUp className="size-3" aria-hidden /> Termurah
                </span>
              </div>
              <ul className="space-y-1.5">
                {OFFERS.map((o) => (
                  <li key={o.name} className={`flex items-center gap-3 rounded-xl p-2.5 ${o.best ? "bg-brand-50 ring-1 ring-brand-200" : "bg-paper"}`}>
                    <span aria-hidden className="grid size-9 place-items-center rounded-lg bg-white text-brand-700 shadow-sm">
                      <Store className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.8rem] font-semibold">{o.name}</span>
                      <span className="flex items-center gap-1 text-[0.7rem] text-muted">
                        <Star className="size-3 fill-honey text-honey" aria-hidden /> {o.rating} · {o.note}
                      </span>
                    </span>
                    <span className="text-sm font-extrabold tabular-nums">{o.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs text-white/50">Ilustrasi. Harga mengikuti grosir mitra di sekitarmu.</p>
          </article>

          {/* 2. Bayar */}
          <article className="reveal flex flex-col overflow-hidden rounded-[28px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
            <Step n="2" title="Bayar sesukamu" body="QRIS, virtual account bank, dompet digital, sampai bayar di Alfamart atau Indomaret." />
            <div className="marquee -mx-6 my-auto py-10 sm:-mx-8" aria-label="Metode pembayaran yang didukung">
              <ul className="marquee-track flex w-max gap-3">
                {[...PAY, ...PAY].map((p, i) => (
                  <li
                    key={`${p.id}-${i}`}
                    aria-hidden={i >= PAY.length}
                    className="grid h-14 w-28 shrink-0 place-items-center rounded-2xl bg-white px-4"
                  >
                    <Image src={`/pay/${p.id}.webp`} alt={i < PAY.length ? p.name : ""} width={96} height={40} className="max-h-7 w-auto object-contain" />
                  </li>
                ))}
              </ul>
              <ul className="marquee-track mt-3 flex w-max gap-3 [animation-direction:reverse]" aria-hidden>
                {[...PAY.slice(7), ...PAY.slice(0, 7), ...PAY.slice(7), ...PAY.slice(0, 7)].map((p, i) => (
                  <li key={`b-${p.id}-${i}`} className="grid h-14 w-28 shrink-0 place-items-center rounded-2xl bg-white px-4">
                    <Image src={`/pay/${p.id}.webp`} alt="" width={96} height={40} className="max-h-7 w-auto object-contain" />
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* 3. Lacak */}
          <article className="reveal flex flex-col rounded-[28px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
            <Step n="3" title="Lacak sampai depan warung" body="Posisi kurir bergerak langsung di peta. Ada perlu? Chat kurirnya dari aplikasi." />
            <div className="relative mt-8 overflow-hidden rounded-2xl bg-[#e9efe6]">
              <CourierMap />
              <div className="glass absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl p-3 text-ink">
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">AR</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8rem] font-bold">Kurir sedang menuju warungmu</span>
                  <span className="block text-[0.7rem] text-muted">Tiba ± 12 menit</span>
                </span>
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-ink text-white">
                  <MessageCircle className="size-4" />
                </span>
              </div>
            </div>
          </article>
        </div>

        <p className="reveal mx-auto mt-12 max-w-2xl text-center text-white/60">
          Di setiap barang yang menipis ada tombol <span className="font-semibold text-white">Restok</span> — sekali ketuk,
          langsung ke kulakan barang yang sama.
        </p>
      </div>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <span className="grid size-8 place-items-center rounded-full bg-brand-500 text-sm font-extrabold text-brand-950">{n}</span>
      <h3 className="title mt-5">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{body}</p>
    </div>
  );
}

function CourierPin() {
  return (
    <>
      <circle r="13" fill="#fff" stroke="#00680C" strokeWidth="3" />
      <path d="M-5 2 h10 M-3 -3 h6" stroke="#00680C" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function CourierMap() {
  return (
    <svg viewBox="0 0 320 300" className="block h-auto w-full" role="img" aria-label="Peta pelacakan: kurir bergerak dari gudang grosir menuju warung">
      <rect width="320" height="300" fill="#e9efe6" />
      {/* blok jalan */}
      <g stroke="#fff" strokeWidth="14" strokeLinecap="round" opacity="0.95">
        <path d="M-10 90 H 330" />
        <path d="M-10 200 H 330" />
        <path d="M70 -10 V 310" />
        <path d="M210 -10 V 310" />
      </g>
      <g fill="#d8e4d3">
        <rect x="90" y="110" width="100" height="70" rx="10" />
        <rect x="230" y="110" width="80" height="70" rx="10" />
        <rect x="90" y="10" width="100" height="62" rx="10" />
        <rect x="-10" y="110" width="62" height="70" rx="10" />
      </g>
      <circle cx="140" cy="145" r="22" fill="#cfe2c8" />
      {/* rute */}
      <path d="M 40 250 C 90 210, 110 170, 160 160 S 250 120, 280 70" fill="none" stroke="#00680C" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 10" opacity="0.35" />
      <path d="M 40 250 C 90 210, 110 170, 160 160 S 250 120, 280 70" fill="none" stroke="#00AA13" strokeWidth="4" strokeLinecap="round" />
      {/* gudang */}
      <g transform="translate(40 250)">
        <circle r="10" fill="#14281D" />
        <circle r="4" fill="#fff" />
      </g>
      {/* warung */}
      <g transform="translate(280 70)">
        <circle r="18" fill="#00AA13" opacity="0.2" />
        <circle r="11" fill="#00680C" stroke="#fff" strokeWidth="3" />
      </g>
      {/* kurir */}
      <g className="courier-live">
        <CourierPin />
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          keyPoints="0;1;1"
          keyTimes="0;0.8;1"
          calcMode="spline"
          keySplines="0.22 1 0.36 1;0 0 1 1"
          path="M 40 250 C 90 210, 110 170, 160 160 S 250 120, 280 70"
        />
      </g>
      <g className="courier-static" transform="translate(227.5 130)">
        <CourierPin />
      </g>
    </svg>
  );
}
