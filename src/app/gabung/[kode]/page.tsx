import type { Metadata } from "next";
import AppLinkLanding from "@/components/site/AppLinkLanding";
import CopyCode from "./CopyCode";

export const metadata: Metadata = {
  title: "Undangan Kasir",
  description: "Kamu diundang menjadi kasir di warung yang memakai Stoqin.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ kode: string }> };

// Sama dengan aturan di AppLinks.kt: huruf/angka saja, maks. 12 karakter, huruf besar.
const sanitize = (raw: string) =>
  raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 12);

export default async function GabungPage({ params }: Props) {
  const kode = sanitize((await params).kode);
  return (
    <AppLinkLanding
      eyebrow="Undangan kasir"
      title="Kamu diundang jadi kasir!"
      openPath={`gabung/${kode}`}
      openLabel="Gabung lewat aplikasi"
    >
      <p>Pasang aplikasi Stoqin, daftar sebagai <strong className="font-semibold text-ink">Kasir</strong>, lalu masukkan kode undangan ini:</p>
      {kode ? <CopyCode code={kode} /> : null}
      <p className="mt-4 text-sm">Kode hanya bisa dipakai sekali. Minta kode baru ke pemilik warung kalau sudah kedaluwarsa.</p>
    </AppLinkLanding>
  );
}
