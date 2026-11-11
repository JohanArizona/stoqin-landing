"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Minus, Plus, ScanBarcode, Check } from "lucide-react";

type Item = { id: string; name: string; price: number; tone: string };

const ITEMS: Item[] = [
  { id: "indomie", name: "Indomie Goreng", price: 3500, tone: "bg-[#fde7e3]" },
  { id: "aqua", name: "Aqua 600 ml", price: 4000, tone: "bg-[#e3f1fd]" },
  { id: "kopi", name: "Kopi Sachet", price: 1500, tone: "bg-[#f3e9df]" },
  { id: "gula", name: "Gula Pasir 1 kg", price: 18000, tone: "bg-[#f1f3f0]" },
];
const METHODS = ["Tunai", "QRIS", "Transfer", "Hutang"] as const;
const VOICE = "dua Indomie goreng, satu Aqua";

const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

/** Angka yang "berhitung" ke nilai baru, selalu mulai dari nilai yang sedang tampil (bisa diinterupsi). */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const valueRef = useRef(target);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fromRef.current = valueRef.current;
    const start = performance.now();
    const dur = reduce ? 0 : 420;
    let raf = 0;
    const tick = (t: number) => {
      const p = dur === 0 ? 1 : Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      const v = Math.round(fromRef.current + (target - fromRef.current) * e);
      valueRef.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

export default function MiniCashier({ bare = false }: { bare?: boolean }) {
  const [cart, setCart] = useState<Record<string, number>>({ indomie: 1 });
  const [method, setMethod] = useState<(typeof METHODS)[number]>("Tunai");
  const [paid, setPaid] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const total = ITEMS.reduce((s, it) => s + (cart[it.id] ?? 0) * it.price, 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const shown = useCountUp(total);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const add = (id: string, d: number) => {
    setPaid(false);
    setCart((c) => {
      const n = Math.max(0, (c[id] ?? 0) + d);
      const next = { ...c, [id]: n };
      if (n === 0) delete next[id];
      return next;
    });
  };

  const voice = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPaid(false);
    setCart({});
    setTranscript("");
    VOICE.split("").forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setTranscript(VOICE.slice(0, i + 1)), 30 * i));
    });
    const end = 30 * VOICE.length + 250;
    timers.current.push(window.setTimeout(() => setCart({ indomie: 2 }), end));
    timers.current.push(window.setTimeout(() => setCart({ indomie: 2, aqua: 1 }), end + 220));
    timers.current.push(window.setTimeout(() => setTranscript(null), end + 2200));
  };

  const pay = () => {
    if (!count) return;
    setPaid(true);
    timers.current.push(
      window.setTimeout(() => {
        setPaid(false);
        setCart({});
      }, 2400),
    );
  };

  return (
    <div
      className={
        bare
          ? "relative w-full select-none px-3"
          : "relative mx-auto w-full max-w-[360px] select-none rounded-[32px] bg-paper p-3 shadow-[0_0_0_1px_rgb(12_24_16/0.06),0_30px_60px_-30px_rgb(12_24_16/0.35)]"
      }
    >
      <div className="flex items-center justify-between px-2 pb-3 pt-1">
        <p className="text-sm font-bold text-ink">Kasir</p>
        <div className="flex gap-1.5">
          <span className="grid size-8 place-items-center rounded-full bg-white text-ink-2 shadow-sm" aria-hidden>
            <ScanBarcode className="size-4" />
          </span>
          <button
            type="button"
            onClick={voice}
            className="press grid size-8 place-items-center rounded-full bg-brand-600 text-white shadow-sm hover:bg-brand-700"
            aria-label="Coba kasir suara: ucapkan dua Indomie goreng, satu Aqua"
          >
            <Mic className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <ul className="space-y-1.5" aria-label="Daftar barang">
          {ITEMS.map((it) => {
            const q = cart[it.id] ?? 0;
            return (
              <li key={it.id} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-[0_1px_2px_rgb(12_24_16/0.05)]">
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-[0.65rem] font-bold text-ink-2 ${it.tone}`} aria-hidden>
                  {it.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">{it.name}</span>
                  <span className="block text-xs text-muted">{fmt(it.price)}</span>
                </span>
                {q > 0 ? (
                  <span className="flex items-center gap-1">
                    <button type="button" onClick={() => add(it.id, -1)} className="press grid size-7 place-items-center rounded-full bg-paper text-ink" aria-label={`Kurangi ${it.name}`}>
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold tabular-nums" aria-live="polite">{q}</span>
                    <button type="button" onClick={() => add(it.id, 1)} className="press grid size-7 place-items-center rounded-full bg-brand-600 text-white" aria-label={`Tambah ${it.name}`}>
                      <Plus className="size-3.5" />
                    </button>
                  </span>
                ) : (
                  <button type="button" onClick={() => add(it.id, 1)} className="press rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100" aria-label={`Tambah ${it.name}`}>
                    Tambah
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {/* Transkrip kasir suara */}
        <div
          aria-live="polite"
          className={`glass absolute inset-x-2 top-2 rounded-2xl px-4 py-3 transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)] ${
            transcript !== null ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <p className="flex items-center gap-2 text-xs font-semibold text-brand-700">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
            </span>
            Mendengarkan…
          </p>
          <p className="mt-1 min-h-6 text-[0.95rem] font-semibold text-ink">“{transcript}”</p>
        </div>
      </div>

      <div className="mt-3 flex gap-1 rounded-full bg-white p-1" role="radiogroup" aria-label="Metode pembayaran">
        {METHODS.map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={method === m}
            onClick={() => setMethod(m)}
            className={`press flex-1 rounded-full py-1.5 text-xs font-semibold transition-colors ${
              method === m ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={pay}
        disabled={!count}
        className={`press mt-3 flex h-14 w-full items-center justify-between rounded-2xl px-5 text-white transition-colors disabled:opacity-50 ${
          paid ? "bg-brand-500" : "bg-brand-700 hover:bg-brand-800"
        }`}
      >
        {paid ? (
          <span className="flex w-full items-center justify-center gap-2 font-bold">
            <Check className="size-5" strokeWidth={3} /> Lunas · struk siap dicetak
          </span>
        ) : (
          <>
            <span className="text-sm font-semibold">
              Bayar {method} {count ? `· ${count} barang` : ""}
            </span>
            <span className="text-lg font-extrabold tabular-nums tracking-tight">{fmt(shown)}</span>
          </>
        )}
      </button>
    </div>
  );
}
