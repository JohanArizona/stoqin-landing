import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { PlayButton } from "@/components/ui/primitives";
import { playStoreUrl, site } from "@/lib/site";

/**
 * Halaman web untuk App Link `https://stoqin.id/...` (lihat `AppLinks.kt` di aplikasi warung).
 * Kalau aplikasi terpasang, Android membukanya langsung; halaman ini hanya tampil kalau belum
 * terpasang atau link dibuka di desktop.
 */
export function intentUrl(path: string) {
  const clean = path.replace(/^\//, "");
  return `intent://${new URL(site.url).host}/${clean}#Intent;scheme=https;package=${site.androidPackage};S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;
}

export default function AppLinkLanding({
  mascot = "happy",
  eyebrow,
  title,
  children,
  openPath,
  openLabel = "Buka di aplikasi Stoqin",
}: {
  mascot?: "happy" | "thinking" | "listening" | "head";
  eyebrow: string;
  title: string;
  children: ReactNode;
  openPath: string;
  openLabel?: string;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <header className="relative mx-auto flex h-16 w-full max-w-5xl items-center px-4 sm:px-6">
        <Link href="/" aria-label="Stoqin, ke beranda" className="text-ink">
          <Logo className="h-8 w-auto" />
        </Link>
      </header>
      <main className="relative mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
        <Image
          src={`/mascot/${mascot}.webp`}
          alt=""
          width={640}
          height={640}
          priority
          className="animate-rise size-44 sm:size-52"
        />
        <p className="eyebrow mt-6 text-brand-600">{eyebrow}</p>
        <h1 className="display-md mt-3 text-balance">{title}</h1>
        <div className="lead mt-4 text-pretty text-muted">{children}</div>
        <div className="mt-9 flex w-full flex-col items-center gap-3">
          <a
            href={intentUrl(openPath)}
            className="press inline-flex h-14 w-full max-w-xs items-center justify-center rounded-2xl bg-brand-700 font-bold text-white hover:bg-brand-800"
          >
            {openLabel}
          </a>
          <p className="text-sm text-muted">Belum punya aplikasinya?</p>
          <PlayButton />
        </div>
      </main>
      <footer className="relative py-6 text-center text-xs text-subtle">
        <Link href="/" className="hover:text-ink">
          stoqin.id
        </Link>{" "}
        · Aplikasi kasir, stok & kulakan untuk warung
      </footer>
    </div>
  );
}
