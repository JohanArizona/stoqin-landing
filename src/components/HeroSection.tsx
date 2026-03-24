"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, ShoppingCart, BarChart3 } from "lucide-react";

const floatCards = [
  {
    icon: <TrendingUp size={16} className="text-green-400" />,
    title: "Omzet Hari Ini",
    value: "Rp 1.250.000",
    sub: "+23% dari kemarin",
    pos: "top-[40%] -left-12 md:left-0",
    delay: 0,
  },
  {
    icon: <ShoppingCart size={16} className="text-green-400" />,
    title: "Order Masuk",
    value: "47 Pesanan",
    sub: "12 sedang diproses",
    pos: "top-[15%] -right-4 md:right-8",
    delay: 0.3,
  },
  {
    icon: <BarChart3 size={16} className="text-green-400" />,
    title: "Stok Aman",
    value: "94% Produk",
    sub: "3 perlu restock",
    pos: "bottom-[20%] -right-16 md:right-0",
    delay: 0.6,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg grid-pattern pt-8">
      {/* Background glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-green-700/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Left — Text + Mockup (Mobile/Tablet) */}
        <div className="flex-1 text-center lg:text-left flex flex-col">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-white">Kelola Warung</span><br />
            <span className="text-green-400 text-glow">Jadi Mudah,</span>
            <br />
            <span className="text-white">Belanja Stok</span>{" "}
            <span className="text-green-400 text-glow">Lebih Murah!</span>
          </motion.h1>

          {/* Mockup — Tablet Only (hidden on mobile, desktop) */}
          <div className="hidden md:flex lg:hidden justify-center my-8 relative min-h-[400px]">
            <motion.img
              src="/MockupWeb.png"
              alt="Stoqin App Mockup"
              className="w-[280px] md:w-[320px] drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
              transition={{
                opacity: { delay: 0.3, duration: 0.8 },
                scale: { delay: 0.3, duration: 0.8 },
                y: {
                  delay: 1.1,
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
              }}
              whileHover={{ scale: 1.08 }}
            />

            {/* Floating stat cards */}
            {floatCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  opacity: { delay: 0.7 + card.delay, duration: 0.6 },
                  scale: { delay: 0.7 + card.delay, duration: 0.6 },
                  y: {
                    delay: 1.3 + card.delay,
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }
                }}
                className={`absolute ${card.pos} bg-[#111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-3 w-44 shadow-2xl`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {card.icon}
                  <span className="text-[10px] text-gray-400">{card.title}</span>
                </div>
                <p className="text-white font-bold text-sm">{card.value}</p>
                <p className="text-green-400 text-[10px] mt-0.5">{card.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-gray-400 text-md md:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
          >
            Aplikasi all-in-one untuk pemilik warung kelontong. Kasir digital, 
            manajemen stok otomatis, dan marketplace grosir semuanya dalam 
            <span className="text-green-400 font-semibold"> satu HP</span>, bahkan tanpa sinyal!
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#harga"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-500 text-black font-bold text-base hover:bg-green-400 transition-all duration-200 hover:scale-105 active:scale-95 glow-green"
            >
              Mulai Gratis Sekarang
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#cara-kerja"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#2A2A2A] text-gray-300 font-medium text-base hover:border-green-500/50 hover:text-white transition-all duration-200"
            >
              ▶ Lihat Demo
            </a>
          </motion.div>
        </div>

        {/* Right — Phone Mockup (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:flex-1 relative justify-center items-center min-h-[500px]"
        >
          <motion.img
            src="/MockupWeb.png"
            alt="Stoqin App Mockup"
            className="w-[280px] md:w-[350px] lg:w-[420px] drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
            transition={{
              opacity: { delay: 0.3, duration: 0.8 },
              scale: { delay: 0.3, duration: 0.8 },
              y: {
                delay: 1.1,
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }
            }}
            whileHover={{ scale: 1.08 }}
          />

          {/* Floating stat cards */}
          {floatCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                opacity: { delay: 0.7 + card.delay, duration: 0.6 },
                scale: { delay: 0.7 + card.delay, duration: 0.6 },
                y: {
                  delay: 1.3 + card.delay,
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
              }}
              className={`absolute ${card.pos} bg-[#111]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-3 w-44 shadow-2xl hidden md:block`}
            >
              <div className="flex items-center gap-2 mb-1">
                {card.icon}
                <span className="text-[10px] text-gray-400">{card.title}</span>
              </div>
              <p className="text-white font-bold text-sm">{card.value}</p>
              <p className="text-green-400 text-[10px] mt-0.5">{card.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}