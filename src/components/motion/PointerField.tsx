"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Menulis posisi pointer (−1..1, dihaluskan dengan lerp tiap frame) ke CSS variable
 * `--px`/`--py` di elemennya. Anak-anaknya menggeser diri dengan
 * `translate: calc(var(--px) * <kedalaman>) ...` sehingga terasa berlapis (parallax).
 */
export default function PointerField({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      raf = 0,
      running = false;
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      if (Math.abs(tx - x) > 0.0005 || Math.abs(ty - y) > 0.0005) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={className} style={{ "--px": 0, "--py": 0 } as React.CSSProperties}>
      {children}
    </div>
  );
}
