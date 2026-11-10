import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";
import { site, waUrl } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4 text-brand-600">FAQ</p>
          <h2 id="faq-title" className="display-lg text-balance">
            Pertanyaan yang sering ditanyakan.
          </h2>
          <p className="lead mt-5 text-muted">
            Belum ketemu jawabannya?{" "}
            <a href={waUrl("Halo Stoqin, saya mau bertanya.")} target="_blank" rel="noopener" className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600">
              Chat tim kami di WhatsApp
            </a>{" "}
            atau email ke{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600">
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <details key={f.q} className="group" name="faq" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left">
                <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink sm:text-lg">{f.q}</h3>
                <span
                  aria-hidden
                  className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:bg-brand-50"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
