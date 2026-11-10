import Image from "next/image";
import { CloudOff, PackageCheck, Truck, ArrowRight, Check } from "lucide-react";
import { PlayButton } from "@/components/ui/primitives";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[720px] [mask-image:radial-gradient(60%_60%_at_50%_20%,#000,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <a
          href="#asisten"
          className="animate-rise press glass mx-auto inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink-2"
        >
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">Baru</span>
          Asisten suara AI untuk warung
          <ArrowRight className="size-3.5" aria-hidden />
        </a>

        <h1 id="hero-title" className="display-xl mx-auto mt-7 max-w-4xl text-balance">
          Warung rapi. <span className="text-gradient-brand">Kulakan hemat.</span>
        </h1>

        <p className="lead animate-rise mx-auto mt-6 max-w-2xl text-pretty text-muted [animation-delay:80ms]">
          Stoqin adalah aplikasi kasir, stok, buku hutang, dan kulakan grosir untuk warung Indonesia.
          Cukup satu HP Android, <strong className="font-semibold text-ink">tetap jalan tanpa sinyal</strong>, dan gratis untuk dimulai.
        </p>

        <div className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 [animation-delay:160ms] sm:flex-row">
          <PlayButton />
          <a
            href="#fitur"
            className="press inline-flex h-14 items-center gap-2 rounded-2xl px-6 font-semibold text-ink hover:bg-ink/5"
          >
            Lihat fiturnya <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="animate-rise mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted [animation-delay:220ms]">
          {["Gratis selamanya untuk kasir & stok", "Bisa offline", "Data dilindungi UU PDP"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-4 text-brand-500" aria-hidden strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual produk */}
      <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:mt-20 sm:px-6">
        <div className="animate-rise relative mx-auto aspect-[1200/1100] w-full max-w-[780px] [animation-delay:200ms]">
          <div aria-hidden className="absolute inset-x-[12%] bottom-[6%] top-[18%] rounded-[50%] bg-brand-400/25 blur-3xl" />
          <Image
            src="/app-home.webp"
            alt="Dashboard aplikasi Stoqin: omzet hari ini, laba bersih, pengingat restok, buku hutang, dan kulakan barang"
            width={1200}
            height={1504}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 78vw, 520px"
            className="absolute left-1/2 top-0 w-[68%] -translate-x-1/2 drop-shadow-[0_40px_60px_rgb(12_24_16/0.25)] sm:w-[60%]"
          />

          {/* Kartu melayang: menjelaskan tiga janji utama */}
          <FloatCard
            className="left-0 top-[34%] sm:left-[2%]"
            icon={<CloudOff className="size-4" aria-hidden />}
            iconClass="bg-honey-soft text-[#8a6500]"
            label="Sinyal hilang"
            title="Transaksi tetap tersimpan"
            sub="Terkirim otomatis saat online"
            delay="500ms"
          />
          <FloatCard
            className="right-0 top-[10%] sm:right-[2%]"
            icon={<PackageCheck className="size-4" aria-hidden />}
            iconClass="bg-brand-100 text-brand-700"
            label="Pengingat restok"
            title="Indomie Goreng sisa 7"
            sub="Restok sekali ketuk"
            delay="650ms"
          />
          <FloatCard
            className="bottom-[16%] right-[4%] sm:right-[8%]"
            icon={<Truck className="size-4" aria-hidden />}
            iconClass="bg-ink text-white"
            label="Kulakan"
            title="Kurir menuju warungmu"
            sub="Lacak langsung di peta"
            delay="800ms"
          />
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  className,
  icon,
  iconClass,
  label,
  title,
  sub,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  title: string;
  sub: string;
  delay: string;
}) {
  return (
    <div
      className={`glass animate-rise absolute hidden w-[230px] rounded-2xl p-3.5 text-left sm:block ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-2">
        <span className={`grid size-7 place-items-center rounded-lg ${iconClass}`}>{icon}</span>
        <span className="text-xs font-semibold text-muted">{label}</span>
      </div>
      <p className="mt-2 text-[0.95rem] font-bold tracking-tight text-ink">{title}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}
