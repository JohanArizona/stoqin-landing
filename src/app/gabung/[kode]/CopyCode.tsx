"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex gap-1.5" aria-label={`Kode undangan ${code.split("").join(" ")}`}>
        {code.split("").map((c, i) => (
          <span key={i} className="card grid h-14 w-11 place-items-center rounded-2xl text-2xl font-extrabold text-ink" aria-hidden>
            {c}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* clipboard tidak tersedia */
          }
        }}
        className="press inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line-strong"
      >
        {copied ? <Check className="size-4 text-brand-600" /> : <Copy className="size-4" />}
        {copied ? "Tersalin" : "Salin kode"}
      </button>
    </div>
  );
}
