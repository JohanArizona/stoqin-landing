import { playStoreUrl } from "@/lib/site";

export function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#00D7FE" d="M3.6 1.8 13.4 12l-9.8 10.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2Z" />
      <path fill="#FFCE00" d="m16.7 15.3-3.3-3.3 3.3-3.3 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.2Z" />
      <path fill="#FF3A44" d="M16.7 15.3 13.4 12l-9.8 10.2c.4.2.9.2 1.4-.1l11.7-6.8Z" />
      <path fill="#00F076" d="M16.7 8.7 5 1.9c-.5-.3-1-.3-1.4-.1L13.4 12l3.3-3.3Z" />
    </svg>
  );
}

export function PlayButton({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <a
      href={playStoreUrl}
      target="_blank"
      rel="noopener"
      aria-label="Unduh Stoqin di Google Play"
      className={`press group inline-flex h-14 items-center gap-3 rounded-2xl pl-4 pr-6 ${
        dark
          ? "bg-ink text-white shadow-[0_10px_30px_-10px_rgb(12_24_16/0.6)] hover:bg-brand-900"
          : "bg-white text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.4)] hover:bg-brand-50"
      } ${className}`}
    >
      <GooglePlayIcon className="size-7" />
      <span className="flex flex-col items-start leading-none">
        <span className={`text-[0.6875rem] font-medium ${dark ? "text-white/70" : "text-muted"}`}>Unduh gratis di</span>
        <span className="mt-1 text-[1.0625rem] font-bold tracking-tight">Google Play</span>
      </span>
    </a>
  );
}
