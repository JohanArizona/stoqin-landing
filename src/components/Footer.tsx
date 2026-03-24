export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F1F] bg-[#0A0A0A] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/StoqinWhite.png" alt="Logo Stoqin" className="w-max h-8"/>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Aplikasi All-in-One Marketplace Grosir, Kasir Digital, dan Analisis Penjualan untuk Ritel Mikro
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Produk</p>
            <ul className="space-y-2">
              {["Fitur POS", "Manajemen Stok", "Marketplace Grosir", "AI Analytics", "Harga"].map(l => (
                <li key={l}>
                  <a href="#" className="text-gray-500 text-sm hover:text-green-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Kontak</p>
            <ul className="space-y-2">
              <li><a href="mailto:stoqinid@gmail.com" className="text-gray-500 text-sm hover:text-green-400 transition-colors">Email</a></li>
              <li><a href="https://wa.me/081217260945" className="text-gray-500 text-sm hover:text-green-400 transition-colors">WhatsApp</a></li>
              <li><span className="text-gray-500 text-sm">Malang, Jawa Timur</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F1F1F] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 Stoqin · PT Nusantara Digital Mandiri. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Dibuat dengan ❤️ untuk UMKM Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}