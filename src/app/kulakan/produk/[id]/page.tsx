import type { Metadata } from "next";
import AppLinkLanding from "@/components/site/AppLinkLanding";

export const metadata: Metadata = {
  title: "Produk Kulakan",
  description: "Lihat dan kulakan produk grosir ini lewat aplikasi Stoqin.",
  robots: { index: false, follow: true },
};

type Props = { params: Promise<{ id: string }> };

export default async function ProdukPage({ params }: Props) {
  const id = encodeURIComponent((await params).id);
  return (
    <AppLinkLanding
      mascot="listening"
      eyebrow="Kulakan Stoqin"
      title="Ada yang membagikan produk grosir untukmu."
      openPath={`kulakan/produk/${id}`}
      openLabel="Lihat produk di aplikasi"
    >
      <p>
        Bandingkan harga dari grosir terdekat, bayar dengan QRIS atau virtual account, lalu barang diantar sampai depan warung.
      </p>
    </AppLinkLanding>
  );
}
