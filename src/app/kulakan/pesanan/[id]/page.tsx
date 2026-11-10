import type { Metadata } from "next";
import AppLinkLanding from "@/components/site/AppLinkLanding";

export const metadata: Metadata = {
  title: "Pesanan Kulakan",
  description: "Lihat status pesanan kulakan di aplikasi Stoqin.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

/**
 * Tujuan kembali setelah pembayaran kulakan (Paymenku, `pembayaran.rs`) dan link pesanan dari notifikasi.
 */
export default async function PesananPage({ params }: Props) {
  const id = encodeURIComponent((await params).id);
  return (
    <AppLinkLanding
      mascot="happy"
      eyebrow="Pesanan kulakan"
      title="Terima kasih! Pesananmu sedang diproses."
      openPath={`kulakan/pesanan/${id}`}
      openLabel="Lihat pesanan di aplikasi"
    >
      <p>
        Status pembayaran dan pengiriman diperbarui otomatis di aplikasi Stoqin. Kamu juga akan menerima notifikasi saat grosir
        menerima pesanan dan kurir berangkat.
      </p>
    </AppLinkLanding>
  );
}
