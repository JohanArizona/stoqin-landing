"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Package, BarChart3, Wifi, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <ShoppingCart size={24} />,
    title: "Stoqin POS",
    subtitle: "Kasir Digital Offline-First",
    desc: "Scan barcode via kamera HP, catat transaksi, cetak struk digital. Berjalan mulus tanpa internet, data sync otomatis saat online.",
    accent: "from-green-500/20 to-transparent",
    border: "border-green-500/20",
    tag: "Core Feature",
  },
  {
    icon: <Package size={24} />,
    title: "Smart Stock",
    subtitle: "Manajemen Stok Otomatis",
    desc: "Stok berkurang otomatis tiap transaksi. Notifikasi sebelum kehabisan. Restock langsung dari marketplace grosir dalam 1 klik.",
    accent: "from-blue-500/20 to-transparent",
    border: "border-blue-500/20",
    tag: "Unggulan",
  },
  {
    icon: <ShoppingCart size={24} />,
    title: "Grosir Marketplace",
    subtitle: "Belanja Stok Langsung dari HP",
    desc: "Terhubung langsung ke distributor lokal. Harga transparan, pengiriman ke depan warung. Hemat biaya parkir & waktu.",
    accent: "from-purple-500/20 to-transparent",
    border: "border-purple-500/20",
    tag: "Hemat Biaya",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "AI Analytics",
    subtitle: "Analisis Penjualan Cerdas",
    desc: "Prediksi kapan stok habis, barang apa paling laris, dan berapa optimal restock. Data berbasis histori transaksi nyata.",
    accent: "from-orange-500/20 to-transparent",
    border: "border-orange-500/20",
    tag: "AI Powered",
  },
  {
    icon: <Wifi size={24} />,
    title: "Offline Ready",
    subtitle: "Tetap Jalan Tanpa Sinyal",
    desc: "Semua data tersimpan lokal. Transaksi, stok, dan laporan tetap akurat meski sinyal buruk. Sync otomatis saat koneksi tersedia.",
    accent: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/20",
    tag: "Andalan Daerah",
  },
  {
    icon: <Shield size={24} />,
    title: "Multi-Role Access",
    subtitle: "Kontrol Pemilik & Karyawan",
    desc: "Atur hak akses pemilik dan kasir. Semua aktivitas tercatat. Tidak ada lagi selisih kas atau kesalahan input karyawan.",
    accent: "from-pink-500/20 to-transparent",
    border: "border-pink-500/20",
    tag: "Anti Fraud",
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-32 px-6 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Fitur Lengkap
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Semua yang Warungmu<br />
            <span className="text-green-400">Butuhkan, Dalam 1 App.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dari kasir sampai kulakan, dari pencatatan sampai analisis cerdas, 
            Stoqin hadir sebagai mitra digital warungmu setiap hari.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl bg-gradient-to-br ${f.accent} bg-[#111] border ${f.border} p-6 overflow-hidden group cursor-default`}
            >
              {/* Top tag */}
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                {f.tag}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-white mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs font-medium mb-3">{f.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.02]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}