import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";
import { site, waUrl } from "@/lib/site";
import { Chapter } from "@/components/ui/Chapter";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-canvas py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Chapter n={9}>FAQ</Chapter>
          <h2 id="faq-title" className="display-lg mt-6 text-balance">
            Yang sering ditanyakan.
          </h2>
          <p className="lead mt-5 text-muted">
            Belum ketemu jawabannya?{" "}
            <a href={waUrl("Halo Stoqin, saya mau bertanya.")} target="_blank" rel="noopener" className="font-medium text-ink underline decoration-brand-300 decoration-2 underline-offset-4 hover:decoration-ink">
              Chat di WhatsApp
            </a>{" "}
            atau email{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-ink underline decoration-brand-300 decoration-2 underline-offset-4 hover:decoration-ink">
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-line" name="faq" open={i === 0}>
              <summary className="flex cursor-pointer items-center gap-5 py-6 text-left">
                <span className="label w-6 shrink-0 tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="flex-1 text-[1.05rem] font-medium tracking-[-0.015em] text-ink transition-colors group-hover:text-brand-700 sm:text-[1.15rem]">
                  {f.q}
                </h3>
                <span
                  aria-hidden
                  className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-all duration-500 ease-[var(--ease-out-expo)]"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pl-11 pr-12 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
