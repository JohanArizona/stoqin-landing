import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { PlayButton } from "@/components/ui/primitives";
import { waUrl } from "@/lib/site";

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="reveal-scale relative overflow-hidden rounded-[36px] bg-brand-700 px-6 py-16 text-white sm:px-16 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_10%,rgb(43_184_59/0.9),transparent_60%),radial-gradient(60%_60%_at_0%_100%,rgb(10_26_16/0.7),transparent_70%)]" />
        <div aria-hidden className="dot-grid absolute inset-0 opacity-20 invert" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 id="cta-title" className="display-lg text-balance">
              Bikin warungmu naik kelas, mulai hari ini.
            </h2>
            <p className="lead mt-5 max-w-lg text-white/80">
              Gratis, tanpa kartu kredit, dan tetap jalan tanpa sinyal. Tim kami siap membantu kalau kamu butuh panduan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PlayButton dark={false} />
              <a
                href={waUrl("Halo Stoqin, saya mau dibantu mulai pakai aplikasinya.")}
                target="_blank"
                rel="noopener"
                className="press inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white ring-1 ring-white/30 hover:bg-white/10"
              >
                <MessageCircle className="size-5" aria-hidden /> Chat via WhatsApp
              </a>
            </div>
          </div>
          <Image
            src="/mascot/happy.webp"
            alt="Maskot Stoqin melompat gembira"
            width={640}
            height={640}
            sizes="(max-width: 768px) 60vw, 320px"
            className="mx-auto w-[220px] drop-shadow-[0_30px_40px_rgb(0_0_0/0.25)] md:w-full md:max-w-[320px]"
          />
        </div>
      </div>
    </section>
  );
}
