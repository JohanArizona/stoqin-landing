import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ClickBurst from "@/components/motion/ClickBurst";
import { Device } from "@/components/ui/Device";
import { Chapter } from "@/components/ui/Chapter";
import { GooglePlayIcon } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { FEATURES, featureBySlug } from "@/lib/features";
import { playStoreUrl, site } from "@/lib/site";

type Props = { params: Promise<{ fitur: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((f) => ({ fitur: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = featureBySlug((await params).fitur);
  if (!f) return {};
  return {
    title: { absolute: `${f.title} · Stoqin` },
    description: f.description,
    alternates: { canonical: `/${f.slug}` },
    openGraph: { title: `${f.title} · Stoqin`, description: f.description, url: `${site.url}/${f.slug}`, type: "website" },
  };
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[name] ?? Icons.Sparkles;
  return <C className={className} strokeWidth={2} />;
};

export default async function FeaturePage({ params }: Props) {
  const f = featureBySlug((await params).fitur);
  if (!f) notFound();
  const others = FEATURES.filter((x) => x.slug !== f.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stoqin", item: site.url },
          { "@type": "ListItem", position: 2, name: f.label, item: `${site.url}/${f.slug}` },
        ],
      },
      {
        "@type": "WebPage",
        url: `${site.url}/${f.slug}`,
        name: f.title,
        description: f.description,
        inLanguage: "id-ID",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#app` },
      },
      {
        "@type": "FAQPage",
        mainEntity: f.faqs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SmoothScroll />
      <ClickBurst />
      <Navbar />
      <main>
        {/* Hero fitur */}
        <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_20%,#000,transparent)]" />
          <div className="relative mx-auto max-w-[1320px] px-4 sm:px-8">
            <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-subtle">
              <Link href="/" className="hover:text-ink">
                Stoqin
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">{f.label}</span>
            </nav>
            <h1 className="display-xl mt-8 max-w-5xl text-balance">
              {f.h1} <em className="font-serif font-normal italic tracking-[-0.02em] text-brand-600">{f.accent}</em>
            </h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="lead max-w-xl text-pretty text-muted">{f.lead}</p>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="press btn-ring group inline-flex h-14 w-fit shrink-0 items-center gap-3 px-6 text-[0.95rem] font-semibold text-ink"
              >
                <GooglePlayIcon className="size-5" />
                Unduh gratis
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>

            {/* Tiga layar asli */}
            <div className="relative mt-16 flex items-end justify-center gap-3 sm:mt-20 sm:gap-6">
              <div aria-hidden className="absolute inset-x-[10%] bottom-0 top-[20%] rounded-[48px] bg-brand-100" />
              <Device screen={f.screens[1]} className="reveal relative hidden w-[220px] -rotate-3 sm:block lg:w-[250px]" sizes="250px" />
              <Device screen={f.screens[0]} className="reveal relative z-10 w-[230px] sm:w-[270px] lg:w-[300px]" priority sizes="300px" />
              <Device screen={f.screens[2]} className="reveal relative hidden w-[220px] rotate-3 sm:block lg:w-[250px]" sizes="250px" />
            </div>
          </div>
        </section>

        {/* Manfaat */}
        <section aria-labelledby="manfaat-title" className="border-t border-line bg-canvas py-24 sm:py-32">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
            <Chapter n={1}>{f.label}</Chapter>
            <h2 id="manfaat-title" className="display-lg mt-6 max-w-3xl text-balance">
              Yang kamu dapat.
            </h2>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {f.points.map((p) => (
                <li key={p.title} className="reveal bg-canvas p-7 sm:p-8">
                  <span aria-hidden className="grid size-11 place-items-center rounded-[24%] bg-leaf text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.12)]">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ khusus */}
        <section aria-labelledby="faq-fitur-title" className="border-t border-line bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Chapter n={2}>Pertanyaan</Chapter>
              <h2 id="faq-fitur-title" className="display-lg mt-6">
                Sering ditanyakan.
              </h2>
            </div>
            <div className="border-t border-line">
              {f.faqs.map((x, i) => (
                <details key={x.q} className="group border-b border-line" name="faq-fitur" open={i === 0}>
                  <summary className="flex cursor-pointer items-center gap-5 py-6 text-left">
                    <h3 className="flex-1 text-[1.05rem] font-medium tracking-[-0.015em] text-ink sm:text-[1.15rem]">{x.q}</h3>
                    <span aria-hidden className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-all duration-500">
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-muted">{x.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Fitur lain */}
        <section aria-labelledby="lainnya-title" className="border-t border-line bg-canvas py-24 sm:py-28">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
            <h2 id="lainnya-title" className="display-md">Fitur Stoqin lainnya</h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="group flex h-full flex-col justify-between gap-10 rounded-[22px] border border-line bg-paper p-6 transition-colors hover:border-leaf"
                  >
                    <span className="label text-subtle">{o.label}</span>
                    <span className="flex items-end justify-between gap-3">
                      <span className="text-xl font-medium leading-tight tracking-[-0.02em] text-ink">{o.title.split(":")[0]}</span>
                      <ArrowRight className="size-5 shrink-0 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
