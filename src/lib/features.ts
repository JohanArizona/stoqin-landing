import type { ScreenName } from "@/components/ui/Device";
import { rupiah, site } from "./site";

/**
 * Halaman per fitur (SEO). Semua klaim mengikuti perilaku aplikasi & backend yang ada sekarang.
 * `icon` adalah nama ikon lucide (dipetakan di halaman).
 */
export type Feature = {
  slug: string;
  nav: string;
  label: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  accent: string; // bagian h1 yang dimiringkan
  lead: string;
  screens: [ScreenName, ScreenName, ScreenName];
  points: { icon: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const FEATURES: Feature[] = [
  {
    slug: "kasir",
    nav: "Kasir",
    label: "Kasir digital",
    title: "Aplikasi Kasir Warung Gratis untuk Android",
    description:
      "Aplikasi kasir warung gratis: scan barcode pakai kamera HP, kasir suara, bayar tunai, QRIS, transfer, atau hutang, cetak struk Bluetooth, dan tetap jalan tanpa internet.",
    h1: "Aplikasi kasir warung yang",
    accent: "secepat bicara.",
    lead: "Scan barcode pakai kamera HP atau sebut saja pesanannya. Pembayaran, struk, dan stok beres dalam satu layar.",
    screens: ["kasir", "home", "riwayat"],
    points: [
      { icon: "ScanBarcode", title: "Scan barcode dari kamera", body: "Tidak perlu alat scanner. Arahkan kamera HP, barang langsung masuk keranjang." },
      { icon: "Mic", title: "Kasir suara", body: "Sebut “dua Indomie goreng, satu Aqua”, Stoqin mencocokkan dengan barang di warungmu." },
      { icon: "QrCode", title: "Tunai, QRIS, transfer, hutang", body: "QRIS menampilkan kode warungmu sendiri. Pilih hutang, langsung tercatat di buku hutang." },
      { icon: "Printer", title: "Struk Bluetooth", body: "Cetak ke printer thermal Bluetooth atau bagikan struk ke pelanggan." },
      { icon: "CloudOff", title: "Tetap jalan tanpa sinyal", body: "Transaksi disimpan di HP dan terkirim otomatis saat internet kembali." },
      { icon: "Users", title: "Kasir pakai akunnya sendiri", body: "Undang kasir dengan kode, atur izinnya, dan pantau setiap transaksi dari HP pemilik." },
    ],
    faqs: [
      {
        q: "Apakah aplikasi kasir Stoqin gratis?",
        a: "Ya. Fitur kasir, stok, buku hutang, dan kulakan bisa dipakai gratis tanpa batas waktu. Stoqin Pro hanya menambahkan analisis dan asisten suara AI.",
      },
      {
        q: "Apakah perlu membeli mesin kasir atau scanner?",
        a: `Tidak. Cukup HP Android (${site.minAndroid} ke atas); barcode dipindai dengan kamera HP. Printer thermal Bluetooth bersifat opsional untuk mencetak struk.`,
      },
      {
        q: "Bisakah kasir dipakai saat tidak ada internet?",
        a: "Bisa. Transaksi, hutang, dan perubahan stok disimpan di HP lalu dikirim otomatis begitu internet tersambung.",
      },
    ],
  },
  {
    slug: "stok",
    nav: "Stok",
    label: "Manajemen stok",
    title: "Aplikasi Stok Barang Warung: Stok Otomatis & Pengingat Restok",
    description: `Kelola stok barang warung otomatis: stok berkurang setiap penjualan, pengingat restok sebelum habis, katalog ${site.catalogSize} produk siap scan, dan restok langsung dari grosir.`,
    h1: "Stok warung yang",
    accent: "mengurus dirinya sendiri.",
    lead: "Setiap penjualan langsung memotong stok. Kamu diingatkan sebelum barang laris habis, dan bisa restok dari HP.",
    screens: ["stok", "produk", "restok"],
    points: [
      { icon: "RefreshCw", title: "Berkurang otomatis", body: "Tidak perlu hitung manual. Stok terpotong di setiap transaksi kasir." },
      { icon: "Bell", title: "Pengingat restok", body: "Filter barang menipis dan habis, plus pengingat di dashboard sebelum kehabisan." },
      { icon: "Search", title: `Katalog ${site.catalogSize} produk`, body: "Scan barcode, nama dan foto barang terisi sendiri dari katalog Stoqin." },
      { icon: "Package", title: "SKU & barang curah", body: "Barang ber-barcode maupun curah (beras, gula, minyak) bisa dicatat." },
      { icon: "History", title: "Riwayat & stok opname", body: "Setiap perubahan stok tercatat. Atur stok sesuai hitungan di rak kapan saja." },
      { icon: "ShoppingCart", title: "Restok sekali ketuk", body: "Tombol Restok di setiap barang membuka kulakan barang yang sama." },
    ],
    faqs: [
      {
        q: "Bagaimana cara memasukkan barang ke Stoqin?",
        a: `Scan barcode barang dengan kamera HP. Untuk ${site.catalogSize} produk di katalog Stoqin, nama dan fotonya terisi otomatis; kamu tinggal mengisi harga dan jumlah stok.`,
      },
      {
        q: "Apa yang terjadi kalau barang terjual saat offline melebihi stok?",
        a: "Stok berhenti di 0 dan kelebihannya dicatat sebagai selisih stok, supaya bisa kamu cocokkan dengan barang di rak.",
      },
    ],
  },
  {
    slug: "buku-hutang",
    nav: "Buku hutang",
    label: "Buku hutang digital",
    title: "Buku Hutang Digital untuk Warung: Catat Kasbon Pelanggan",
    description:
      "Catat hutang dan kasbon pelanggan warung secara digital. Tercatat otomatis dari kasir, lihat jatuh tempo, dan tandai lunas sekali ketuk. Gratis di aplikasi Stoqin.",
    h1: "Buku hutang yang",
    accent: "tidak pernah hilang.",
    lead: "Pilih “Hutang” saat bayar, nama pelanggan dan barangnya tercatat sendiri. Tandai lunas sekali ketuk.",
    screens: ["hutang", "bayar", "home"],
    points: [
      { icon: "BookOpen", title: "Tercatat dari kasir", body: "Transaksi dengan metode Hutang otomatis masuk buku hutang, lengkap dengan barangnya." },
      { icon: "Wallet", title: "Total piutang sekali lihat", body: "Ringkasan jumlah hutang pelanggan dan berapa orang yang sudah jatuh tempo." },
      { icon: "CalendarClock", title: "Jatuh tempo", body: "Hutang yang lewat tempo ditandai jelas, jadi tidak ada yang terlupa." },
      { icon: "CircleCheck", title: "Tandai lunas", body: "Satu ketukan saat pelanggan membayar. Riwayatnya tetap tersimpan." },
      { icon: "CloudOff", title: "Bisa offline", body: "Catat hutang dan pelunasan tanpa internet, terkirim otomatis nanti." },
      { icon: "ShieldCheck", title: "Aman di akunmu", body: "Tidak ada lagi buku yang sobek, basah, atau terselip." },
    ],
    faqs: [
      {
        q: "Apakah buku hutang Stoqin gratis?",
        a: "Ya, buku hutang termasuk fitur gratis Stoqin, bersama kasir, stok, dan kulakan.",
      },
      {
        q: "Bisakah kasir mencatat hutang pelanggan?",
        a: "Bisa. Kasir dapat mencatat hutang baru saat transaksi, sementara pemilik tetap bisa memantau seluruh catatan dari HP-nya.",
      },
    ],
  },
  {
    slug: "kulakan",
    nav: "Kulakan",
    label: "Kulakan grosir",
    title: "Aplikasi Kulakan Grosir Online untuk Warung",
    description:
      "Kulakan stok warung dari HP: bandingkan harga grosir terdekat, bayar lewat QRIS, virtual account, e-wallet, atau minimarket, lalu lacak kurir sampai depan warung.",
    h1: "Kulakan tanpa",
    accent: "ke pasar.",
    lead: "Bandingkan harga dari grosir terdekat, pesan dari HP, dan barang diantar kurir sampai depan warung.",
    screens: ["kulakan", "keranjang", "chat"],
    points: [
      { icon: "Store", title: "Grosir terdekat", body: "Lihat grosir di sekitarmu, harga, minimal pembelian, dan ongkos kirimnya." },
      { icon: "BadgePercent", title: "Promo Lagi Hemat", body: "Harga grosir lagi turun? Promo tampil langsung di halaman kulakan." },
      { icon: "Wallet", title: "Bayar sesukamu", body: "QRIS, virtual account bank, dompet digital, atau bayar di Alfamart dan Indomaret." },
      { icon: "MapPin", title: "Lacak kurir di peta", body: "Posisi kurir bergerak langsung di peta sampai barang tiba." },
      { icon: "MessageCircle", title: "Chat grosir & kurir", body: "Tanyakan stok atau titik antar langsung dari aplikasi." },
      { icon: "Star", title: "Ulasan produk", body: "Setelah pesanan selesai, beri rating untuk membantu warung lain memilih." },
    ],
    faqs: [
      {
        q: "Metode pembayaran apa saja untuk kulakan?",
        a: "QRIS, virtual account bank, dompet digital, serta pembayaran di gerai Alfamart dan Indomaret.",
      },
      {
        q: "Saya pemilik grosir, bisakah bergabung?",
        a: "Bisa. Grosir memakai aplikasi Stoqin Grosir untuk mengelola katalog, menerima pesanan, dan menugaskan kurir. Hubungi tim Stoqin untuk mendaftar sebagai mitra.",
      },
    ],
  },
  {
    slug: "laporan",
    nav: "Laporan",
    label: "Laporan & analisis",
    title: "Laporan Penjualan & Laba Warung Otomatis",
    description: `Laporan penjualan warung otomatis: omzet, laba bersih, margin, barang terlaris, skor kesehatan warung, dan rekomendasi restok. Mulai gratis, Pro ${rupiah(site.proPrice)}/bulan.`,
    h1: "Tahu untung,",
    accent: "bukan cuma omzet.",
    lead: "Omzet, laba, margin, dan barang terlaris dihitung otomatis dari setiap transaksi kasir.",
    screens: ["premium", "analisis", "restok"],
    points: [
      { icon: "BarChart3", title: "Laporan harian gratis", body: "Omzet, jumlah transaksi, dan produk terjual hari ini atau 7 hari terakhir." },
      { icon: "Wallet", title: "Laba & margin", body: "Bukan sekadar omzet: lihat untung bersih dan margin per hari (Pro)." },
      { icon: "TrendingUp", title: "Performa produk", body: "Barang terlaris, paling lambat, dan bermargin tertinggi (Pro)." },
      { icon: "HeartPulse", title: "Kesehatan warung", body: "Skor 0–100 dari data penjualan harian warungmu (Pro)." },
      { icon: "PackageCheck", title: "Rekomendasi restok", body: "Perkiraan kapan barang habis dan berapa yang perlu dibeli (Pro)." },
      { icon: "Mic", title: "Asisten suara AI", body: "Tanya “berapa untung hari ini?”, dijawab dari datamu sendiri (Pro)." },
    ],
    faqs: [
      {
        q: "Apa beda laporan gratis dan Stoqin Pro?",
        a: `Laporan harian gratis untuk semua warung. Stoqin Pro (${rupiah(site.proPrice)}/bulan) menambahkan ringkasan keuangan, laba & margin, performa produk, kesehatan warung, rekomendasi restok, dan asisten suara AI.`,
      },
      {
        q: "Bagaimana cara berhenti berlangganan Pro?",
        a: "Buka Setelan > Kelola Langganan Pro, atau Play Store > Pembayaran & langganan. Pro tetap aktif sampai akhir periode yang sudah dibayar.",
      },
    ],
  },
];

export const featureBySlug = (slug: string) => FEATURES.find((f) => f.slug === slug);
