import ScrollWords from "@/components/motion/ScrollWords";
import { Chapter } from "@/components/ui/Chapter";

export default function Story() {
  return (
    <section aria-labelledby="story-title" className="relative border-t border-line bg-canvas py-24 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <Chapter n={2}>Kenapa Stoqin</Chapter>
        <h2 id="story-title" className="sr-only">
          Kenapa warung butuh Stoqin
        </h2>
        <ScrollWords
          className="display-lg mt-10 max-w-5xl text-pretty !leading-[1.14] text-ink"
          text="Warung itu sibuk. Stok dan hutang masih di buku tulis, kulakan makan ongkos. *Stoqin* merapikan semuanya — *dari* *satu* *HP.*"
        />

        <figure className="reveal mt-16 flex max-w-2xl flex-col gap-5 border-l-2 border-leaf pl-6 sm:mt-20">
          <blockquote className="text-xl font-medium leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
            “Biaya parkir dan bensin kalau harus keliling cari barang murah itu lumayan, untung sedikit malah habis di jalan.”
          </blockquote>
          <figcaption className="text-sm text-muted">
            <span className="font-semibold text-ink">Ibu Yuyun</span> · pemilik warung sembako, Malang
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
