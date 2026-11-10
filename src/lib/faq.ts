import { rupiah, site } from "./site";

/**
 * Jawaban mengikuti perilaku aplikasi & backend sekarang (sebagian sama persis dengan
 * Pusat Bantuan di aplikasi, `HelpCenterScreen.kt`). Dipakai untuk tampilan DAN JSON-LD FAQPage,
 * jadi isi keduanya selalu sama (syarat Google untuk rich result).
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Apa itu Stoqin?",
    a: "Stoqin adalah aplikasi Android untuk warung dan toko kelontong: kasir digital, manajemen stok, buku hutang pelanggan, laporan penjualan, dan kulakan (belanja stok) langsung ke grosir. Stoqin juga punya aplikasi untuk grosir dan kurir, jadi pesanan dari warung tercatat sampai barang diantar.",
  },
  {
    q: "Apakah aplikasi kasir Stoqin gratis?",
    a: `Ya. Kasir, manajemen stok, buku hutang, kelola kasir, laporan harian, dan kulakan grosir bisa dipakai gratis tanpa batas waktu. Stoqin Pro (${rupiah(site.proPrice)}/bulan) menambahkan analisis keuangan, performa produk, analisis kesehatan toko, rekomendasi restok, dan asisten suara AI.`,
  },
  {
    q: "Apakah Stoqin bisa dipakai tanpa internet?",
    a: "Bisa. Transaksi, hutang, tambah atau edit produk, dan atur stok tetap berjalan saat offline. Data disimpan di HP dan dikirim otomatis begitu internet tersambung. Selama masih ada data yang belum terkirim, banner kuning tampil di atas layar — ketuk untuk mengirim sekarang.",
  },
  {
    q: "HP apa yang dibutuhkan untuk memakai Stoqin?",
    a: `HP Android dengan ${site.minAndroid} atau lebih baru. Tidak perlu mesin kasir atau scanner tambahan: barcode dipindai dengan kamera HP. Kalau ingin mencetak struk, Stoqin mendukung printer thermal Bluetooth.`,
  },
  {
    q: "Bagaimana cara kulakan atau belanja grosir di Stoqin?",
    a: "Buka menu Kulakan, cari barang, lalu bandingkan harga dari grosir mitra terdekat. Pembayaran bisa lewat QRIS, virtual account bank, dompet digital, atau bayar di Alfamart dan Indomaret. Setelah pesanan dikirim, posisi kurir bisa dilacak di peta dan kamu bisa chat kurir dari aplikasi.",
  },
  {
    q: "Metode pembayaran apa saja yang bisa dipakai di kasir?",
    a: "Tunai, QRIS (menampilkan gambar QRIS warungmu), transfer bank ke rekening warung, dan hutang yang langsung tercatat di buku hutang.",
  },
  {
    q: "Bagaimana cara menambah kasir?",
    a: "Buka Setelan > Kelola Kasir, lalu buat kode undangan. Kasir mendaftar di aplikasi Stoqin dengan emailnya sendiri, lalu memasukkan kode 6 karakter itu. Kode hanya bisa dipakai sekali, dan pemilik bisa mengatur izin setiap kasir.",
  },
  {
    q: "Bagaimana cara berlangganan dan berhenti berlangganan Stoqin Pro?",
    a: "Buka Setelan dan ketuk Upgrade. Pembayaran lewat Google Play dan diperpanjang otomatis tiap bulan. Untuk berhenti, buka Setelan > Kelola Langganan Pro atau Play Store > Profil > Pembayaran & langganan. Setelah dibatalkan, Pro tetap aktif sampai akhir periode yang sudah dibayar.",
  },
  {
    q: "Apakah data warung saya aman?",
    a: "Data hanya dipakai untuk menjalankan fitur Stoqin bagi warungmu, tidak dijual, dan tidak dipakai untuk iklan. Sesi login disimpan terenkripsi, aplikasi bisa dikunci dengan PIN, dan pengelolaan data mengikuti UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Akun dan datanya bisa kamu hapus kapan saja dari Setelan.",
  },
  {
    q: "Saya pemilik grosir. Bagaimana cara bergabung?",
    a: "Grosir memakai aplikasi Stoqin Grosir untuk mengelola katalog, menerima pesanan dari warung, menugaskan kurir, dan memantau pengantaran. Hubungi tim Stoqin lewat WhatsApp atau email untuk mendaftar sebagai mitra grosir.",
  },
];
