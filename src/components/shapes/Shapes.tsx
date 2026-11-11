import type { LucideIcon } from "lucide-react";

/**
 * Bahasa visual Stoqin: hanya hijau & putih.
 * Ubin ikon diambil dari gaya ilustrasi onboarding aplikasi (kotak hijau membulat, ikon putih).
 */
export const C = {
  leaf: "#00A814",
  deep: "#00680C",
  forest: "#14281D",
  mint: "#D7F2DB",
  ink: "#0F1A14",
  white: "#FFFFFF",
} as const;

export type Tone = "leaf" | "deep" | "forest" | "mint" | "white";

const TONES: Record<Tone, { bg: string; fg: string; ring?: string }> = {
  leaf: { bg: C.leaf, fg: "#fff" },
  deep: { bg: C.deep, fg: "#fff" },
  forest: { bg: C.forest, fg: "#fff" },
  mint: { bg: C.mint, fg: C.deep },
  white: { bg: "#fff", fg: C.leaf, ring: "rgb(15 26 20 / 0.08)" },
};

/** Ubin ikon: ukurannya mengikuti font-size induk (pakai kelas size-[..em]). */
export function Tile({ icon: Icon, tone = "leaf", className = "", style }: { icon: LucideIcon; tone?: Tone; className?: string; style?: React.CSSProperties }) {
  const t = TONES[tone];
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-[24%] ${className}`}
      style={{
        background: t.bg,
        color: t.fg,
        boxShadow: `${t.ring ? `inset 0 0 0 1px ${t.ring},` : ""} inset 0 -0.06em 0 rgb(0 0 0 / 0.12), 0 0.18em 0.4em -0.2em rgb(15 26 20 / 0.35)`,
        ...style,
      }}
    >
      <Icon className="size-[52%]" strokeWidth={2.1} />
    </span>
  );
}

type P = { className?: string; color?: string; style?: React.CSSProperties };
const svg = (vb: string, className: string | undefined, style: React.CSSProperties | undefined, children: React.ReactNode) => (
  <svg viewBox={vb} className={className} style={style} aria-hidden focusable="false">
    {children}
  </svg>
);

export const Dot = ({ className, color = C.leaf, style }: P) => svg("0 0 10 10", className, style, <circle cx="5" cy="5" r="5" fill={color} />);

export const Ring = ({ className, color = C.leaf, style }: P) =>
  svg("0 0 100 100", className, style, <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="14" />);

export const Plus = ({ className, color = C.leaf, style }: P) =>
  svg("0 0 100 100", className, style, <path d="M50 10 V90 M10 50 H90" stroke={color} strokeWidth="16" strokeLinecap="round" />);

/** Kardus isometrik tiga sisi (motif dari logo). */
export const Box = ({ className, style }: P) =>
  svg(
    "0 0 100 100",
    className,
    style,
    <>
      <path d="M50 4 L94 26 L50 48 L6 26 Z" fill="#2BB83B" />
      <path d="M6 26 L50 48 V96 L6 74 Z" fill="#00770D" />
      <path d="M94 26 L50 48 V96 L94 74 Z" fill="#00AA13" />
    </>,
  );

/** Garis-garis barcode. */
export const Barcode = ({ className, color = C.forest, style }: P) => {
  const bars = [6, 3, 9, 3, 6, 12, 3, 6, 3, 9, 6, 3, 12, 3];
  let x = 0;
  return svg(
    "0 0 120 100",
    className,
    style,
    <>
      {bars.map((w, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="100" fill={color} /> : null;
        x += w + 2;
        return r;
      })}
    </>,
  );
};
