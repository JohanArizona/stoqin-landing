import { CloudOff, RefreshCw, Search, TrendingUp, Wallet, BookOpen, Check, Clock } from "lucide-react";

/** Rangka HP sederhana (CSS) dengan dynamic island. */
export function Phone({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={style} className={`relative rounded-[2.9rem] bg-ink p-[9px] shadow-[0_50px_100px_-40px_rgb(15_26_20/0.55),inset_0_0_0_1.5px_rgb(255_255_255/0.08)] ${className}`}>
      <div className="relative h-full overflow-hidden rounded-[2.35rem] bg-paper">
        <div aria-hidden className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" />
        <div aria-hidden className="flex h-10 items-center justify-between px-7 pt-1 text-[11px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] border border-ink/70" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function TopBar({ title }: { title: string }) {
  return <p className="px-4 pb-3 pt-1 text-center text-[13px] font-semibold text-ink">{title}</p>;
}

export function StockScreen() {
  const rows = [
    { n: "Indomie Goreng", s: 7, tag: "Menipis", c: "bg-honey-soft text-[#8a6500]" },
    { n: "Minyak Goreng 1 L", s: 0, tag: "Habis", c: "bg-[#fde8e8] text-alert" },
    { n: "Aqua 600 ml", s: 32 },
    { n: "Gula Pasir 1 kg", s: 18 },
    { n: "Kopi Sachet", s: 4, tag: "Menipis", c: "bg-honey-soft text-[#8a6500]" },
    { n: "Telur 1 kg", s: 12 },
  ];
  return (
    <div className="px-3">
      <TopBar title="Manajemen Stok" />
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[11px] text-subtle">
        <Search className="size-3.5" /> Cari barang…
      </div>
      <div className="mt-2.5 flex gap-1.5 text-[10px] font-semibold">
        <span className="rounded-full bg-ink px-2.5 py-1 text-white">Semua</span>
        <span className="rounded-full bg-white px-2.5 py-1 text-muted">Menipis</span>
        <span className="rounded-full bg-white px-2.5 py-1 text-muted">Habis</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-[9px] font-bold text-brand-700">{r.n.slice(0, 2).toUpperCase()}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-semibold text-ink">{r.n}</span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted">
                Stok {r.s}
                {r.tag ? <span className={`rounded-full px-1.5 py-px text-[9px] font-bold ${r.c}`}>{r.tag}</span> : null}
              </span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-brand-700 px-2 py-1 text-[9px] font-bold text-white">
              <RefreshCw className="size-2.5" /> Restok
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DebtScreen() {
  const rows = [
    { n: "Bu Sri", d: "3 hari lalu · Gula, Telur", a: "Rp45.000" },
    { n: "Pak Joko", d: "5 hari lalu · Rokok, Kopi", a: "Rp32.500" },
    { n: "Mbak Rina", d: "1 minggu lalu · Beras 5 kg", a: "Rp68.000" },
    { n: "Mas Dodi", d: "Kemarin · Mi instan", a: "Rp14.000", paid: true },
  ];
  return (
    <div className="px-3">
      <TopBar title="Buku Hutang" />
      <div className="relative overflow-hidden rounded-2xl bg-honey p-4 text-ink">
        <BookOpen className="absolute -right-3 -top-3 size-20 text-white/30" strokeWidth={1.5} />
        <p className="text-[10px] font-semibold text-[#5c4300]">Total hutang belum lunas</p>
        <p className="mt-1 text-[22px] font-extrabold tracking-tight">Rp145.500</p>
        <p className="text-[10px] text-[#5c4300]">3 pelanggan</p>
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-paper-2 text-[10px] font-bold text-ink-2">{r.n.split(" ")[1]?.[0] ?? r.n[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-ink">{r.n}</span>
              <span className="block truncate text-[10px] text-muted">{r.d}</span>
            </span>
            {r.paid ? (
              <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold text-brand-700">
                <Check className="size-2.5" /> Lunas
              </span>
            ) : (
              <span className="text-[11px] font-bold tabular-nums text-ink">{r.a}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OfflineScreen() {
  const rows = [
    { t: "Penjualan #0128", s: "Tunai · 14:02", a: "+Rp23.500", p: true },
    { t: "Penjualan #0127", s: "Hutang · Bu Sri · 13:47", a: "+Rp12.000", p: true },
    { t: "Penjualan #0126", s: "Tunai · 13:30", a: "+Rp8.000", p: true },
    { t: "Penjualan #0125", s: "QRIS · 12:10", a: "+Rp41.000" },
  ];
  return (
    <div className="px-3">
      <div className="-mx-3 mb-3 flex items-center gap-2 bg-honey px-4 py-2.5 text-[10.5px] font-semibold text-[#2b2000]">
        <CloudOff className="size-3.5 shrink-0" />
        <span className="flex-1">3 data menunggu dikirim</span>
        <span className="underline underline-offset-2">Kirim</span>
      </div>
      <TopBar title="Riwayat Transaksi" />
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.t} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5">
            <span className={`grid size-8 place-items-center rounded-full ${r.p ? "bg-honey-soft text-[#8a6500]" : "bg-brand-50 text-brand-700"}`}>
              {r.p ? <Clock className="size-3.5" /> : <Check className="size-3.5" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-ink">{r.t}</span>
              <span className="block truncate text-[10px] text-muted">{r.s}</span>
            </span>
            <span className="text-[11px] font-bold tabular-nums text-brand-700">{r.a}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[10px] text-subtle">Tersimpan di HP · terkirim otomatis saat online</p>
    </div>
  );
}

export function ReportScreen() {
  const data = [42, 51, 47, 64, 59, 78, 91];
  const W = 260,
    H = 110;
  const step = W / data.length;
  const pts = data.map((v, i) => [step * i + step / 2, H - (v / 100) * H] as const);
  const line = pts
    .map(([x, y], i) => {
      if (!i) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
    })
    .join(" ");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <div className="px-3">
      <TopBar title="Laporan" />
      <div className="rounded-2xl bg-brand-900 p-4 text-white">
        <div className="flex gap-1 text-[9px] font-semibold">
          <span className="rounded-full bg-leaf px-2 py-0.5">Hari Ini</span>
          <span className="rounded-full px-2 py-0.5 text-white/60">7 Hari</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="flex items-center gap-1 text-[10px] text-white/60">
              <TrendingUp className="size-3" /> Omzet
            </p>
            <p className="text-[15px] font-extrabold">Rp1.250.000</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-[10px] text-white/60">
              <Wallet className="size-3" /> Laba bersih
            </p>
            <p className="text-[15px] font-extrabold">Rp350.000</p>
          </div>
        </div>
      </div>
      <div className="mt-2.5 rounded-2xl bg-white p-3">
        <p className="text-[10px] font-semibold text-muted">Omzet 7 hari</p>
        <svg viewBox={`0 -8 ${W} ${H + 16}`} className="mt-1 w-full">
          <defs>
            <linearGradient id="ph-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#00680C" stopOpacity="0.18" />
              <stop offset="1" stopColor="#00680C" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={`${line} L ${lx} ${H} L ${pts[0][0]} ${H} Z`} fill="url(#ph-fill)" />
          <path d={line} fill="none" stroke="#00680C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={lx} cy={ly} r="8" fill="#00680C" opacity="0.15" />
          <circle cx={lx} cy={ly} r="4" fill="#00680C" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
      <div className="mt-2.5 rounded-2xl bg-white p-3">
        <p className="text-[10px] font-semibold text-muted">Terlaris minggu ini</p>
        {[
          ["Indomie Goreng", "86"],
          ["Aqua 600 ml", "54"],
          ["Kopi Sachet", "47"],
        ].map(([n, q], i) => (
          <div key={n} className="mt-2 flex items-center gap-2 text-[11px]">
            <span className="w-3 text-subtle">{i + 1}</span>
            <span className="flex-1 font-semibold text-ink">{n}</span>
            <span className="tabular-nums text-muted">{q} terjual</span>
          </div>
        ))}
      </div>
    </div>
  );
}
