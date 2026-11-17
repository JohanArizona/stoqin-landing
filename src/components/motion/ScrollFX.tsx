"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Efek scroll global (satu tempat, berlaku di semua halaman):
 *  - Judul bagian (h2 besar / [data-fx=split]) muncul kata per kata dari balik "masker" baris.
 *  - Label bab ([data-chapter]): titik membesar, garis tergambar, teks masuk.
 *  - Semua `.reveal` naik bergiliran (batch) saat masuk layar — menggantikan versi CSS.
 *  - Gambar [data-fx=img]: terbuka dengan clip-path + zoom-out halus.
 *  - Parallax [data-speed="0.2"]: bergerak lebih lambat/cepat dari scroll.
 * Teks asli tetap utuh di HTML (SEO & pembaca layar). "Kurangi gerakan" = tanpa efek.
 */
export default function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      const below = (el: Element) => el.getBoundingClientRect().top > vh * 0.92;

      // 1) Judul
      gsap.utils
        .toArray<HTMLElement>("main h2.display-lg, main h2.display-xl, main h2.display-md, [data-fx='split']")
        .filter((el) => !el.closest("[data-fx-skip]") && below(el))
        .forEach((el) => {
          el.classList.add("fx-split");
          const split = SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            linesClass: "fx-line",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                yPercent: 115,
                rotate: 4,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.045,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
          splits.push(split);
        });

      // 2) Label bab
      gsap.utils.toArray<HTMLElement>("[data-chapter]").filter(below).forEach((el) => {
        const [dot, num, line, text] = Array.from(el.children) as HTMLElement[];
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } })
          .from(dot, { scale: 0, duration: 0.6, ease: "back.out(3)" })
          .from(num, { opacity: 0, x: -8, duration: 0.5, ease: "power3.out" }, "<0.05")
          .from(line, { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "expo.out" }, "<0.1")
          .from(text, { opacity: 0, x: -10, duration: 0.6, ease: "power3.out" }, "<0.15");
      });

      // 3) .reveal → batch naik bergiliran
      const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
      reveals.forEach((el) => {
        el.classList.remove("reveal");
        el.classList.add("fx-revealed");
      });
      const pending = reveals.filter(below);
      gsap.set(pending, { opacity: 0, y: 56, scale: 0.97 });
      ScrollTrigger.batch(pending, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true, clearProps: "transform" }),
      });

      // 4) Gambar: clip-path + zoom
      gsap.utils.toArray<HTMLElement>("[data-fx='img']").filter(below).forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(el, { clipPath: "inset(18% 8% 18% 8% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "expo.out" });
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
      });

      // 5) Keluar layar: elemen hero naik dengan kecepatan berbeda & memudar.
      gsap.utils.toArray<HTMLElement>("[data-exit]").forEach((el) => {
        const s = parseFloat(el.dataset.exit || "1");
        const sec = el.closest("section") ?? el;
        gsap.to(el, {
          y: () => -s * window.innerHeight * 0.18,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        });
      });

      // 6) Parallax
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = parseFloat(el.dataset.speed || "0");
        gsap.fromTo(
          el,
          { y: () => -s * 120 },
          { y: () => s * 120, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } },
        );
      });
    });

    // Gambar/foto yang selesai dimuat bisa menggeser posisi → hitung ulang.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
