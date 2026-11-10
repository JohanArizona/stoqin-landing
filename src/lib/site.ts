/**
 * Satu sumber kebenaran untuk fakta produk yang tampil di situs & metadata SEO.
 * Angka di sini diambil dari backend & aplikasi (bukan karangan):
 * - Harga Pro: `PRO_SUBSCRIPTION_PRICE` di stoqin-backend/crates/domain-warung/src/service.rs
 * - Katalog master: stoqin-backend/seeds/master_products.csv (50.600+ baris)
 * - minSdk 24 = Android 7.0 (stoqin-retail-android)
 */
export const site = {
  name: "Stoqin",
  url: "https://stoqin.id",
  locale: "id_ID",
  title: "Stoqin — Aplikasi Kasir Warung Gratis, Stok & Kulakan Grosir",
  shortTitle: "Aplikasi Kasir, Stok & Kulakan untuk Warung",
  description:
    "Stoqin adalah aplikasi kasir warung gratis untuk Android: catat penjualan, kelola stok otomatis, buku hutang, dan kulakan ke grosir langsung dari HP. Tetap jalan tanpa internet.",
  email: "stoqinid@gmail.com",
  whatsapp: "6281217260945",
  whatsappDisplay: "0812-1726-0945",
  city: "Malang",
  region: "Jawa Timur",
  company: "PT Nusantara Digital Mandiri",
  androidPackage: "com.stoqin.app",
  minAndroid: "Android 7.0",
  proPrice: 19000,
  catalogSize: "50.600+",
} as const;

export const playStoreUrl = `https://play.google.com/store/apps/details?id=${site.androidPackage}`;
export const waUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

export const navLinks = [
  { href: "/#fitur", label: "Fitur" },
  { href: "/#kulakan", label: "Kulakan" },
  { href: "/#asisten", label: "Asisten AI" },
  { href: "/#ekosistem", label: "Ekosistem" },
  { href: "/#harga", label: "Harga" },
  { href: "/#faq", label: "FAQ" },
] as const;
