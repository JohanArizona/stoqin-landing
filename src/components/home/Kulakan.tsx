"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageCircle, Store, Star, RotateCw, RefreshCw } from "lucide-react";
import { SectionHead } from "@/components/ui/Chapter";
import { C } from "@/components/shapes/Shapes";

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
  { name: "Grosir Sumber Rejeki", price: "Rp112.000", best: true, rating: "4,9" },
  { name: "Toko Makmur Jaya", price: "Rp114.500", rating: "4,8" },
  { name: "UD Berkah Abadi", price: "Rp116.000", rating: "4,7" },
];

type Card = {
  n: string;
  title: string;
  bg: string;
  fg: string;
  motif: React.ReactNode;
  back: React.ReactNode;
  desc: string;
};

const CARDS: Card[] = [
  {
    n: "01",
    title: "Bandingkan harga",
    bg: C.leaf,
    fg: "#fff",
    desc: "Grosir termurah tampil paling atas.",
    motif: (
      <svg viewBox="0 0 200 200" className="absolute -bottom-6 -right-6 w-[78%]" aria-hidden>
        <rect x="20" y="110" width="40" height="90" fill="#fff" />
        <rect x="80" y="60" width="40" height="140" fill="#fff" />
        <rect x="140" y="0" width="40" height="200" fill="#fff" />
      </svg>
    ),
    back: (
      <ul className="space-y-1.5">
        {OFFERS.map((o) => (
          <li key={o.name} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${o.best ? "bg-brand-50 ring-1 ring-brand-200" : "bg-paper"}`}>
            <Store className="size-4 shrink-0 text-brand-700" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.78rem] font-semibold text-ink">{o.name}</span>
              <span className="flex items-center gap-1 text-[0.68rem] text-muted">
                <Star className="size-3 fill-leaf text-leaf" aria-hidden /> {o.rating}
              </span>
            </span>
            <span className="text-[0.8rem] font-bold tabular-nums text-ink">{o.price}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    n: "02",
    title: "Bayar sesukamu",
    bg: C.mint,
    fg: C.forest,
    desc: "QRIS, bank, e-wallet, atau di minimarket.",
    motif: (
      <svg viewBox="0 0 200 200" className="absolute -bottom-10 -right-10 w-[85%]" aria-hidden>
        <circle cx="120" cy="120" r="80" fill="none" stroke={C.leaf} strokeWidth="36" />
      </svg>
    ),
    back: (
      <div className="grid grid-cols-3 gap-1.5">
        {PAY.slice(0, 9).map((p) => (
          <span key={p.id} className="grid h-9 place-items-center rounded-lg bg-white px-2">
            <Image src={`/pay/${p.id}.webp`} alt={p.name} width={80} height={32} className="max-h-5 w-auto object-contain" />
          </span>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "Lacak kurirnya",
    bg: C.deep,
    fg: "#fff",
    desc: "Pantau kurir di peta, chat langsung.",
    motif: (
      <svg viewBox="0 0 200 200" className="absolute -bottom-4 -right-4 w-[80%]" aria-hidden>
        <path d="M200 0 V200 H0 L0 150 H150 V0 Z" fill="#fff" />
      </svg>
    ),
    back: <CourierMap />,
  },
  {
    n: "04",
    title: "Restok sekali ketuk",
    bg: C.forest,
    fg: "#fff",
    desc: "Barang menipis? Langsung pesan lagi.",
    motif: (
      <svg viewBox="0 0 200 200" className="absolute -bottom-2 -right-2 w-[82%]" aria-hidden>
        <path d="M60 0 L200 140 V200 H170 L30 60 Z" fill="#fff" />
        <path d="M0 110 L90 200 H40 L0 160 Z" fill={C.leaf} />
      </svg>
    ),
    back: (
      <div className="rounded-xl bg-white p-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-[0.65rem] font-bold text-brand-700">IN</span>
          <span className="flex-1">
            <span className="block text-[0.8rem] font-semibold text-ink">Indomie Goreng</span>
            <span className="text-[0.7rem] text-muted">
              Stok 7 · <span className="font-semibold text-brand-700">Menipis</span>
            </span>
          </span>
        </div>
        <span className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-brand-700 py-2 text-[0.75rem] font-bold text-white">
          <RefreshCw className="size-3.5" aria-hidden /> Restok dari grosir
        </span>
      </div>
    ),
  },
];

export default function Kulakan() {
  return (
    <section id="kulakan" aria-labelledby="kulakan-title" className="relative border-t border-line bg-canvas py-24 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHead
          n={5}
          label="Kulakan grosir"
          id="kulakan-title"
          title={
            <>
              Kulakan tanpa ke pasar.
            </>
          }
          lead="Pesan dari grosir terdekat, barang diantar sampai depan warung."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <FlipCard key={c.n} card={c} />
          ))}
        </ul>

        {/* Strip metode pembayaran */}
        <div className="mt-14 border-y border-line py-6">
          <p className="label mb-5 text-center text-subtle">Metode pembayaran kulakan</p>
          <div className="marquee overflow-hidden">
            <ul className="marquee-track flex w-max items-center gap-12" aria-label="Metode pembayaran yang didukung">
              {[...PAY, ...PAY].map((p, i) => (
                <li key={`${p.id}-${i}`} aria-hidden={i >= PAY.length} className="flex h-8 shrink-0 items-center grayscale transition hover:grayscale-0">
                  <Image src={`/pay/${p.id}.webp`} alt={i < PAY.length ? p.name : ""} width={96} height={36} className="max-h-7 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlipCard({ card }: { card: Card }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <li className="reveal">
      <div
        role="button"
        tabIndex={0}
        className="flip block h-[380px] w-full cursor-pointer text-left"
        data-flipped={flipped}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        aria-pressed={flipped}
        data-cursor="Balik"
      >
        <div className="flip-inner size-full">
          <div className="flip-face flex flex-col overflow-hidden rounded-[22px] p-6" style={{ background: card.bg, color: card.fg }}>
            <span className="label relative z-10 opacity-70">{card.n}</span>
            <h3 className="relative z-10 mt-3 block max-w-[10ch] text-[1.6rem] font-medium leading-[1.05] tracking-[-0.03em]">{card.title}</h3>
            {card.motif}
            <RotateCw className="absolute bottom-5 left-6 size-4 opacity-60" aria-hidden />
          </div>
          <div className="flip-face flip-back flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper p-5">
            <span className="label text-subtle">{card.n}</span>
            <span aria-hidden className="mt-2 text-[1.05rem] font-semibold tracking-tight text-ink">{card.title}</span>
            <span className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">{card.desc}</span>
            <div className="mt-auto pt-4">{card.back}</div>
          </div>
        </div>
      </div>
    </li>
  );
}

function CourierMap() {
  return (
    <span className="relative block overflow-hidden rounded-xl bg-[#e9efe6]">
      <svg viewBox="0 0 320 200" className="block h-auto w-full" aria-hidden>
        <g stroke="#fff" strokeWidth="14" strokeLinecap="round">
          <path d="M-10 60 H330" />
          <path d="M-10 150 H330" />
          <path d="M80 -10 V210" />
          <path d="M220 -10 V210" />
        </g>
        <path d="M 40 180 C 90 150, 110 120, 160 110 S 250 80, 280 30" fill="none" stroke="#00AA13" strokeWidth="4" strokeLinecap="round" />
        <circle cx="40" cy="180" r="8" fill="#14281D" />
        <circle cx="280" cy="30" r="10" fill="#00680C" stroke="#fff" strokeWidth="3" />
        <g className="courier-live">
          <circle r="11" fill="#fff" stroke="#00680C" strokeWidth="3" />
          <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" path="M 40 180 C 90 150, 110 120, 160 110 S 250 80, 280 30" />
        </g>
        <g className="courier-static" transform="translate(228 84)">
          <circle r="11" fill="#fff" stroke="#00680C" strokeWidth="3" />
        </g>
      </svg>
      <span className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1.5 text-[0.7rem] font-semibold text-ink backdrop-blur">
        Kurir menuju warungmu · ±12 mnt
        <MessageCircle className="ml-auto size-3.5" aria-hidden />
      </span>
    </span>
  );
}
