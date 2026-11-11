"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Volume2 } from "lucide-react";

const QA = [
  {
    q: "Barang apa yang paling laris minggu ini?",
    a: "Indomie Goreng paling laris, terjual 86 bungkus. Disusul Aqua 600 ml dan kopi sachet.",
  },
  {
    q: "Berapa untung hari ini?",
    a: "Omzet hari ini Rp1.250.000, laba bersih sekitar Rp350.000. Naik 12% dari kemarin.",
  },
  {
    q: "Barang apa yang harus direstok?",
    a: "Minyak goreng sudah habis dan Indomie Goreng sisa 7. Sebaiknya restok dua-duanya hari ini.",
  },
];

type Phase = "listening" | "thinking" | "happy";

export default function AssistantDemo() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("happy");
  const [typed, setTyped] = useState(QA[0].a);
  const [auto, setAuto] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const idxRef = useRef(0);

  const ask = useCallback((i: number) => {
    clear();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    idxRef.current = i;
    setIdx(i);
    if (reduce) {
      setPhase("happy");
      setTyped(QA[i].a);
      return;
    }
    setPhase("listening");
    setTyped("");
    timers.current.push(window.setTimeout(() => setPhase("thinking"), 900));
    timers.current.push(
      window.setTimeout(() => {
        setPhase("happy");
        const full = QA[i].a;
        for (let k = 1; k <= full.length; k++) {
          timers.current.push(window.setTimeout(() => setTyped(full.slice(0, k)), k * 18));
        }
      }, 1900),
    );
  }, []);

  // Putar otomatis hanya saat terlihat, dan berhenti begitu pengunjung memilih sendiri.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visibleRef.current = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (visibleRef.current) ask((idxRef.current + 1) % QA.length);
    }, 7000);
    return () => clearInterval(t);
  }, [auto, ask]);

  useEffect(() => clear, []);

  const pose = phase === "listening" ? "listening" : phase === "thinking" ? "thinking" : "happy";

  return (
    <div ref={rootRef} className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="mx-auto flex w-full max-w-[380px] flex-col items-center gap-4">
      <div className="relative aspect-square w-full">
        <div aria-hidden className="absolute inset-[12%] rounded-full bg-brand-200/60 blur-3xl" />
        {(["listening", "thinking", "happy"] as const).map((p) => (
          <Image
            key={p}
            src={`/mascot/${p}.webp`}
            alt={p === pose ? "Maskot Stoqin, si macan putih berbaju hijau" : ""}
            width={640}
            height={640}
            sizes="(max-width: 1024px) 70vw, 380px"
            className={`absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-500 ease-[var(--ease-spring)] ${
              p === pose ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          />
        ))}
      </div>
        <span className="whitespace-nowrap rounded-full border border-line bg-canvas px-4 py-1.5 text-xs font-semibold text-ink-2" aria-live="polite">
          {phase === "listening" ? "Mendengarkan…" : phase === "thinking" ? "Membaca data warungmu…" : "Siap menjawab"}
        </span>
      </div>

      <div>
        <div className="space-y-3" aria-live="polite">
          <div className="ml-auto w-fit max-w-[85%] rounded-3xl rounded-br-lg bg-ink px-5 py-3.5 text-white">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold text-white/60">
              <Mic className="size-3" aria-hidden /> Kamu
            </p>
            <p className="mt-0.5 font-semibold">{QA[idx].q}</p>
          </div>
          <div className="card w-fit max-w-[92%] rounded-3xl rounded-bl-lg px-5 py-4">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold text-brand-700">
              <Volume2 className="size-3" aria-hidden /> Asisten Stoqin
            </p>
            <p className="mt-1 min-h-[3.2em] text-[1.05rem] leading-relaxed text-ink">
              {phase === "happy" ? typed : <Dots />}
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm font-semibold text-muted">Coba tanya:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {QA.map((x, i) => (
            <button
              key={x.q}
              type="button"
              onClick={() => {
                setAuto(false);
                ask(i);
              }}
              aria-pressed={i === idx}
              className={`press rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors ${
                i === idx ? "bg-brand-600 text-white ring-brand-600" : "bg-white text-ink-2 ring-line-strong hover:bg-brand-50"
              }`}
            >
              {x.q}
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-subtle">Contoh percakapan. Jawaban asli dihitung dari data warungmu sendiri.</p>
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-1 py-2" aria-label="Sedang berpikir">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: `${i * 120}ms` }} />
      ))}
    </span>
  );
}
