"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Copy, Check, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { navLinks, playStoreUrl, site, waUrl } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (!open) {
      lenis?.start();
      return;
    }
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    const hash = href.split("#")[1];
    const target = hash ? document.getElementById(hash) : null;
    setOpen(false);
    if (!target) return;
    e.preventDefault();
    // Tunggu tirai menutup & scroll dibuka lagi, lalu meluncur ke bagian tujuan.
    window.setTimeout(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo(t: Element, o?: object): void } }).__lenis;
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${hash}`);
    }, 60);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-10 border-b transition-[background-color,border-color] duration-300 ${
          scrolled && !open ? "border-line bg-paper/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:px-8">
          <Link href="/" onClick={() => setOpen(false)} className="press -m-2 flex items-center rounded-xl p-2 text-ink" aria-label="Stoqin, ke beranda">
            <Logo className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener"
              className="press hidden h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-white hover:bg-brand-800 sm:inline-flex"
            >
              Unduh gratis
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="press flex h-10 items-center gap-3 rounded-full px-3 text-ink hover:bg-ink/5"
            >
              <span className="label text-ink">{open ? "Tutup" : "Menu"}</span>
              <span className="relative block h-2.5 w-5" aria-hidden>
                <span
                  className={`absolute right-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "top-[4px] w-5 rotate-45" : "top-0 w-5"
                  }`}
                />
                <span
                  className={`absolute right-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "top-[4px] w-5 -rotate-45" : "top-[9px] w-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay menu: selalu pas satu layar (ukuran mengikuti tinggi layar, tanpa scroll) */}
      <div
        id="site-menu"
        inert={!open}
        className={`fixed inset-x-0 top-0 h-[100svh] overflow-hidden bg-paper transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1320px] flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16 sm:px-8 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pb-10">
          <ul className="flex min-h-0 flex-1 flex-col justify-center py-[2vh] [@media(max-height:520px)]:grid [@media(max-height:520px)]:grid-cols-2 [@media(max-height:520px)]:content-center [@media(max-height:520px)]:gap-x-10">
            {navLinks.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-line">
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="group flex items-center gap-4 py-[clamp(0.35rem,1.2vh,1rem)] sm:gap-5"
                  style={{
                    transform: open ? "none" : "translateY(110%)",
                    transition: `transform 900ms var(--ease-out-expo) ${open ? 150 + i * 55 : 0}ms`,
                  }}
                >
                  <span className="label w-7 shrink-0 tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[clamp(1.4rem,min(5.2vw,6.2vh),4rem)] font-medium [@media(max-height:520px)]:text-[1.3rem] leading-[1.12] tracking-[-0.045em] text-ink transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-brand-600">
                    {l.label}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="ml-auto size-5 shrink-0 -translate-x-2 text-brand-600 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:size-6"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div
            className="flex shrink-0 flex-col gap-[clamp(0.75rem,2.2vh,1.75rem)] pt-4 text-sm lg:justify-center lg:pt-0"
            style={{ opacity: open ? 1 : 0, transition: `opacity 600ms ease ${open ? 450 : 0}ms` }}
          >
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener"
              className="press btn-ring inline-flex h-12 w-fit items-center gap-2 px-6 text-[0.95rem] font-semibold text-ink lg:h-14 lg:px-7 lg:text-base"
            >
              Unduh Stoqin gratis <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2">
                <a href={`mailto:${site.email}`} className="font-medium text-ink hover:text-brand-700 lg:text-lg">
                  {site.email}
                </a>
                <button
                  type="button"
                  className="press grid size-7 place-items-center rounded-full bg-paper-2 text-ink"
                  aria-label="Salin alamat email"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(site.email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1600);
                    } catch {}
                  }}
                >
                  {copied ? <Check className="size-3.5 text-brand-600" /> : <Copy className="size-3.5" />}
                </button>
              </span>
              <a
                href={waUrl("Halo Stoqin, saya mau bertanya.")}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 font-medium text-ink hover:text-brand-700 lg:text-lg"
              >
                <MessageCircle className="size-4" aria-hidden /> Chat WhatsApp
              </a>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-3 text-muted lg:pt-5">
              <span className="label">{site.city}, Indonesia</span>
              <Link href="/privasi" onClick={() => setOpen(false)} className="label hover:text-ink">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
