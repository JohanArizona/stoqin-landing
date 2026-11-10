import { Fuel, NotebookPen, Wallet } from "lucide-react";

const PAINS = [
  {
    icon: Fuel,
    title: "Ongkos kulakan menggerus untung",
    body: "Bensin, parkir, dan setengah hari keliling pasar grosir hanya untuk mencari harga yang lebih murah.",
  },
  {
    icon: NotebookPen,
    title: "Stok & hutang di buku tulis",
    body: "Barang laku tiba-tiba habis, catatan hutang pelanggan terselip, dan selisih kas tak pernah ketahuan sebabnya.",
  },
  {
    icon: Wallet,
    title: "Uang modal tercampur",
    body: "Omzet terlihat ramai, tapi tidak pernah jelas berapa untung bersih hari ini.",
  },
];

export default function Story() {
  return (
    <section aria-labelledby="story-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <figure className="reveal mx-auto max-w-4xl text-center">
          <blockquote>
            <p id="story-title" className="display-md text-balance text-ink">
              <span className="text-brand-500">“</span>Biaya parkir dan bensin kalau harus keliling cari barang murah itu lumayan.
              Untung sedikit, malah habis di jalan.<span className="text-brand-500">”</span>
            </p>
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted">
            <span className="font-semibold text-ink">Ibu Yuyun</span> · pemilik warung sembako di Malang, dalam wawancara riset Stoqin
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PAINS.map((p) => (
            <div key={p.title} className="reveal rounded-[28px] bg-paper p-7">
              <p.icon className="size-6 text-ink-2" aria-hidden strokeWidth={1.75} />
              <h3 className="mt-5 text-lg font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="reveal mt-10 text-center text-lg font-semibold text-ink">
          Stoqin dibuat untuk menyelesaikan ketiganya. <span className="text-brand-600">Dari HP yang sudah kamu punya.</span>
        </p>
      </div>
    </section>
  );
}
