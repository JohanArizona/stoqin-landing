import { ARROW, CUBE_FRONT, CUBE_SIDE, WORDMARK } from "@/components/brand/Logo";

/**
 * Pembuka sekali per sesi: logo Stoqin "dibangun" lalu tirai terangkat.
 * Murni CSS (tidak menunggu JavaScript, jadi tidak bisa tersangkut).
 * Skrip kecil di bawah menandai sesi agar kunjungan berikutnya langsung tampil.
 */
export default function Intro() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('stq-intro')){document.documentElement.classList.add('no-intro')}else{sessionStorage.setItem('stq-intro','1')}}catch(e){document.documentElement.classList.add('no-intro')}`,
        }}
      />
      <div className="intro" aria-hidden>
        <svg viewBox="0 0 47 18" className="h-14 w-auto overflow-visible sm:h-16">
          <path className="i-part i-side" d={CUBE_SIDE} fill="#00770D" />
          <path className="i-part i-front" d={CUBE_FRONT} fill="#00AA13" />
          <path className="i-part i-arrow" d={ARROW} fill="#2BB83B" />
          <path className="i-word" d={WORDMARK} fill="#0F1A14" />
        </svg>
      </div>
    </>
  );
}
