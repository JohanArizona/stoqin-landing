"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScanBarcode, Mic, QrCode, Bell, Search, BookOpen, CloudOff, BarChart3, Wallet, LayoutDashboard, ShoppingCart, ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/ui/Chapter";
import { Device, SCREENS, type ScreenName } from "@/components/ui/Device";
import { C } from "@/components/shapes/Shapes";
import { useViewportHeight } from "@/components/motion/useMedia";
import { site } from "@/lib/site";

type Step = {
  key: string;
  screen: ScreenName;
  tag: string;
  title: string;
  body: string;
  chips: { icon: React.ComponentType<{ className?: string }>; t: string }[];
  href?: string;
  shape: { bg: string; radius: string; rotate: number; scale: number };
};

const STEPS: Step[] = [
  {
    key: "dashboard",
    screen: "home",
    tag: "Dashboard",
    title: "Semua angka penting, sekali lihat.",
    body: "Penjualan hari ini, grafik 7 hari, dan pengingat restok langsung di layar utama.",
    chips: [
      { icon: LayoutDashboard, t: "Ringkasan harian" },
      { icon: Bell, t: "Pengingat restok" },
    ],
    shape: { bg: C.leaf, radius: "50%", rotate: 0, scale: 1 },
  },
  {
    key: "kasir",
    screen: "kasir",
    href: "/kasir",
    tag: "Kasir digital",
    title: "Jualan secepat bicara.",
    body: "Scan barcode pakai kamera, atau ketuk mikrofon dan sebut pesanannya.",
    chips: [
      { icon: ScanBarcode, t: "Scan barcode" },
      { icon: Mic, t: "Kasir suara" },
      { icon: QrCode, t: "QRIS & transfer" },
    ],
    shape: { bg: C.mint, radius: "22%", rotate: 10, scale: 0.94 },
  },
  {
    key: "stok",
    screen: "stok",
    href: "/stok",
    tag: "Stok otomatis",
    title: "Stok berkurang sendiri.",
    body: "Setiap penjualan memotong stok, dan kamu diingatkan sebelum barang habis.",
    chips: [
      { icon: Search, t: `Katalog ${site.catalogSize}` },
      { icon: CloudOff, t: "Tetap jalan offline" },
    ],
    shape: { bg: C.deep, radius: "50% 50% 18% 18%", rotate: -8, scale: 0.95 },
  },
  {
    key: "hutang",
    screen: "hutang",
    href: "/buku-hutang",
    tag: "Buku hutang",
    title: "Hutang tercatat rapi.",
    body: "Lihat siapa yang jatuh tempo, ingatkan pelanggan, tandai lunas sekali ketuk.",
    chips: [{ icon: BookOpen, t: "Per pelanggan" }],
    shape: { bg: C.forest, radius: "30%", rotate: 45, scale: 0.82 },
  },
  {
    key: "kulakan",
    screen: "kulakan",
    href: "/kulakan",
    tag: "Kulakan",
    title: "Belanja stok dari HP.",
    body: "Bandingkan grosir terdekat, ambil promo, barang diantar sampai warung.",
    chips: [{ icon: ShoppingCart, t: "Grosir terdekat" }],
    shape: { bg: C.mint, radius: "50%", rotate: 0, scale: 1.06 },
  },
  {
    key: "laporan",
    screen: "premium",
    href: "/laporan",
    tag: "Laporan",
    title: "Tahu untung, bukan cuma omzet.",
    body: "Laba, margin, barang terlaris, sampai skor kesehatan warung.",
    chips: [
      { icon: Wallet, t: "Laba bersih" },
      { icon: BarChart3, t: "Kesehatan warung" },
    ],
    shape: { bg: C.leaf, radius: "24%", rotate: -12, scale: 0.9 },
  },
];

const PHONE_W = 300;
const PHONE_H = Math.round(PHONE_W * (2424 / 1080)) + 16;

