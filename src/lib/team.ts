/**
 * Data tim Stoqin. Foto: taruh `public/tim/<id>.webp` (atau .jpg / .png), rasio potret ±2:3.
 * Kalau file belum ada, kartu otomatis menampilkan monogram inisial.
 */
export type Member = { id: string; name: string; role: string; detail?: string };
export type Division = { id: string; title: string; bg: string; fg: string; members: Member[] };

export const DIVISIONS: Division[] = [
  {
    id: "c-suite",
    title: "C-Suite",
    bg: "#00A814",
    fg: "#FFFFFF",
    members: [
      { id: "johan", name: "Johan Arizona", role: "Chief Executive Officer", detail: "FILKOM 2023 · Teknologi Informasi" },
      { id: "rizqullah", name: "Muhammad Rizqullah Almadinah", role: "Chief Technology Officer", detail: "FILKOM 2023 · Teknologi Informasi" },
      { id: "dimas", name: "Dimas Yoga Pratama", role: "Chief Operating Officer", detail: "FILKOM 2023 · Teknologi Informasi" },
      { id: "nafi", name: "Nafi Satul Fuadhah", role: "Chief Financial Officer", detail: "FEB 2024 · Akuntansi" },
      { id: "syarmi", name: "Syarmi Ayesha Putri Samira", role: "Chief Marketing Officer", detail: "FEB 2025 · Akuntansi" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    bg: "#14281D",
    fg: "#FFFFFF",
    members: [
      { id: "rhesa", name: "Rhesa Tsaqif Adyatma", role: "Mobile Developer" },
      { id: "zhafir", name: "Muhammad Zhafir Aufar", role: "Mobile Developer" },
      { id: "mafaza", name: "Ahmad Mafaza Afnani", role: "AI Engineer" },
      { id: "farhan", name: "Farhan Vier Syarif Hilmi", role: "AI Engineer" },
    ],
  },
  {
    id: "desain",
    title: "Desain Produk",
    bg: "#D7F2DB",
    fg: "#0F1A14",
    members: [
      { id: "bagas", name: "Bagas Aditha Pratama", role: "UI/UX Designer" },
      { id: "annita", name: "Annita Puspita Suci", role: "UI/UX Designer" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    bg: "#FFFFFF",
    fg: "#0F1A14",
    members: [{ id: "syahvira", name: "Syahvira Azzahra Alyssa Wuryanto", role: "Legal" }],
  },
];

export const ALL_MEMBERS = DIVISIONS.flatMap((d) => d.members);
export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
