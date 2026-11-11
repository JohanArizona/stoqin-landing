import type { ReactNode } from "react";

/** Label bab: "01 — Kasir digital". */
export function Chapter({ n, children, tone = "light" }: { n: number; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`label flex items-center gap-3 ${tone === "dark" ? "text-white/60" : "text-muted"}`}>
      <span aria-hidden className="inline-block size-2 rounded-full bg-leaf" />
      <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
      <span aria-hidden className={`h-px w-6 ${tone === "dark" ? "bg-white/30" : "bg-ink/20"}`} />
      <span>{children}</span>
    </p>
  );
}

/** Judul bagian standar: label bab + judul besar + kalimat pendek. */
export function SectionHead({
  n,
  label,
  title,
  lead,
  id,
  tone = "light",
}: {
  n: number;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-3xl">
      <Chapter n={n} tone={tone}>
        {label}
      </Chapter>
      <h2 id={id} className={`display-lg mt-6 text-balance ${tone === "dark" ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead ? <p className={`lead mt-5 max-w-xl text-pretty ${tone === "dark" ? "text-white/65" : "text-muted"}`}>{lead}</p> : null}
    </div>
  );
}
