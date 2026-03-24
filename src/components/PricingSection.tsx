"use client";
import { motion } from "framer-motion";
import { section } from "framer-motion/m";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "/bulan",
    desc: "Untuk warung yang baru mulai digitalisasi.",
    highlight: false,
    cta: "Mulai Gratis",
    features: [
      "Kasir POS digital",
      "Manajemen stok dasar",
      "Laporan harian",
      "Scan barcode kamera HP",
      "Mode offline",
      "1 pengguna (pemilik)",
    ],
    disabled: ["AI analisis penjualan", "Multi-cabang", "Fitur grosir premium"],
  },
  {
    name: "Pro",
    price: "Rp 19.000",
    period: "/bulan",
    desc: "Untuk warung yang ingin tumbuh lebih cepat.",
    highlight: true,
    cta: "Coba Pro 30 Hari",
    features: [
      "Semua fitur Gratis",
      "AI analisis & prediksi stok",
      "Rekomendasi restock otomatis",
      "Marketplace grosir full access",
      "Multi-cabang (s/d 3 toko)",
      "Ekspor laporan lengkap",
      "Manajemen karyawan & role",
      "Priority customer support",
    ],
    disabled: [],
  },
];

export default function PricingSection() {
  return (
    <section id="harga" className="py-32 px-6 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Harga
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-[1.3]">
            Harga yang <span className="text-green-400">Terjangkau</span><br />
            untuk Warung Kecil.
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Lebih murah dari biaya parkir sekali ke pasar grosir.
            Tidak ada kontrak panjang, bisa berhenti kapan saja.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-2xl p-7 border flex flex-col ${
                plan.highlight
                  ? "bg-green-500/5 border-green-500/40 shadow-[0_0_60px_rgba(34,197,94,0.1)]"
                  : "bg-[#111] border-[#1F1F1F]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500 text-black text-xs font-bold">
                    <Zap size={12} />
                    Paling Populer
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-gray-400 text-sm font-medium mb-1">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="font-display text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <Check size={15} className="text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.disabled.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-gray-600 line-through">
                    <div className="w-[15px] h-[15px] rounded-full border border-gray-700 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-green-500 text-black hover:bg-green-400 glow-green"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-gray-600 text-sm mt-10"
        >
          Tidak ada kartu kredit. Tidak ada biaya tersembunyi. Bisa upgrade/downgrade kapan saja.
        </motion.p>
      </div>
    </section>
  );
}