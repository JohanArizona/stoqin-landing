import { ArrowUpRight, Store, TrendingUp, ShoppingCart, Sparkles } from "lucide-react";
import PointerField from "@/components/motion/PointerField";
import Toy from "@/components/motion/Toy";
import WaterBackground from "@/components/motion/WaterBackground";
import { C, Tile, Box, Dot, Ring, Plus } from "@/components/shapes/Shapes";
import { GooglePlayIcon } from "@/components/ui/primitives";
import { playStoreUrl } from "@/lib/site";

const T = "size-[0.8em]"; // ubin mengikuti ukuran huruf

export default function Hero() {
  return (
    <PointerField className="relative">
      <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <WaterBackground />
        <Deco className="left-[4%] top-[20%] size-2.5" depth={-30}>
          <Dot />
        </Deco>
        <Deco className="right-[6%] top-[16%] size-5" depth={40}>
          <Plus color={C.leaf} />
        </Deco>
        <Deco className="left-[2%] top-[46%] hidden size-6 sm:block" depth={24}>
          <Ring color={C.mint} />
        </Deco>
        <Deco className="right-[3%] top-[40%] size-2" depth={-20}>
          <Dot color={C.deep} />
        </Deco>

        <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-8">
          <h1 id="hero-title" className="text-[clamp(2.6rem,7vw,6.6rem)] font-medium leading-[1.04] tracking-[-0.05em] text-ink">
            <span className="flex flex-wrap items-center gap-x-[0.2em]">
              <Line>Kelola Warung</Line>
              <Toy depth={18} delay={420}>
                <Tile icon={Store} tone="leaf" className={`${T} -rotate-6`} />
              </Toy>
              <Toy depth={-14} delay={500} className="hidden sm:inline-block">
                <Tile icon={TrendingUp} tone="mint" className={`${T} rotate-3`} />
              </Toy>
            </span>
            <span className="flex flex-wrap items-center gap-x-[0.2em] md:justify-end">
              <Toy depth={22} delay={560} className="hidden md:inline-block">
                <Tile icon={Sparkles} tone="forest" className={`${T} rotate-6`} />
              </Toy>
              <Line delay={90}>Jadi Mudah,</Line>
            </span>
            <span className="flex flex-wrap items-center gap-x-[0.2em] md:pl-[1.2em]">
              <Line delay={180}>Belanja Stok</Line>
              <Toy depth={-20} delay={640}>
                <Tile icon={ShoppingCart} tone="deep" className={`${T} -rotate-3`} />
              </Toy>
            </span>
            <span className="flex flex-wrap items-center gap-x-[0.2em] md:justify-end">
              <Toy depth={16} delay={720} className="hidden sm:inline-block">
                <Box className="size-[0.86em]" />
              </Toy>
              <Line delay={270}>
                <em className="font-serif font-normal italic tracking-[-0.025em] text-brand-600">Lebih Murah.</em>
              </Line>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-7 sm:mt-14 md:flex-row md:items-center md:justify-between">
            <p className="lead fade-up max-w-md text-pretty text-muted [animation-delay:calc(var(--intro-delay,0s)_+_450ms)]">
              Kasir, stok, hutang, dan kulakan grosir dalam satu aplikasi. Gratis, dan tetap jalan tanpa sinyal.
            </p>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener"
              className="press btn-ring fade-up group inline-flex h-14 w-fit shrink-0 items-center gap-3 px-6 text-[0.95rem] font-semibold text-ink [animation-delay:calc(var(--intro-delay,0s)_+_600ms)]"
            >
              <GooglePlayIcon className="size-5" />
              Unduh gratis di Google Play
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </PointerField>
  );
}

function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.2em] align-middle">
      <span className="line-in inline-block" style={{ animationDelay: `calc(var(--intro-delay, 0s) + ${delay}ms)` }}>
        {children}{" "}
      </span>
    </span>
  );
}

function Deco({ children, className, depth }: { children: React.ReactNode; className: string; depth: number }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ translate: `calc(var(--px, 0) * ${depth}px) calc(var(--py, 0) * ${depth}px)` }}
    >
      <span className="pop-in block size-full [animation-delay:calc(var(--intro-delay,0s)_+_900ms)]">{children}</span>
    </span>
  );
}
