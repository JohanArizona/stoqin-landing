import { SectionHeading } from "@/components/ui/primitives";
import AssistantDemo from "./AssistantDemo";

export default function Assistant() {
  return (
    <section id="asisten" aria-labelledby="asisten-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(50%_50%_at_30%_50%,#000,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="asisten-title"
          eyebrow="Asisten suara AI · Stoqin Pro"
          title={
            <>
              Tanya warungmu. <span className="text-gradient-brand">Langsung dijawab.</span>
            </>
          }
          lead="Ketuk mikrofon, lalu bertanya seperti ke teman. Asisten Stoqin membaca omzet, stok, dan barang terlaris warungmu, lalu menjawab dengan suara. Ia hanya membaca data — tidak pernah mengubahnya."
        />
        <div className="mt-16">
          <AssistantDemo />
        </div>
      </div>
    </section>
  );
}
