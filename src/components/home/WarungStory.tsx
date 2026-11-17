"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chapter } from "@/components/ui/Chapter";

gsap.registerPlugin(ScrollTrigger);

// x/y = posisi pusat polaroid (desktop, % panggung), r = kemiringan.
const PHOTOS = [
  { src: "/warung/warung-1.webp", x: 11, y: 27, r: -8, alt: "Pemilik warung sembako tersenyum di balik etalase sambil memegang HP berisi aplikasi Stoqin" },
  { src: "/warung/warung-2.webp", x: 30, y: 20, r: 5, alt: "Ibu pemilik warung berkerudung memperlihatkan aplikasi Stoqin di antara galon dan botol air" },
  { src: "/warung/warung-3.webp", x: 70, y: 19, r: -4, alt: "Pemilik toko kelontong berkaus merah menunjukkan aplikasi Stoqin di HP-nya" },
  { src: "/warung/warung-4.webp", x: 89, y: 29, r: 7, alt: "Penjaga warung muda memegang HP dengan aplikasi Stoqin di depan rak deterjen dan jajanan" },
  { src: "/warung/warung-5.webp", x: 13, y: 76, r: 6, alt: "Bapak pemilik warung memegang HP dengan aplikasi Stoqin di antara toples jajanan" },
  { src: "/warung/warung-6.webp", x: 31, y: 83, r: -6, alt: "Pemilik warung berpeci memperlihatkan aplikasi Stoqin di depan rak kopi sachet" },
  { src: "/warung/warung-7.webp", x: 69, y: 82, r: 4, alt: "Pemilik warung dan anggota tim Stoqin mencoba aplikasi bersama di warung" },
  { src: "/warung/warung-8.webp", x: 88, y: 73, r: -7, alt: "Bapak pemilik kios bersama anggota tim Stoqin memegang HP dengan aplikasi Stoqin" },
];

export default function WarungStory() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mm = gsap.matchMedia();

    // Desktop: panggung menempel, polaroid "dilempar", lalu foto toko terbuka memenuhi layar.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-polaroid]", stage);
      const head = stage.querySelector<HTMLElement>("[data-head]");
      const big = stage.querySelector<HTMLElement>("[data-big]");
      const bigImg = big?.querySelector("img");
      const caption = stage.querySelector<HTMLElement>("[data-caption]");
      if (!head || !big || !bigImg || !caption) return;

      gsap.set(big, { clipPath: "inset(50% 50% 50% 50% round 24px)" });
      gsap.set(bigImg, { scale: 1.35 });
      gsap.set(caption, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage, start: "top top", end: "+=280%", pin: true, scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true },
      });
      tl.from(cards, {
        y: () => window.innerHeight * 0.95,
        x: (i) => (PHOTOS[i].x - 50) * -4,
        rotation: (i) => (i % 2 ? 1 : -1) * 28,
        scale: 0.8,
        opacity: 0,
        stagger: 0.07,
        duration: 0.55,
        ease: "power3.out",
      })
        .to({}, { duration: 0.2 })
        .to(head, { opacity: 0, y: -70, scale: 0.94, duration: 0.3, ease: "power2.in" })
        .to(big, { clipPath: "inset(31% 37% 31% 37% round 24px)", duration: 0.25, ease: "power2.out" }, "<0.05")
        .to(
          cards,
          {
            x: (i) => (PHOTOS[i].x - 50) * window.innerWidth * 0.014,
            y: (i) => (PHOTOS[i].y - 50) * window.innerHeight * 0.014,
            scale: 1.25,
            opacity: 0,
            stagger: 0.015,
            duration: 0.5,
            ease: "power2.in",
          },
          "<0.1",
        )
        .to(big, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.55, ease: "power2.inOut" }, "<0.15")
        .to(bigImg, { scale: 1, duration: 0.7, ease: "power2.out" }, "<")
        .to(caption, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ">-0.2")
        .to({}, { duration: 0.25 });
    });

    // HP/tablet: polaroid naik bergiliran + parallax ringan.
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-polaroid]", stage);
      cards.forEach((el, i) => {
        gsap.from(el, {
          y: 80,
          rotation: (i % 2 ? 1 : -1) * 10,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section aria-labelledby="lapangan-title" className="relative overflow-hidden border-t border-line bg-canvas">
      <div ref={stageRef} className="relative py-24 sm:py-32 lg:h-[100svh] lg:py-0">
        {/* Judul di tengah panggung */}
        <div
          data-head
          className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-8 lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center"
        >
          <div className="lg:flex lg:justify-center">
            <Chapter n={3}>Dari lapangan</Chapter>
          </div>
          <h2 id="lapangan-title" className="display-lg mt-6 max-w-2xl text-balance">
            Dibuat bersama <em className="font-serif font-normal italic tracking-[-0.02em] text-brand-600">warung sungguhan.</em>
          </h2>
          <p className="lead mt-5 max-w-md text-pretty text-muted lg:mx-auto">Kami turun ke warung-warung di Malang, mendengar, lalu membangun Stoqin bersama pemiliknya.</p>
        </div>

        {/* Polaroid */}
        <div className="mx-auto mt-12 grid max-w-[1320px] grid-cols-2 gap-x-4 gap-y-8 px-6 sm:grid-cols-4 sm:px-8 lg:contents">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              data-polaroid
              className="polaroid lg:absolute lg:z-0 lg:w-[clamp(140px,11.5vw,196px)]"
              style={{ "--x": `${p.x}%`, "--y": `${p.y}%`, "--r": `${p.r}deg` } as React.CSSProperties}
            >
              <div className="polaroid-inner rounded-[6px] bg-white p-[6%] pb-[3%] shadow-[0_24px_50px_-22px_rgb(15_26_20/0.45),0_2px_6px_rgb(15_26_20/0.08)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-paper-2">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 24vw, 200px" className="object-cover" />
                </div>
                <figcaption className="flex items-center justify-between pt-[7%] font-serif text-[0.95rem] italic text-ink-2">
                  Malang <span className="label not-italic text-subtle">No. {String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* Foto toko yang terbuka memenuhi layar */}
        <figure
          data-big
          className="relative mx-4 mt-14 overflow-hidden rounded-[24px] sm:mx-8 lg:absolute lg:inset-0 lg:z-20 lg:m-0 lg:rounded-none"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-auto lg:h-full">
            <Image src="/warung/toko-sembako.webp" alt="Toko sembako di Malang dengan etalase penuh jajanan dan sembako, tempat riset lapangan Stoqin" fill sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
          <figcaption data-caption className="absolute inset-x-0 bottom-0 mx-auto max-w-[1320px] px-6 pb-8 text-white sm:px-8 sm:pb-12 lg:pb-16">
            <span className="label text-white/70">Riset lapangan · Malang</span>
            <p className="mt-3 max-w-3xl text-[clamp(1.6rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              Setiap fitur Stoqin lahir dari obrolan di depan <em className="font-serif font-normal italic">etalase.</em>
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
