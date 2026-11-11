"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chapter } from "@/components/ui/Chapter";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { src: "/warung/warung-1.webp", alt: "Pemilik warung sembako tersenyum di balik etalase sambil memegang HP berisi aplikasi Stoqin" },
  { src: "/warung/warung-2.webp", alt: "Ibu pemilik warung berkerudung memperlihatkan aplikasi Stoqin di antara galon dan botol air" },
  { src: "/warung/warung-3.webp", alt: "Pemilik toko kelontong berkaus merah menunjukkan aplikasi Stoqin di HP-nya" },
  { src: "/warung/warung-4.webp", alt: "Penjaga warung muda memegang HP dengan aplikasi Stoqin di depan rak deterjen dan jajanan" },
  { src: "/warung/warung-5.webp", alt: "Bapak pemilik warung memegang HP dengan aplikasi Stoqin di antara toples jajanan" },
  { src: "/warung/warung-6.webp", alt: "Pemilik warung berpeci memperlihatkan aplikasi Stoqin di depan rak kopi sachet" },
  { src: "/warung/warung-7.webp", alt: "Pemilik warung dan anggota tim Stoqin mencoba aplikasi bersama di warung" },
  { src: "/warung/warung-8.webp", alt: "Bapak pemilik kios bersama anggota tim Stoqin memegang HP dengan aplikasi Stoqin" },
];

export default function WarungGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mm = gsap.matchMedia();
    // Desktop + gerak diizinkan: galeri menempel & bergeser horizontal mengikuti scroll.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: track.parentElement,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      // Foto lebar membesar pelan saat discroll (parallax).
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.12 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: heroImgRef.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="lapangan-title" className="relative overflow-hidden border-t border-line bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <Chapter n={3}>Dari lapangan</Chapter>
            <h2 id="lapangan-title" className="display-lg mt-6 text-balance">
              Dibuat bersama <em className="font-serif font-normal italic tracking-[-0.02em] text-brand-600">warung sungguhan.</em>
            </h2>
          </div>
          <p className="lead max-w-sm text-muted">Kami turun langsung ke warung-warung di Malang, mendengar, lalu membangun Stoqin bersama pemiliknya.</p>
        </div>

        {/* Foto lebar */}
        <figure className="reveal relative mt-12 overflow-hidden rounded-[28px] sm:mt-16">
          <div ref={heroImgRef} className="relative aspect-[4/3] origin-center sm:aspect-[16/8]">
            <Image
              src="/warung/toko-sembako.webp"
              alt="Toko sembako di Malang dengan etalase penuh jajanan dan sembako, tempat riset lapangan Stoqin"
              fill
              sizes="(max-width: 1320px) 100vw, 1256px"
              className="object-cover"
            />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
            <span className="text-lg font-medium leading-snug tracking-[-0.01em] sm:text-2xl">Riset lapangan, Malang</span>
            <span className="label hidden text-white/75 sm:block">Agustus 2026</span>
          </figcaption>
        </figure>
      </div>

      {/* Galeri horizontal */}
      <div className="mt-6 sm:mt-8 lg:flex lg:h-[100svh] lg:items-center">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-8 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-1256px)/2))] [&::-webkit-scrollbar]:hidden"
        >
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className="group relative w-[72vw] shrink-0 snap-start overflow-hidden rounded-[22px] bg-paper-2 sm:w-[44vw] lg:w-[min(30vw,400px)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 400px"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
              </div>
              <span className="label absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 text-white backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
            </figure>
          ))}
          <div className="flex w-[60vw] shrink-0 snap-start flex-col justify-end rounded-[22px] bg-brand-900 p-7 text-white sm:w-[36vw] lg:w-[min(26vw,340px)]">
            <p className="text-2xl font-medium leading-snug tracking-[-0.02em]">
              Setiap fitur Stoqin lahir dari obrolan di depan <em className="font-serif font-normal italic">etalase.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
