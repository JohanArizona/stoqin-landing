"use client";
import { motion } from "framer-motion";

const steps = [
  {
    no: "01",
    title: "Download & Daftar",
    desc: "Install Stoqin dari Play Store. Daftar akun dalam 2 menit cukup nomor HP, nama toko, dan lokasi. Tim kami siap bantu onboarding.",
    icon: "📱",
  },
  {
    no: "02",
    title: "Setup Produk & Stok",
    desc: "Tambah produk dengan scan barcode kamera HP. Input harga beli & jual. Stok langsung terpantau otomatis sejak awal.",
    icon: "📦",
  },
  {
    no: "03",
    title: "Transaksi & Kelola",
    desc: "Gunakan kasir digital untuk setiap penjualan. Data masuk otomatis, stok berkurang, laporan terupdate real-time.",
    icon: "🛒",
  },
  {
    no: "04",
    title: "Order Grosir dari HP",
    desc: "Stok menipis? Langsung order dari marketplace grosir Stoqin. Harga distributor, kirim ke depan warung. Hemat waktu & ongkos.",
    icon: "🚚",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Cara Kerja
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Mulai dalam <span className="text-green-400">4 Langkah</span><br />
            Mudah.
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tidak butuh keahlian teknis. Tidak perlu beli alat kasir. 
            Cukup HP Android yang kamu punya.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-green-500/20 to-transparent hidden md:block" style={{ transform: "translateX(-0.5px)" }} />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className="flex-1 bg-[#111] border border-[#1F1F1F] rounded-2xl p-6 hover:border-green-500/30 transition-colors duration-300 group">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{step.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-green-500 font-display">{step.no}</span>
                        <div className="h-px w-8 bg-green-500/30" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-16 shrink-0 justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-green-500 glow-green z-10 relative" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-400 pulse-ring" />
                  </div>
                </div>

                {/* Spacer on alternating side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}