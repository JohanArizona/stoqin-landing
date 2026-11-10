import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <Link href="/" aria-label="Stoqin, ke beranda" className="absolute left-4 top-4 text-ink sm:left-6">
        <Logo className="h-8 w-auto" />
      </Link>
      <Image src="/mascot/sad.webp" alt="" width={640} height={640} className="relative size-44" priority />
      <p className="eyebrow relative mt-6 text-brand-600">404</p>
      <h1 className="display-md relative mt-2">Halaman ini tidak ditemukan.</h1>
      <p className="relative mt-3 max-w-md text-muted">Mungkin link-nya salah ketik atau halamannya sudah dipindah.</p>
      <Link href="/" className="press relative mt-8 inline-flex h-12 items-center rounded-2xl bg-ink px-6 font-semibold text-white hover:bg-brand-900">
        Kembali ke beranda
      </Link>
    </div>
  );
}
