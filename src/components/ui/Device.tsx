import Image from "next/image";

/** Screenshot asli aplikasi (dirender dari @Preview Compose di emulator Pixel 9, 1080×2424). */
export const SCREENS = {
  home: "Dashboard pemilik warung: penjualan hari ini, grafik 7 hari, dan menu utama",
  kasir: "Layar kasir: pemindai barcode, kasir suara, dan keranjang berisi Indomie Goreng dan gula",
  bayar: "Layar pembayaran kasir: tunai atau hutang, uang diterima, dan kembalian",
  stok: "Manajemen stok dengan pencarian, filter menipis dan habis",
  produk: "Detail produk: harga beli, harga jual, margin, dan tombol atur stok",
  hutang: "Buku hutang: total piutang, jatuh tempo, dan tombol tandai lunas",
  kulakan: "Kulakan: cari sembako, kategori, grosir terlaris, dan promo Lagi Hemat",
  keranjang: "Keranjang kulakan per grosir dengan total belanja",
  analisis: "Laporan gratis: ringkasan omzet dan produk terjual",
  premium: "Laporan Premium: laba, margin, performa produk, dan kesehatan warung",
  restok: "Rekomendasi restok: sisa stok, perkiraan habis, dan jumlah beli",
  riwayat: "Riwayat transaksi kasir",
  chat: "Pesan dengan grosir",
  kasirtim: "Kelola kasir: daftar kasir dan tambah kasir baru",
  onboarding: "Layar pembuka aplikasi Stoqin",
} as const;

export type ScreenName = keyof typeof SCREENS;

/** Bingkai HP bergaya Pixel. Lebar diatur lewat className (tinggi mengikuti rasio layar). */
export function Device({
  screen,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 70vw, 320px",
  alt,
}: {
  screen: ScreenName;
  className?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* tombol samping */}
      <span aria-hidden className="absolute -right-[2px] top-[22%] h-[7%] w-[3px] rounded-r bg-[#2a2f2c]" />
      <span aria-hidden className="absolute -right-[2px] top-[32%] h-[12%] w-[3px] rounded-r bg-[#2a2f2c]" />
      <div className="relative rounded-[13%/6%] bg-[#1b1f1d] p-[2.6%] shadow-[0_50px_90px_-40px_rgb(15_26_20/0.55),0_0_0_1px_rgb(15_26_20/0.08),inset_0_0_0_1.5px_rgb(255_255_255/0.1)]">
        <div className="relative aspect-[1080/2424] overflow-hidden rounded-[10.5%/4.7%] bg-paper">
          <Image
            src={`/app/${screen}.webp`}
            alt={alt ?? SCREENS[screen]}
            width={720}
            height={1616}
            sizes={sizes}
            priority={priority}
            className="absolute inset-0 size-full object-cover"
          />
          {/* kamera punch-hole */}
          <span aria-hidden className="absolute left-1/2 top-[1.25%] aspect-square w-[3.4%] -translate-x-1/2 rounded-full bg-[#0b0d0c] ring-[1.5px] ring-[#222]" />
        </div>
      </div>
    </div>
  );
}
