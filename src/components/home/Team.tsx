"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Chapter } from "@/components/ui/Chapter";
import { LogoMark } from "@/components/brand/Logo";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

// Sumber: Asset/Team.png (nama, jabatan, fakultas, angkatan, prodi).
const TEAM = [
  { id: "johan", name: "Johan Arizona", role: "CEO", roleFull: "Chief Executive Officer", unit: "FILKOM 2023", major: "Teknologi Informasi", bg: "#00A814", fg: "#fff" },
  { id: "rizqullah", name: "Muhammad Rizqullah Almadinah", role: "CTO", roleFull: "Chief Technology Officer", unit: "FILKOM 2023", major: "Teknologi Informasi", bg: "#14281D", fg: "#fff" },
  { id: "dimas", name: "Dimas Yoga Pratama", role: "CMO", roleFull: "Chief Marketing Officer", unit: "FILKOM 2023", major: "Teknologi Informasi", bg: "#D7F2DB", fg: "#0F1A14" },
  { id: "nafi", name: "Nafi Satul Fuadhah", role: "CFO", roleFull: "Chief Financial Officer", unit: "FEB 2024", major: "Akuntansi", bg: "#00680C", fg: "#fff" },
  { id: "syarmi", name: "Syarmi Ayesha Putri Samira", role: "COO", roleFull: "Chief Operating Officer", unit: "FEB 2025", major: "Akuntansi", bg: "#FFFFFF", fg: "#0F1A14" },
] as const;

// Stiker & avatar di pinggir judul (tidak pernah menimpa teks).
// x/y = desktop (lg), mx/my = HP & tablet; tanpa mx = disembunyikan di layar kecil.
type Floater = { x: number; y: number; mx?: number; my?: number };
const STICKERS: (Floater & { t: string; r: number })[] = [
  { t: "#WarungNaikKelas", x: 3, y: 9, mx: 3, my: 3, r: -8 },
  { t: "#DariMalang", x: 64, y: 6, mx: 56, my: 12, r: 7 },
  { t: "#KasirOffline", x: 79, y: 90, mx: 30, my: 91, r: -6 },
  { t: "#KulakanHemat", x: 2, y: 88, mx: 2, my: 82, r: 8 },
  { t: "#Stoqin", x: 40, y: 93, r: -4 },
];
const AVATARS: (Floater & { id: string })[] = [
  { id: "johan", x: 30, y: 2, mx: 74, my: 1 },
  { id: "rizqullah", x: 87, y: 22 },
  { id: "dimas", x: 90, y: 52 },
  { id: "nafi", x: 6, y: 44 },
  { id: "syarmi", x: 62, y: 85, mx: 76, my: 83 },
];
const pos = (f: Floater) =>
  ({ "--x": `${f.x}%`, "--y": `${f.y}%`, "--mx": `${f.mx ?? 0}%`, "--my": `${f.my ?? 0}%` }) as React.CSSProperties;
const posClass = (f: Floater) =>
  `absolute left-[var(--mx)] top-[var(--my)] lg:left-[var(--x)] lg:top-[var(--y)] ${f.mx === undefined ? "max-lg:hidden" : ""}`;

