"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Label kecil yang mengikuti kursor di atas elemen bertanda `data-cursor="..."`
 * (mis. "Seret", "Balik", "Putar"). Kursor bawaan tetap ada; label hanya muncul di elemen interaktif.
 * Hanya untuk mouse/trackpad.
 */
export default function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    gsap.set(el, { scale: 0.6 });
    const text = el.querySelector("span")!;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX + 18);
      yTo(e.clientY + 18);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const label = t?.dataset.cursor;
      if (label) {
        if (text.textContent !== label) text.textContent = label;
        if (!shown) {
          shown = true;
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
        }
      } else if (shown) {
        shown = false;
        gsap.to(el, { opacity: 0, scale: 0.6, duration: 0.2, ease: "power2.out" });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-[0_8px_24px_-8px_rgb(15_26_20/0.5)]"
    >
      <span />
    </div>
  );
}
