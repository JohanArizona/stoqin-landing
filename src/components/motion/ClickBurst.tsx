"use client";

import { useEffect } from "react";

/**
 * Efek klik: cincin hijau yang memuai + 8 percikan kecil di titik klik.
 * Elemen dibuat langsung di DOM (tanpa re-render React) dan dihapus setelah animasinya selesai.
 */
export default function ClickBurst() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:100;overflow:hidden";
    document.body.appendChild(layer);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const root = document.createElement("div");
      root.style.cssText = `position:absolute;left:${e.clientX}px;top:${e.clientY}px;width:0;height:0`;

      const ring = document.createElement("div");
      ring.style.cssText =
        "position:absolute;left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;border:2px solid #00A814;box-sizing:border-box";
      root.appendChild(ring);
      ring.animate(
        [
          { transform: "scale(0.2)", opacity: 0.9 },
          { transform: "scale(1)", opacity: 0 },
        ],
        { duration: 560, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
      );

      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const s = document.createElement("div");
        s.style.cssText = `position:absolute;left:-1px;top:-5px;width:2px;height:10px;border-radius:2px;background:${i % 2 ? "#00680C" : "#00A814"};transform-origin:1px 5px`;
        root.appendChild(s);
        const deg = (a * 180) / Math.PI + 90;
        const d0 = 10,
          d1 = 30;
        s.animate(
          [
            { transform: `rotate(${deg}deg) translateY(-${d0}px) scaleY(1)`, opacity: 1 },
            { transform: `rotate(${deg}deg) translateY(-${d1}px) scaleY(0.2)`, opacity: 0 },
          ],
          { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
        );
      }
      layer.appendChild(root);
      window.setTimeout(() => root.remove(), 620);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.remove();
    };
  }, []);
  return null;
}
