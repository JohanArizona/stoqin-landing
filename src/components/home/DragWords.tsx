"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScanBarcode, ReceiptText, BookOpen, Calculator, RefreshCw, ShoppingCart, MapPin, PackageCheck, TrendingUp, RotateCcw, Hand } from "lucide-react";
import { Tile, type Tone } from "@/components/shapes/Shapes";
import { useMedia } from "@/components/motion/useMedia";
import { Chapter } from "@/components/ui/Chapter";

gsap.registerPlugin(Draggable, InertiaPlugin);

const WORDS: { w: string; icon: typeof ScanBarcode; tone: Tone; d: string }[] = [
  { w: "Scan.", icon: ScanBarcode, tone: "forest", d: "Kamera HP jadi pemindai barcode." },
  { w: "Jual.", icon: ReceiptText, tone: "leaf", d: "Tunai, QRIS, transfer, atau hutang." },
  { w: "Catat.", icon: BookOpen, tone: "mint", d: "Hutang pelanggan tercatat sendiri." },
  { w: "Hitung.", icon: Calculator, tone: "deep", d: "Omzet & laba dihitung otomatis." },
  { w: "Restok.", icon: RefreshCw, tone: "white", d: "Diingatkan sebelum barang habis." },
  { w: "Kulakan.", icon: ShoppingCart, tone: "leaf", d: "Pesan stok dari grosir terdekat." },
  { w: "Lacak.", icon: MapPin, tone: "forest", d: "Pantau kurir langsung di peta." },
  { w: "Terima.", icon: PackageCheck, tone: "mint", d: "Barang sampai di depan warung." },
  { w: "Untung.", icon: TrendingUp, tone: "deep", d: "Tahu persis untung hari ini." },
];

export default function DragWords() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [moved, setMoved] = useState(false);
  const canDrag = useMedia("(pointer: fine)");

  useEffect(() => {
    const area = areaRef.current;
    if (!area || !canDrag) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = gsap.utils.toArray<HTMLElement>("[data-word]", area);
    const ds = items.map((el) =>
      Draggable.create(el, {
        type: "x,y",
        bounds: area,
        inertia: !reduce,
        edgeResistance: 0.75,
        zIndexBoost: true,
        onPress() {
          setActive(Number(el.dataset.word));
          gsap.to(el, { scale: 1.05, rotation: gsap.utils.random(-5, 5), duration: 0.35, ease: "back.out(2)" });
        },
        onDragStart() {
          setMoved(true);
        },
        onRelease() {
          gsap.to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" });
        },
      })[0],
    );
    return () => ds.forEach((d) => d.kill());
  }, [canDrag]);

  const reset = () => {
    const area = areaRef.current;
    if (!area) return;
    gsap.to(gsap.utils.toArray<HTMLElement>("[data-word]", area), {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "elastic.out(1, 0.7)",
      stagger: 0.04,
    });
    setMoved(false);
  };

  const A = WORDS[active];

  return (
    <section id="cara-kerja" aria-labelledby="cara-kerja-title" className="relative mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
      <Chapter n={1}>Cara kerja</Chapter>
      <h2 id="cara-kerja-title" className="sr-only">
        Cara kerja Stoqin: dari scan barcode sampai untung
      </h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div ref={areaRef} className="relative -m-3 flex flex-wrap content-start gap-x-6 gap-y-5 p-3 sm:gap-x-10 sm:gap-y-8">
          {WORDS.map((x, i) => (
            <span key={x.w} className="block">
              <button
                type="button"
                data-word={i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative flex touch-pan-y select-none items-center gap-[0.22em] rounded-2xl text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.045em] transition-colors duration-300 ${
                  active === i ? "text-ink" : "text-ink/85"
                } ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
                aria-describedby="drag-caption"
                data-cursor={canDrag ? "Seret" : undefined}
              >
                {x.w}
                <Tile
                  icon={x.icon}
                  tone={x.tone}
                  className="size-[0.8em] transition-transform duration-500 ease-[var(--ease-spring)]"
                  style={{ transform: active === i ? "rotate(-8deg) scale(1.08)" : undefined }}
                />
              </button>
            </span>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="panel p-6">
            <p className="label text-subtle">
              {String(active + 1).padStart(2, "0")} / {String(WORDS.length).padStart(2, "0")}
            </p>
            <p id="drag-caption" aria-live="polite" className="mt-3 min-h-[3.5rem] text-lg font-medium leading-snug text-ink">
              {A.d}
            </p>
            <div className="mt-5 flex items-center gap-1" aria-hidden>
              {WORDS.map((x, i) => (
                <span
                  key={x.w}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{ background: i <= active ? "#00A814" : "rgb(15 26 20 / 0.1)" }}
                />
              ))}
            </div>
          </div>
          {canDrag ? (
            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Hand className="size-4" aria-hidden /> Kata-katanya bisa diseret
              </span>
              <button
                type="button"
                onClick={reset}
                disabled={!moved}
                className="press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium hover:bg-ink/5 hover:text-ink disabled:opacity-0"
              >
                <RotateCcw className="size-3.5" aria-hidden /> Rapikan
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
