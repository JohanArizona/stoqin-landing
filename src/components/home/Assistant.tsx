import { SectionHead } from "@/components/ui/Chapter";
import AssistantDemo from "./AssistantDemo";

export default function Assistant() {
  return (
    <section id="asisten" aria-labelledby="asisten-title" className="relative overflow-hidden border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHead
          n={6}
          label="Asisten AI · Pro"
          id="asisten-title"
          title={
            <>
              Tanya warungmu. <span className="text-brand-600">Langsung dijawab.</span>
            </>
          }
          lead="Bertanya dengan suara, dijawab dari data warungmu sendiri."
        />
        <div className="mt-14">
          <AssistantDemo />
        </div>
      </div>
    </section>
  );
}
