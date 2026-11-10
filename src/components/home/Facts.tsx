import { site } from "@/lib/site";

const facts = [
  { value: "Rp0", label: "untuk kasir, stok, hutang & kulakan" },
  { value: site.catalogSize, label: "produk di katalog — tinggal scan barcode" },
  { value: "0 sinyal", label: "kasir, stok & hutang tetap jalan offline" },
  { value: "3 app", label: "warung, grosir & kurir saling terhubung" },
];

export default function Facts() {
  return (
    <section aria-label="Stoqin dalam angka" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.value} className="reveal bg-canvas px-5 py-7 sm:px-7 sm:py-9">
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="block text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                {f.value}
              </span>
              <span className="mt-3 block text-sm leading-snug text-muted">{f.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