export default function ProductStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const vh = useViewportHeight();
  // HP selalu muat di bawah header (64px) dengan ruang napas.
  const scale = Math.min(1, Math.max(0.55, (vh - 64 - 64) / PHONE_H));

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const s = STEPS[active].shape;

  return (
    <section id="fitur" aria-labelledby="fitur-title" className="relative border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHead
          n={4}
          label="Fitur"
          id="fitur-title"
          title={
            <>
              Semua urusan warung. <em className="font-serif font-normal italic tracking-[-0.02em] text-brand-600">Di satu HP.</em>
            </>
          }
        />

        <div className="mt-12 grid lg:mt-0 lg:grid-cols-2 lg:gap-16">
          {/* HP yang menempel (desktop): screenshot asli aplikasi */}
          <div className="sticky top-16 hidden h-[calc(100vh-4rem)] items-center justify-center lg:flex">
            <div className="relative" style={{ transform: `scale(${scale})` }}>
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 size-[440px] transition-all duration-[1100ms] ease-[var(--ease-out-expo)]"
                style={{ background: s.bg, borderRadius: s.radius, transform: `translate(-50%,-50%) rotate(${s.rotate}deg) scale(${s.scale})` }}
              />
              <div className="relative" style={{ width: PHONE_W }}>
                {/* bingkai + layar pertama sebagai dasar; layar lain ditumpuk & crossfade */}
                <Device screen={STEPS[0].screen} sizes="320px" />
                {/* padding % dihitung dari lebar, sama persis dengan bingkai Device */}
                <div className="pointer-events-none absolute inset-0 p-[2.6%]">
                <div className="relative h-full overflow-hidden rounded-[10.5%/4.7%] bg-paper">
                  {STEPS.map((st, i) => (
                    <Image
                      key={st.key}
                      src={`/app/${st.screen}.webp`}
                      alt={i === active ? SCREENS[st.screen] : ""}
                      aria-hidden={i !== active}
                      width={720}
                      height={1616}
                      sizes="320px"
                      className="absolute inset-0 size-full object-cover transition-[opacity,transform,filter] duration-700 ease-[var(--ease-out-expo)]"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? "none" : `translateY(${i < active ? -3 : 3}%) scale(0.985)`,
                        filter: i === active ? "none" : "blur(6px)",
                      }}
                    />
                  ))}
                  <span aria-hidden className="absolute left-1/2 top-[1.25%] aspect-square w-[3.4%] -translate-x-1/2 rounded-full bg-[#0b0d0c] ring-[1.5px] ring-[#222]" />
                </div>
                </div>
              </div>
            </div>
            <ol className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-2" aria-hidden>
              {STEPS.map((st, i) => (
                <li
                  key={st.key}
                  className="w-1.5 rounded-full transition-all duration-500"
                  style={{ height: i === active ? 28 : 6, background: i === active ? C.leaf : "rgb(15 26 20 / 0.15)" }}
                />
              ))}
            </ol>
          </div>

          {/* Langkah-langkah */}
          <div>
            {STEPS.map((st, i) => (
              <div
                key={st.key}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="flex flex-col justify-center py-12 lg:min-h-[88vh] lg:py-0"
              >
                <p className="label flex items-center gap-3 text-muted">
                  <span className="tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px w-6 bg-ink/20" />
                  {st.tag}
                </p>
                <h3
                  className={`display-md mt-5 max-w-md text-balance transition-colors duration-500 ${
                    i === active ? "text-ink" : "text-ink lg:text-subtle"
                  }`}
                >
                  {st.title}
                </h3>
                <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted">{st.body}</p>
                <ul className="mt-6 flex max-w-md flex-wrap gap-2">
                  {st.chips.map((c) => (
                    <li key={c.t} className="flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-[0.8rem] font-medium text-ink-2">
                      <c.icon className="size-3.5 text-brand-600" aria-hidden />
                      {c.t}
                    </li>
                  ))}
                </ul>
                {st.href ? (
                  <Link href={st.href} className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
                    Selengkapnya tentang {st.tag.toLowerCase()}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                ) : null}

                {/* HP per langkah (mobile/tablet) */}
                <div className="relative mt-10 flex justify-center overflow-hidden py-8 lg:hidden">
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 size-[300px]"
                    style={{ background: st.shape.bg, borderRadius: st.shape.radius, transform: `translate(-50%,-50%) rotate(${st.shape.rotate}deg)` }}
                  />
                  <Device screen={st.screen} className="relative w-[250px]" sizes="250px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
