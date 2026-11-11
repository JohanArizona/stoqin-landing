import { ArrowUpRight, MessageCircle } from "lucide-react";
import Logo3D from "@/components/motion/Logo3D";
import { Chapter } from "@/components/ui/Chapter";
import { GooglePlayIcon } from "@/components/ui/primitives";
import { C, Plus, Dot, Ring } from "@/components/shapes/Shapes";
import { playStoreUrl, waUrl } from "@/lib/site";

const BITS = [
  { el: <Plus color={C.leaf} />, cls: "left-[6%] top-[10%] size-5" },
  { el: <Dot color={C.deep} />, cls: "right-[8%] top-[16%] size-2.5" },
  { el: <Ring color={C.mint} />, cls: "right-[4%] bottom-[18%] size-8" },
  { el: <Dot color={C.leaf} />, cls: "left-[12%] bottom-[14%] size-2" },
];

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          <Chapter n={10}>Mulai sekarang</Chapter>
          <h2 id="cta-title" className="display-xl mt-6 text-balance">
            Warungmu, <em className="font-serif font-normal italic tracking-[-0.02em] text-brand-600">naik kelas.</em>
          </h2>
          <p className="lead mt-6 max-w-md text-muted">Gratis, tanpa kartu kredit, langsung bisa dipakai.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener"
              className="press group inline-flex h-14 w-fit items-center gap-3 rounded-full bg-ink px-6 font-semibold text-white hover:bg-brand-800"
            >
              <GooglePlayIcon className="size-5" />
              Unduh gratis
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href={waUrl("Halo Stoqin, saya mau dibantu mulai pakai aplikasinya.")}
              target="_blank"
              rel="noopener"
              className="press inline-flex h-14 w-fit items-center gap-2 rounded-full px-5 font-semibold text-ink hover:bg-ink/5"
            >
              <MessageCircle className="size-5" aria-hidden /> Tanya lewat WhatsApp
            </a>
          </div>
        </div>

        <div className="relative">
          {BITS.map((b, i) => (
            <span key={i} aria-hidden className={`reveal absolute ${b.cls}`}>
              {b.el}
            </span>
          ))}
          <Logo3D className="mx-auto aspect-square w-full max-w-[480px]" />
          <p className="label mt-2 text-center text-subtle">Seret untuk memutar</p>
        </div>
      </div>
    </section>
  );
}
