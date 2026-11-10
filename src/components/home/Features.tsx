import {
  ScanBarcode,
  Mic,
  QrCode,
  Printer,
  BadgePercent,
  CloudOff,
  BookOpen,
  Users,
  ShieldCheck,
  Search,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import MiniCashier from "./MiniCashier";
import { site } from "@/lib/site";

export default function Features() {
  return (
    <section id="fitur" aria-labelledby="fitur-title" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="fitur-title"
          eyebrow="Fitur"
          title={
            <>
              Semua urusan warung.
              <br className="hidden sm:block" /> <span className="text-muted">Di satu HP.</span>
            </>
          }
          lead="Dari kasir sampai buku hutang, dari stok sampai laporan untung. Dirancang bersama pemilik warung, jadi tombolnya besar dan bahasanya sehari-hari."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Kasir */}
          <article className="card reveal relative overflow-hidden p-6 sm:p-9 md:col-span-6 lg:col-span-4 lg:row-span-2">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_340px] lg:grid-cols-1 xl:grid-cols-[1fr_340px]">
              <div>
                <Tag>Kasir digital</Tag>
                <h3 className="display-md mt-4 text-balance">Jualan secepat bicara.</h3>
                <p className="mt-4 text-pretty text-muted">
                  Scan barcode pakai kamera HP, atau cukup sebut pesanannya:
                  <em className="not-italic font-semibold text-ink"> “dua Indomie goreng, satu Aqua”</em>. Bayar tunai, QRIS,
                  transfer, atau catat jadi hutang.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <Bullet icon={<ScanBarcode className="size-4" />}>Scan barcode</Bullet>
                  <Bullet icon={<Mic className="size-4" />}>Kasir suara</Bullet>
                  <Bullet icon={<QrCode className="size-4" />}>QRIS & transfer</Bullet>
                  <Bullet icon={<Printer className="size-4" />}>Struk Bluetooth</Bullet>
                  <Bullet icon={<BadgePercent className="size-4" />}>Diskon kasir</Bullet>
                  <Bullet icon={<BookOpen className="size-4" />}>Bayar nanti</Bullet>
                </ul>
                <p className="mt-6 text-xs text-subtle">Coba langsung → ketuk tombol mikrofon atau “Tambah”.</p>
              </div>
              <MiniCashier />
            </div>
          </article>

          {/* Stok */}
          <article className="card reveal flex flex-col overflow-hidden p-6 sm:p-8 md:col-span-3 lg:col-span-2">
            <Tag>Stok otomatis</Tag>
            <h3 className="title mt-4">Stok berkurang sendiri tiap ada penjualan.</h3>
            <p className="mt-2 text-sm text-muted">Pengingat restok muncul sebelum barang laku kehabisan.</p>
            <ul className="mt-6 space-y-2.5" aria-label="Contoh daftar stok">
              <StockRow name="Indomie Goreng" left={7} max={40} state="Menipis" />
              <StockRow name="Minyak Goreng 1 L" left={0} max={24} state="Habis" />
              <StockRow name="Gula Pasir 1 kg" left={18} max={24} />
            </ul>
          </article>

          {/* Hutang */}
          <article className="reveal relative flex flex-col overflow-hidden rounded-[28px] bg-honey p-6 text-ink sm:p-8 md:col-span-3 lg:col-span-2">
            <BookOpen aria-hidden className="absolute -right-6 -top-6 size-36 text-white/25" strokeWidth={1.25} />
            <span className="eyebrow inline-flex w-fit rounded-full bg-white/50 px-3 py-1 text-[#5c4300]">Buku hutang</span>
            <h3 className="title mt-4 text-[#2b2000]">Tak ada lagi catatan hutang yang hilang.</h3>
            <div className="mt-auto pt-8">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Bu Sri</span>
                  <span className="font-bold tabular-nums">Rp45.000</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-[#6b5a2a]">
                  <span>3 hari lalu · Gula, Telur</span>
                  <span className="rounded-full bg-brand-100 px-2 py-0.5 font-semibold text-brand-700">Tandai lunas</span>
                </div>
              </div>
            </div>
          </article>

          {/* Offline */}
          <article className="reveal relative overflow-hidden rounded-[28px] bg-brand-950 p-6 text-white sm:p-9 md:col-span-6 lg:col-span-3">
            <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-500/20 blur-3xl" />
            <span className="eyebrow inline-flex rounded-full bg-white/10 px-3 py-1 text-brand-300">Offline-first</span>
            <h3 className="display-md mt-4 text-balance">Sinyal hilang? Kasir tetap jalan.</h3>
            <p className="mt-4 max-w-md text-pretty text-white/70">
              Transaksi, hutang, tambah produk, dan atur stok disimpan di HP dulu, lalu dikirim otomatis begitu internet
              kembali. Cocok untuk warung di pelosok atau saat kuota habis.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-honey px-4 py-3 text-sm font-semibold text-[#2b2000]">
              <CloudOff className="size-4 shrink-0" aria-hidden />
              <span className="flex-1">3 transaksi menunggu dikirim</span>
              <span className="text-xs font-bold underline underline-offset-2">Kirim sekarang</span>
            </div>
          </article>

          {/* Laporan */}
          <article className="card reveal flex flex-col overflow-hidden p-6 sm:p-9 md:col-span-6 lg:col-span-3">
            <Tag>Laporan</Tag>
            <h3 className="title mt-4">Tahu untung hari ini, bukan cuma omzet.</h3>
            <p className="mt-2 text-sm text-muted">Omzet, laba bersih, margin, dan barang terlaris — dihitung otomatis.</p>
            <SalesChart />
          </article>

          {/* Katalog */}
          <article className="card reveal p-6 sm:p-8 md:col-span-2">
            <IconBubble><Search className="size-5" /></IconBubble>
            <h3 className="title mt-5">{site.catalogSize} produk siap pakai</h3>
            <p className="mt-2 text-sm text-muted">Scan barcode, nama dan foto barang terisi sendiri. Tidak perlu ketik satu-satu.</p>
          </article>

          {/* Tim */}
          <article className="card reveal p-6 sm:p-8 md:col-span-2">
            <IconBubble><Users className="size-5" /></IconBubble>
            <h3 className="title mt-5">Kasir pakai akunnya sendiri</h3>
            <p className="mt-2 text-sm text-muted">Undang dengan kode 6 karakter, atur izinnya, dan pantau setiap transaksi dari HP pemilik.</p>
            <div className="mt-5 flex gap-1.5" aria-label="Contoh kode undangan K7P2QX">
              {"K7P2QX".split("").map((c, i) => (
                <span key={i} className="grid h-10 flex-1 place-items-center rounded-xl bg-paper text-base font-bold text-ink">
                  {c}
                </span>
              ))}
            </div>
          </article>

          {/* Keamanan */}
          <article className="card reveal p-6 sm:p-8 md:col-span-2">
            <IconBubble><ShieldCheck className="size-5" /></IconBubble>
            <h3 className="title mt-5">Aman, data milikmu</h3>
            <p className="mt-2 text-sm text-muted">
              PIN 6 digit, sesi login terenkripsi, dan pembatalan transaksi tercatat lengkap dengan alasannya. Data tidak pernah dijual.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-brand-700">{children}</span>;
}

function IconBubble({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
      {children}
    </span>
  );
}

function Bullet({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 font-medium text-ink-2">
      <span aria-hidden className="grid size-8 place-items-center rounded-xl bg-paper text-brand-700">
        {icon}
      </span>
      {children}
    </li>
  );
}

function StockRow({ name, left, max, state }: { name: string; left: number; max: number; state?: "Menipis" | "Habis" }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-paper px-3.5 py-3">
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{name}</span>
        <span className="text-xs text-muted">Stok {left}</span>
      </span>
      {state ? (
        <span
          className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${
            state === "Habis" ? "bg-[#fde8e8] text-alert" : "bg-honey-soft text-[#8a6500]"
          }`}
        >
          {state}
        </span>
      ) : null}
      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${state ? "bg-brand-600 text-white" : "bg-white text-muted"}`}>
        {state ? "Restok" : `${Math.round((left / max) * 100)}%`}
      </span>
    </li>
  );
}

/** Grafik garis ala aplikasi: lengkung halus, gradasi 18% → 2%, titik terakhir dengan halo. */
function SalesChart() {
  const data = [420, 510, 470, 640, 590, 780, 910];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const W = 520;
  const H = 180;
  const max = 1000;
  const step = W / data.length;
  const pts = data.map((v, i) => [step * i + step / 2, H - (v / max) * H] as const);
  const line = pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
    })
    .join(" ");
  const area = `${line} L ${pts[pts.length - 1][0]} ${H} L ${pts[0][0]} ${H} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <figure className="mt-auto pt-8">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-muted">Omzet 7 hari</p>
          <p className="text-2xl font-extrabold tracking-tight">Rp4.320.000</p>
        </div>
        <p className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">Laba Rp1,1 jt</p>
      </div>
      <svg viewBox={`0 -14 ${W} ${H + 40}`} className="w-full" role="img" aria-label="Contoh grafik omzet tujuh hari yang terus naik">
        <defs>
          <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#00680C" stopOpacity="0.18" />
            <stop offset="1" stopColor="#00680C" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgb(12 24 16 / 0.06)" strokeDasharray="4 6" />
        ))}
        <path d={area} fill="url(#sales-fill)" />
        <path d={line} fill="none" stroke="#00680C" strokeWidth="3" strokeLinecap="round" />
        <circle cx={lx} cy={ly} r="11" fill="#00680C" opacity="0.15" />
        <circle cx={lx} cy={ly} r="5.5" fill="#00680C" stroke="#fff" strokeWidth="2.5" />
        {days.map((d, i) => (
          <text key={d} x={step * i + step / 2} y={H + 24} textAnchor="middle" fontSize="13" fontWeight="600" fill="#8a948e">
            {d}
          </text>
        ))}
      </svg>
    </figure>
  );
}
