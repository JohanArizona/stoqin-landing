"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoMark } from "@/components/brand/Logo";

gsap.registerPlugin(ScrollTrigger);

const ROW = ["Kelola Warung Jadi Mudah", "Belanja Stok Lebih Murah"];

/** Dua baris moto raksasa yang bergeser berlawanan arah mengikuti scroll. */
export default function ScrollBand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [a, b] = Array.from(el.querySelectorAll<HTMLElement>("[data-row]"));
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(a, { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: st });
      gsap.fromTo(b, { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    }, el);
    return () => ctx.revert();
  }, []);

  const line = (outline: boolean) =>
    Array.from({ length: 3 }).flatMap((_, k) =>
      ROW.map((t, i) => (
        <span key={`${k}-${i}`} className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
          <span className={outline ? "text-outline" : i ? "text-brand-600" : "text-ink"}>{t}</span>
          <LogoMark className="h-[0.7em] w-auto" />
        </span>
      )),
    );

  return (
    <div ref={ref} aria-hidden className="overflow-hidden border-t border-line bg-canvas py-14 sm:py-20">
      <div className="text-[clamp(2.6rem,8vw,7.5rem)] font-medium leading-[1.05] tracking-[-0.05em]">
        <div data-row className="flex w-max">
          {line(false)}
        </div>
        <div data-row className="flex w-max">
          {line(true)}
        </div>
      </div>
    </div>
  );
}
