"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-green-500/15 to-green-900/5 border border-green-500/30 p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Background blobs */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-500/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-700/10 rounded-full blur-[80px]" />

          {/* Decorative grid */}
          <div className="absolute inset-0 grid-pattern opacity-20 rounded-3xl" />

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              🚀 Bergabung Sekarang
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            >
              Jadikan Warungmu<br />
              <span className="text-green-400 text-glow">Modern.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
            >
              Mulai gratis hari ini. Tidak butuh alat tambahan. 
              Tidak butuh keahlian teknis. Cukup HP Androidmu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-500 text-black font-bold hover:bg-green-400 transition-all hover:scale-105 active:scale-95 glow-green"
              >
                <Download size={18} />
                Download di Play Store
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/081217260945"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:border-green-500/40 hover:bg-white/5 transition-all"
              >
                💬 Chat via WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}