export default function Team() {
  const rootRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const field = fieldRef.current;
    if (!root || !field) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Pembuka: stiker & avatar muncul memantul, lalu mengambang pelan.
      const floaters = gsap.utils.toArray<HTMLElement>("[data-floater]", field);
      gsap.from(floaters, {
        scale: 0,
        rotation: () => gsap.utils.random(-40, 40),
        duration: 0.9,
        ease: "back.out(2.2)",
        stagger: 0.06,
        scrollTrigger: { trigger: field, start: "top 80%", once: true },
      });
      floaters.forEach((el, i) => {
        gsap.to(el.firstElementChild, { y: i % 2 ? 10 : -10, duration: 2.6 + (i % 3) * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      // Kartu menumpuk: kartu sebelumnya mengecil & meredup saat ditutup kartu berikutnya.
      const cards = gsap.utils.toArray<HTMLElement>("[data-team-card]", root);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const shade = card.querySelector("[data-shade]");
        gsap
          .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true } })
          .to(card, { scale: 0.92, ease: "none" }, 0)
          .to(shade, { opacity: 0.35, ease: "none" }, 0);
      });

      // Foto di dalam kartu masuk berputar sedikit.
      gsap.utils.toArray<HTMLElement>("[data-photo]", root).forEach((el, i) => {
        gsap.from(el, {
          y: 90,
          rotation: (i % 2 ? 1 : -1) * 14,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });

    // Stiker bisa diseret (mouse/trackpad).
    mm.add("(pointer: fine)", () => {
      const ds = gsap.utils.toArray<HTMLElement>("[data-floater]", field).map(
        (el) =>
          Draggable.create(el, {
            type: "x,y",
            bounds: field,
            inertia: true,
            zIndexBoost: true,
            onPress() {
              gsap.to(el, { scale: 1.1, duration: 0.25, ease: "back.out(2)" });
            },
            onRelease() {
              gsap.to(el, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" });
            },
          })[0],
      );
      return () => ds.forEach((d) => d.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="tim" ref={rootRef} aria-labelledby="tim-title" className="relative border-t border-line bg-paper pb-24 pt-24 sm:pb-32 sm:pt-32">
      {/* Pembuka */}
      <div ref={fieldRef} className="relative mx-auto h-[min(78vh,640px)] max-w-[1320px] px-4 sm:px-8">
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center text-center">
          <Chapter n={8}>Tim</Chapter>
          <h2 id="tim-title" className="display-xl mt-6 max-w-3xl text-balance">
            Orang-orang di balik <em className="font-serif font-normal italic tracking-[-0.02em] text-brand-600">Stoqin.</em>
          </h2>
          <p className="lead mt-5 max-w-md text-pretty text-muted">Lima mahasiswa Malang yang ingin warung naik kelas.</p>
        </div>

        {STICKERS.map((s) => (
          <div
            key={s.t}
            data-floater
            data-cursor="Seret"
            className={`${posClass(s)} z-20 cursor-grab touch-pan-y select-none active:cursor-grabbing`}
            style={pos(s)}
          >
            <span
              className="block whitespace-nowrap rounded-full border border-white/60 bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgb(0_104_12/0.6),inset_0_-2px_0_rgb(0_0_0/0.12)] sm:text-[0.95rem]"
              style={{ rotate: `${s.r}deg` }}
            >
              {s.t}
            </span>
          </div>
        ))}
        {AVATARS.map((a) => (
          <div
            key={a.id}
            data-floater
            data-cursor="Seret"
            className={`${posClass(a)} z-20 cursor-grab touch-pan-y select-none active:cursor-grabbing`}
            style={pos(a)}
          >
            <span className="relative block size-16 overflow-hidden rounded-full border-[3px] border-white shadow-[0_14px_30px_-12px_rgb(15_26_20/0.5)] sm:size-20">
              <Image src={`/tim/${a.id}.webp`} alt="" fill sizes="80px" className="pointer-events-none object-cover object-top" draggable={false} />
            </span>
          </div>
        ))}
      </div>

      {/* Kartu bertumpuk */}
      <ol className="mx-auto mt-6 max-w-[1240px] px-4 sm:px-8">
        {TEAM.map((m, i) => (
          <li
            key={m.id}
            data-team-card
            className="sticky mb-8 origin-top overflow-hidden rounded-[32px] last:mb-0"
            style={{
              top: `calc(5.5rem + ${i * 14}px)`,
              background: m.bg,
              color: m.fg,
              boxShadow: m.bg === "#FFFFFF" ? "0 0 0 1px rgb(15 26 20 / 0.08), 0 30px 60px -30px rgb(15 26 20 / 0.35)" : "0 30px 60px -30px rgb(15 26 20 / 0.45)",
            }}
          >
            <div aria-hidden data-shade className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
            <div className="relative grid items-center gap-6 p-6 sm:gap-8 sm:p-10 md:min-h-[min(72vh,600px)] md:grid-cols-[1.1fr_0.9fr] lg:p-14">
              <div>
                <div className="flex items-center gap-1.5" aria-hidden>
                  {Array.from({ length: i + 1 }).map((_, k) => (
                    <span key={k} className="size-2.5 rounded-full" style={{ background: m.fg, opacity: 0.85 }} />
                  ))}
                </div>
                <p className="label mt-8 opacity-70">{m.roleFull}</p>
                <p className="mt-3 text-[clamp(3.5rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">{m.role}</p>
                <h3 className="mt-6 max-w-md text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.025em]">{m.name}</h3>
                <p className="mt-2 text-[0.95rem] opacity-75">
                  {m.unit} · {m.major}
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <figure
                  data-photo
                  className="team-photo relative w-[min(52vw,220px)] sm:w-[260px] lg:w-[300px] rounded-[22px] bg-white p-2.5 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.45)]"
                  style={{ "--tilt": `${i % 2 ? 4 : -4}deg` } as React.CSSProperties}
                >
                  <div className="relative aspect-[470/724] overflow-hidden rounded-[16px] bg-[#9c9cab]">
                    <Image src={`/tim/${m.id}.webp`} alt={`Foto ${m.name}, ${m.roleFull} Stoqin`} fill sizes="300px" className="object-cover" />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0a1a10]/85 to-transparent" />
                    <figcaption className="absolute inset-x-4 bottom-4 text-white">
                      <span className="block text-[0.95rem] font-semibold leading-tight">{m.name}</span>
                      <span className="mt-0.5 block text-xs text-white/75">{m.role} · Stoqin</span>
                    </figcaption>
                    <LogoMark className="absolute right-3 top-3 h-6 w-auto drop-shadow" />
                  </div>
                </figure>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
