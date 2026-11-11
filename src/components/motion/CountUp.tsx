"use client";

import { useEffect, useRef } from "react";

/**
 * Angka yang berhitung naik saat pertama kali terlihat.
 * HTML awal sudah berisi nilai akhir (aman untuk SEO & tanpa JavaScript).
 */
export default function CountUp({ to, prefix = "", suffix = "", duration = 1600 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (n: number) => prefix + Math.round(n).toLocaleString("id-ID") + suffix;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix + to.toLocaleString("id-ID") + suffix}
    </span>
  );
}
