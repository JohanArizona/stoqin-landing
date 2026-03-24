export default function MarqueeSection() {
  const items = [
    "Kasir Digital",
    "Offline-First",
    "Marketplace Grosir",
    "Manajemen Stok Otomatis",
    "AI Analytics",
    "Scan Barcode",
    "Laporan Keuangan",
    "Harga Distributor",
    "Tanpa Internet",
    "Restock Mudah",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="border-y border-[#1F1F1F] bg-[#0D0D0D] py-4 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            <span className="text-sm text-gray-400 whitespace-nowrap font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}