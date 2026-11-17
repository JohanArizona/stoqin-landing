"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScanBarcode, Banknote, PackageCheck, ShoppingCart } from "lucide-react";
import { Chapter } from "@/components/ui/Chapter";
import { Device, SCREENS, type ScreenName } from "@/components/ui/Device";
import { C } from "@/components/shapes/Shapes";

const STEPS: { icon: typeof ScanBarcode; screen: ScreenName; title: string; body: string; shape: string }[] = [
  { icon: ScanBarcode, screen: "kasir", title: "Scan barang", body: "Arahkan kamera HP ke barcode. Barang langsung masuk keranjang.", shape: C.leaf },
  { icon: Banknote, screen: "bayar", title: "Terima bayaran", body: "Tunai, QRIS, transfer, atau catat jadi hutang.", shape: C.mint },
  { icon: PackageCheck, screen: "stok", title: "Stok berkurang sendiri", body: "Tidak perlu hitung manual. Kamu diingatkan sebelum habis.", shape: C.deep },
  { icon: ShoppingCart, screen: "kulakan", title: "Kulakan saat menipis", body: "Pesan dari grosir terdekat, diantar sampai warung.", shape: C.forest },
];
const DURATION = 4800;

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // naik setiap langkah berganti → animasi progres diulang
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const auto = visible && !paused;
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setActive((a) => (a + 1) % STEPS.length);
      setCycle((c) => c + 1);
    }, DURATION);
    return () => clearTimeout(t);
  }, [auto, active, cycle]);

  const pick = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section
      ref={rootRef}
      id="cara-kerja"
      aria-labelledby="cara-kerja-title"
      className="relative border-t border-line bg-paper py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <Chapter n={2}>Cara kerja</Chapter>
        <h2 id="cara-kerja-title" className="display-lg mt-6 max-w-3xl text-balance">
          Semudah <span className="text-brand-600">empat langkah.</span>
        </h2>

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Langkah */}
          <ol role="tablist" aria-label="Langkah memakai Stoqin" className="grid gap-3">
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="cara-kerja-layar"
                    onClick={() => pick(i)}
                    className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-[22px] border p-5 text-left transition-colors duration-300 sm:gap-5 sm:p-6 ${
                      on ? "border-transparent bg-canvas shadow-[0_20px_50px_-28px_rgb(15_26_20/0.35)]" : "border-line hover:bg-canvas/60"
                    }`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-[14px] transition-colors duration-300 ${
                        on ? "bg-leaf text-white" : "bg-ink/5 text-ink-2"
                      }`}
                    >
                      <s.icon className="size-6" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="label block text-subtle">Langkah {i + 1}</span>
                      <span className={`mt-1 block text-[1.35rem] font-semibold leading-[1.25] tracking-[-0.025em] sm:text-2xl ${on ? "text-ink" : "text-ink-2"}`}>
                        {s.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-[1.02rem] leading-relaxed text-muted">{s.body}</span>
                        </span>
                      </span>
                    </span>
                    {/* garis progres */}
                    {on ? (
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
                        <span
                          key={cycle}
                          className="step-progress block h-full origin-left bg-leaf"
                          style={{ animationDuration: `${DURATION}ms`, animationPlayState: auto ? "running" : "paused" }}
                        />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Layar HP */}
          <div id="cara-kerja-layar" role="tabpanel" aria-live="polite" className="relative mx-auto flex w-full justify-center py-6 lg:w-[380px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 size-[300px] rounded-[38%] transition-[background-color,rotate] duration-700 ease-[var(--ease-out-expo)] sm:size-[360px]"
              style={{ background: STEPS[active].shape, translate: "-50% -50%", rotate: `${active * 22}deg` }}
            />
            <div className="relative w-[250px] sm:w-[280px]">
              <Device screen={STEPS[0].screen} sizes="280px" />
              <div className="pointer-events-none absolute inset-0 p-[2.6%]">
                <div className="relative h-full overflow-hidden rounded-[10.5%/4.7%] bg-paper">
                  {STEPS.map((s, i) => (
                    <Image
                      key={s.screen}
                      src={`/app/${s.screen}.webp`}
                      alt={i === active ? SCREENS[s.screen] : ""}
                      aria-hidden={i !== active}
                      width={720}
                      height={1616}
                      sizes="280px"
                      className="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]"
                      style={{ opacity: i === active ? 1 : 0, transform: i === active ? "none" : "scale(1.03)" }}
                    />
                  ))}
                  <span aria-hidden className="absolute left-1/2 top-[1.25%] aspect-square w-[3.4%] -translate-x-1/2 rounded-full bg-[#0b0d0c] ring-[1.5px] ring-[#222]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
