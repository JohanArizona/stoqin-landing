"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Chapter } from "@/components/ui/Chapter";
import { LogoMark } from "@/components/brand/Logo";
import { ALL_MEMBERS, DIVISIONS, initials, type Member } from "@/lib/team";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

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

/** Foto anggota, atau monogram inisial kalau fotonya belum ada. */
function Portrait({ m, src, sizes, round = false }: { m: Member; src?: string; sizes: string; round?: boolean }) {
  if (src) return <Image src={src} alt={round ? "" : `Foto ${m.name}, ${m.role} Stoqin`} fill sizes={sizes} className="pointer-events-none object-cover object-top" draggable={false} />;
  return (
    <span
      role={round ? undefined : "img"}
      aria-label={round ? undefined : `${m.name}, ${m.role} Stoqin`}
      className="absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(120%_90%_at_30%_15%,#2bb83b_0%,#00770d_55%,#14281d_100%)] text-white"
    >
      <LogoMark className="absolute -bottom-[8%] -right-[10%] h-[62%] w-auto opacity-15" />
      <span className={`relative font-serif italic leading-none ${round ? "text-2xl" : "text-[clamp(3rem,6vw,4.5rem)]"}`}>{initials(m.name)}</span>
    </span>
  );
}

export default function Team({ photos }: { photos: Record<string, string> }) {
  const rootRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const byId = Object.fromEntries(ALL_MEMBERS.map((m) => [m.id, m]));

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

      // Kartu divisi menumpuk: yang sebelumnya mengecil & meredup saat ditutup kartu berikutnya.
      const cards = gsap.utils.toArray<HTMLElement>("[data-team-card]", root);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap
          .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true } })
          .to(card, { scale: 0.93, ease: "none" }, 0)
          .to(card.querySelector("[data-shade]"), { opacity: 0.35, ease: "none" }, 0);
      });

      // Kartu foto di tiap divisi dilempar masuk bergiliran.
      cards.forEach((card) => {
        gsap.from(card.querySelectorAll("[data-photo]"), {
          y: 120,
          rotation: (i) => (i % 2 ? 1 : -1) * 16,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: card, start: "top 70%", once: true },
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
          <p className="lead mt-5 max-w-md text-pretty text-muted">
            {ALL_MEMBERS.length} orang, satu misi: bikin warung naik kelas.
          </p>
        </div>

        {STICKERS.map((s) => (
          <div key={s.t} data-floater data-cursor="Seret" className={`${posClass(s)} z-20 cursor-grab touch-pan-y select-none active:cursor-grabbing`} style={pos(s)}>
            <span
              className="block whitespace-nowrap rounded-full border border-white/60 bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgb(0_104_12/0.6),inset_0_-2px_0_rgb(0_0_0/0.12)] sm:text-[0.95rem]"
              style={{ rotate: `${s.r}deg` }}
            >
              {s.t}
            </span>
          </div>
        ))}
        {AVATARS.map((a) => (
          <div key={a.id} data-floater data-cursor="Seret" className={`${posClass(a)} z-20 cursor-grab touch-pan-y select-none active:cursor-grabbing`} style={pos(a)}>
            <span className="relative block size-16 overflow-hidden rounded-full border-[3px] border-white shadow-[0_14px_30px_-12px_rgb(15_26_20/0.5)] sm:size-20">
              <Portrait m={byId[a.id]} src={photos[a.id]} sizes="80px" round />
            </span>
          </div>
        ))}
      </div>

      {/* Kartu divisi bertumpuk */}
      <ol className="mx-auto mt-6 max-w-[1240px] px-4 sm:px-8">
        {DIVISIONS.map((d, i) => (
          <li
            key={d.id}
            data-team-card
            className="sticky mb-8 origin-top overflow-hidden rounded-[32px] last:mb-0"
            style={{
              top: `calc(5.5rem + ${i * 14}px)`,
              background: d.bg,
              color: d.fg,
              boxShadow:
                d.bg === "#FFFFFF" ? "0 0 0 1px rgb(15 26 20 / 0.08), 0 30px 60px -30px rgb(15 26 20 / 0.35)" : "0 30px 60px -30px rgb(15 26 20 / 0.45)",
            }}
          >
            <div aria-hidden data-shade className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
            <div className="relative px-5 pb-8 pt-6 sm:px-10 sm:pb-12 sm:pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5" aria-hidden>
                  {Array.from({ length: i + 1 }).map((_, k) => (
                    <span key={k} className="size-2.5 rounded-full opacity-85" style={{ background: d.fg }} />
                  ))}
                </div>
                <span className="label opacity-60">
                  {String(i + 1).padStart(2, "0")} / {String(DIVISIONS.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-center text-[clamp(2rem,4.6vw,3.75rem)] font-medium leading-none tracking-[-0.045em] sm:mt-6">{d.title}</h3>

              <ul className={`-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-3 [scrollbar-width:none] sm:-mx-10 sm:mt-10 sm:gap-5 sm:px-10 lg:mx-0 lg:justify-center lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden ${d.members.length <= 3 ? "sm:justify-center" : ""}`}>
                {d.members.map((m, k) => (
                  <li key={m.id} className="shrink-0 snap-center">
                    <figure
                      data-photo
                      className={`team-photo relative w-[min(46vw,200px)] rounded-[20px] bg-white p-2 shadow-[0_26px_50px_-22px_rgb(0_0_0/0.5)] sm:w-[210px] ${d.members.length >= 5 ? "lg:w-[196px]" : d.members.length === 4 ? "lg:w-[220px]" : "lg:w-[240px]"}`}
                      style={{ "--tilt": `${[-4, 3, -2][k % 3]}deg` } as React.CSSProperties}
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-[14px] bg-[#9c9cab]">
                        <Portrait m={m} src={photos[m.id]} sizes="(max-width: 640px) 46vw, 240px" />
                        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1a10]/90 to-transparent" />
                        <figcaption className="absolute inset-x-3 bottom-3 text-left text-white sm:inset-x-4 sm:bottom-4">
                          <span className="block text-[0.9rem] font-semibold leading-tight sm:text-[0.95rem]">{m.name}</span>
                          <span className="mt-1 block text-[0.72rem] leading-snug text-white/75 sm:text-xs">{m.role}</span>
                          {m.detail ? <span className="mt-0.5 block text-[0.68rem] leading-snug text-white/55">{m.detail}</span> : null}
                        </figcaption>
                      </div>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
