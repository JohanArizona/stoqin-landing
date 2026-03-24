"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ibu Yuyun",
    role: "Pemilik Warung Sembako, Malang",
    emoji: "🧕",
    text: "Biaya parkir dan bensin kalau harus keliling cari barang murah itu lumayan, untung sedikit malah habis di jalan. Sekarang order dari HP, hemat banget!",
    rating: 5,
  },
  {
    name: "Pak Budi",
    role: "Warung Kelontong, Sidoarjo",
    emoji: "👨‍🦱",
    text: "Dulu sering bingung uang modal kepake buat belanja harian karena uangnya campur. Sekarang pakai Stoqin, langsung ketahuan untung berapa hari ini.",
    rating: 5,
  },
  {
    name: "Ibu Siti",
    role: "Toko Sembako, Blitar",
    emoji: "👩‍💼",
    text: "Kasirnya gampang banget dipakai, anak saya yang masih SMP aja bisa. Stok otomatis berkurang tiap ada penjualan, ga perlu hitung manual lagi.",
    rating: 5,
  },
  {
    name: "Mas Rizal",
    role: "Warung Campuran, Kediri",
    emoji: "👨‍💻",
    text: "Fitur prediksi stok habisnya akurat. Sering dapat notif 'Indomie tinggal 10' sebelum habis, jadi ga pernah kehabisan barang laku lagi.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Testimoni
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
            Kata Mereka yang<br />
            <span className="text-green-400">Sudah Pakai Stoqin.</span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {[
            { num: "200+", label: "Warung Aktif" },
            { num: "3", label: "Distributor Mitra" },
            { num: "42%", label: "Rata-rata Kenaikan Omzet" },
          ].map((s, i) => (
            <div key={i} className="bg-[#111] border border-[#1F1F1F] rounded-2xl p-5 text-center">
              <p className="font-display text-2xl md:text-3xl font-extrabold text-green-400 mb-1">{s.num}</p>
              <p className="text-gray-500 text-xs">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-[#111] border border-[#1F1F1F] rounded-2xl p-6 hover:border-green-500/30 transition-colors duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} size={13} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1F1F1F]">
                <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-lg">
                  {t.emoji}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}