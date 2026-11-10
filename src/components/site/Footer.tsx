import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { playStoreUrl, site, waUrl } from "@/lib/site";

const COLS = [
  {
    title: "Produk",
    links: [
      { href: "/#fitur", label: "Kasir digital" },
      { href: "/#fitur", label: "Manajemen stok" },
      { href: "/#fitur", label: "Buku hutang" },
      { href: "/#kulakan", label: "Kulakan grosir" },
      { href: "/#asisten", label: "Asisten suara AI" },
      { href: "/#harga", label: "Harga" },
    ],
  },
  {
    title: "Ekosistem",
    links: [
      { href: playStoreUrl, label: "Stoqin untuk warung", external: true },
      { href: "/#ekosistem", label: "Stoqin Grosir" },
      { href: "/#ekosistem", label: "Stoqin Kurir" },
      { href: "/#cara-mulai", label: "Cara mulai" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: waUrl(), label: "WhatsApp", external: true },
      { href: `mailto:${site.email}`, label: site.email },
      { href: "/privasi", label: "Kebijakan Privasi" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="inline-flex text-ink" aria-label="Stoqin, ke beranda">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Aplikasi kasir, stok, buku hutang, dan kulakan grosir untuk warung Indonesia.
            </p>
            <p className="mt-4 text-sm text-muted">
              {site.city}, {site.region}
            </p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-sm font-bold text-ink">{c.title}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...("external" in l && l.external ? { target: "_blank", rel: "noopener" } : {})}
                      className="text-sm text-muted transition-colors hover:text-brand-700"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Stoqin · {site.company}
          </p>
          <p>Dibuat di Malang untuk warung Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
