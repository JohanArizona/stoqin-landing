"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { navLinks, playStoreUrl } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-white/75 shadow-[0_1px_0_rgb(12_24_16/0.08)] backdrop-blur-xl backdrop-saturate-180"
            : "bg-transparent"
        }`}
      >
        <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="press -m-2 flex items-center rounded-xl p-2 text-ink" aria-label="Stoqin, ke beranda">
            <Logo className="h-8 w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener"
              className="press hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 sm:inline-flex"
            >
              Unduh Gratis
            </a>
            <button
              type="button"
              className="press grid size-10 place-items-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                    open ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                    open ? "top-[5px] -rotate-45" : "top-[10px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet: turun dari bar (arah masuk = arah keluar) */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 origin-top bg-white/90 backdrop-blur-2xl transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)] ${
          open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        inert={!open}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 pt-4 sm:px-6">
          {navLinks.map((l, i) => (
            <li
              key={l.href}
              className="border-b border-line transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)]"
              style={{
                transitionDelay: open ? `${60 + i * 35}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(-8px)",
              }}
            >
              <a href={l.href} onClick={() => setOpen(false)} className="block py-4 text-2xl font-bold tracking-tight text-ink">
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener"
              className="press flex h-14 items-center justify-center rounded-2xl bg-ink text-base font-semibold text-white"
            >
              Unduh Stoqin Gratis
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
