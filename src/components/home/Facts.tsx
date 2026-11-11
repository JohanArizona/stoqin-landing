import CountUp from "@/components/motion/CountUp";

const facts: { key: string; value: React.ReactNode; label: string }[] = [
  { key: "gratis", value: "Rp0", label: "Untuk mulai berjualan" },
  { key: "katalog", value: <CountUp to={50600} suffix="+" />, label: "Produk siap di-scan" },
  { key: "offline", value: "Offline", label: "Tetap jalan tanpa sinyal" },
  { key: "app", value: <CountUp to={3} suffix=" app" duration={900} />, label: "Warung, grosir, kurir" },
];

export default function Facts() {
  return (
    <section aria-label="Stoqin dalam angka" className="border-t border-line bg-paper">
      <dl className="mx-auto grid max-w-[1320px] grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.key}
            className={`reveal flex flex-col-reverse px-4 py-10 sm:px-8 sm:py-14 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="label mt-4 flex items-center gap-2 text-muted">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-leaf" />
              {f.label}
            </dt>
            <dd className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-none tracking-[-0.05em] text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
