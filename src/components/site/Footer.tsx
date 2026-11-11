import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { playStoreUrl, site, waUrl } from "@/lib/site";

const COLS = [
  {
    title: "Produk",
    links: [
      { href: "/kasir", label: "Aplikasi kasir" },
      { href: "/stok", label: "Manajemen stok" },
      { href: "/buku-hutang", label: "Buku hutang" },
      { href: "/kulakan", label: "Kulakan grosir" },
      { href: "/laporan", label: "Laporan & laba" },
      { href: "/#harga", label: "Harga" },
    ],
  },
  {
    title: "Ekosistem",
    links: [
      { href: playStoreUrl, label: "Stoqin untuk warung", external: true },
      { href: "/#ekosistem", label: "Stoqin Grosir" },
      { href: "/#ekosistem", label: "Stoqin Kurir" },
      { href: "/#cara-kerja", label: "Cara kerja" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: waUrl(), label: "WhatsApp", external: true },
      { href: `mailto:${site.email}`, label: "Email" },
      { href: "/privasi", label: "Kebijakan Privasi" },
    ],
  },
];

export default function Footer() {
  const band = Array.from({ length: 3 });
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1320px] px-4 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="inline-flex text-ink" aria-label="Stoqin, ke beranda">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Aplikasi kasir, stok, buku hutang, dan kulakan grosir untuk warung Indonesia.
            </p>
            <p className="label mt-6 text-subtle">
              {site.city}, {site.region}
            </p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="label text-subtle">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...("external" in l && l.external ? { target: "_blank", rel: "noopener" } : {})}
                      className="text-sm text-ink-2 transition-colors hover:text-brand-700"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Pita marquee: moto Stoqin */}
      <div className="mt-16 overflow-hidden border-y border-line py-6" aria-hidden>
        <div className="marquee-slow flex w-max items-center">
          {[...band, ...band].map((_, i) => (
            <span key={i} className="flex items-center">
              <span className="text-outline px-8 text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.05em]">
                Kelola Warung Jadi Mudah
              </span>
              <LogoMark className="h-[clamp(2rem,5vw,4.5rem)] w-auto" />
              <span className="px-8 text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.05em] text-brand-600">
                Belanja Stok Lebih Murah
              </span>
              <LogoMark className="h-[clamp(2rem,5vw,4.5rem)] w-auto" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-6 text-xs text-subtle sm:px-8">
        <p>
          © {new Date().getFullYear()} Stoqin · {site.company}
        </p>
        <a href="#" aria-label="Kembali ke atas" className="press grid size-10 place-items-center rounded-full bg-ink text-white hover:bg-brand-800">
          <ArrowUp className="size-4" />
        </a>
      </div>
    </footer>
  );
}
