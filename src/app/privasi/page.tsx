import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: { absolute: "Kebijakan Privasi · Stoqin" },
  description:
    "Kebijakan Privasi aplikasi Stoqin: data yang dikumpulkan, penggunaannya, pihak ketiga, dan hak pengguna.",
  alternates: { canonical: "/privasi" },
};

const sectionCls = "card mb-4 p-6 md:p-8";
const h2Cls = "title mb-4 text-ink";
const ulCls = "list-disc pl-5 mb-3 space-y-2 marker:text-brand-500";
const pCls = "mb-3";
const aCls = "font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600";

export default function PrivasiPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper pt-28">
      <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        <p className="eyebrow mb-3 text-brand-600">Legal</p>
        <h1 className="display-lg">Kebijakan Privasi Stoqin</h1>
        <p className="mt-4 text-muted">Berlaku sejak 28 September 2026</p>
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-24 leading-relaxed text-ink-2 sm:px-6">
        <section className={sectionCls}>
          <p className={pCls}>Stoqin adalah aplikasi Android yang membantu pemilik warung dan kasir mengelola stok, penjualan, dan hutang pelanggan. Halaman ini menjelaskan data apa yang kami kumpulkan, untuk apa, dan bagaimana kamu mengendalikannya, sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.</p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>1. Data yang Kami Kumpulkan</h2>
          <ul className={ulCls}>
            <li><strong className="font-semibold text-ink">Data akun:</strong> nama, email, nomor telepon (opsional), foto profil, dan password. Kalau masuk dengan Google, kami menerima nama, email, dan foto profil dari akun Google-mu.</li>
            <li><strong className="font-semibold text-ink">Data warung:</strong> nama, alamat, titik lokasi di peta, foto warung, gambar QRIS, dan rekening transfer yang kamu tambahkan.</li>
            <li><strong className="font-semibold text-ink">Data kasir:</strong> nama, username, tanggal lahir, dan jenis kelamin yang diisi saat bergabung ke warung.</li>
            <li><strong className="font-semibold text-ink">Data usaha:</strong> produk, harga, stok, riwayat transaksi, dan catatan hutang, termasuk nama dan nomor telepon pelanggan yang kamu catat.</li>
            <li><strong className="font-semibold text-ink">Data perangkat:</strong> token notifikasi untuk mengirim pemberitahuan ke HP-mu.</li>
          </ul>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>2. Data dari Akun Google</h2>
          <p className={pCls}>Kalau kamu memilih &quot;Masuk dengan Google&quot;, Stoqin hanya meminta informasi dasar akun Google-mu: <strong className="font-semibold text-ink">nama, alamat email, dan foto profil</strong>. Kami tidak meminta akses ke Gmail, Kontak, Drive, Kalender, atau data Google lainnya.</p>
          <ul className={ulCls}>
            <li>Data ini dipakai <strong className="font-semibold text-ink">hanya</strong> untuk membuat akun Stoqin, masuk ke akun tersebut, dan menampilkan nama serta foto profilmu di aplikasi.</li>
            <li>Data ini tidak dijual, tidak dipakai untuk iklan, dan tidak dibagikan ke pihak lain.</li>
            <li>Data ini disimpan di server Stoqin selama akunmu aktif, dan dihapus saat akun dihapus (lihat bagian 8).</li>
          </ul>
          <p className={`${pCls} text-muted`} lang="en"><em>Google user data (English):</em> When you sign in with Google, Stoqin only requests your basic profile information: name, email address, and profile picture. This data is used solely to create and sign in to your Stoqin account and to display your name and photo in the app. It is not sold, not used for advertising, and not shared with third parties. It is stored on Stoqin servers while your account is active and deleted when you delete your account.</p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>3. Izin di HP-mu</h2>
          <p className={pCls}>Setiap izin hanya diminta saat fiturnya kamu pakai, dan bisa dicabut kapan saja lewat pengaturan HP.</p>
          <ul className={ulCls}>
            <li><strong className="font-semibold text-ink">Kamera:</strong> memindai barcode produk dan memotret produk, warung, atau QRIS. Pemindaian barcode diproses di HP.</li>
            <li><strong className="font-semibold text-ink">Mikrofon:</strong> fitur kasir suara dan asisten suara. Suaramu diubah menjadi teks oleh layanan pengenal suara di HP, lalu hanya teksnya yang dikirim ke server, untuk dicocokkan dengan produk warungmu atau dijawab oleh asisten.</li>
            <li><strong className="font-semibold text-ink">Lokasi:</strong> menandai titik lokasi warung saat pendaftaran.</li>
            <li><strong className="font-semibold text-ink">Notifikasi:</strong> pemberitahuan transaksi, stok menipis, dan selisih stok. Tiap jenisnya bisa dimatikan di Setelan &gt; Notifikasi.</li>
          </ul>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>4. Untuk Apa Data Dipakai</h2>
          <ul className={ulCls}>
            <li>Menjalankan fitur kasir, stok, hutang, laporan, dan manajemen kasir.</li>
            <li>Memverifikasi akun lewat kode OTP email dan menjaga keamanan login.</li>
            <li>Mengirim notifikasi yang kamu aktifkan.</li>
            <li>Memproses pembayaran langganan Stoqin Pro.</li>
            <li>Menyusun laporan dan rekomendasi restok untuk warungmu sendiri.</li>
            <li>Menjawab pertanyaan ke asisten suara (Stoqin Pro) dari data warungmu sendiri. Asisten hanya membaca data, tidak mengubahnya.</li>
          </ul>
          <p className={pCls}>Kami tidak menjual data pribadi maupun data penjualan warungmu, dan tidak memakainya untuk iklan.</p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>5. Pihak Ketiga</h2>
          <p className={pCls}>Beberapa layanan mitra memproses data seperlunya untuk menjalankan fitur tertentu:</p>
          <ul className={ulCls}>
            <li><strong className="font-semibold text-ink">Google:</strong> login dengan Google, notifikasi (Firebase Cloud Messaging), pemindai barcode di HP (ML Kit), serta pencocokan pesanan kasir suara dan jawaban asisten suara (Gemini, lewat server kami).</li>
            <li><strong className="font-semibold text-ink">Mapbox:</strong> menampilkan peta saat memilih lokasi warung.</li>
            <li><strong className="font-semibold text-ink">Midtrans:</strong> memproses pembayaran Stoqin Pro. Data kartu atau akun pembayaranmu dimasukkan langsung di halaman Midtrans, bukan disimpan oleh Stoqin.</li>
            <li><strong className="font-semibold text-ink">Penyedia email:</strong> mengirim kode OTP ke emailmu.</li>
            <li><strong className="font-semibold text-ink">Penyimpanan cloud:</strong> menyimpan foto yang kamu unggah.</li>
          </ul>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>6. Penyimpanan &amp; Keamanan</h2>
          <ul className={ulCls}>
            <li>Data dikirim ke server Stoqin melalui koneksi terenkripsi (HTTPS).</li>
            <li>Sesi login di HP disimpan terenkripsi dengan Android Keystore.</li>
            <li>PIN aplikasi hanya tersimpan di HP-mu dalam bentuk acak (hash), tidak pernah dikirim ke server.</li>
            <li>Kasir hanya bisa membuka fitur yang diizinkan pemilik warung.</li>
            <li>Pertanyaan ke asisten suara, jawabannya, dan data yang dibaca untuk menjawabnya disimpan paling lama 30 hari untuk menilai mutu jawaban, lalu dihapus otomatis. Semuanya ikut terhapus saat akun dihapus.</li>
          </ul>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>7. Data Offline</h2>
          <p className={pCls}>Supaya kasir tetap jalan tanpa sinyal, salinan produk, transaksi, dan hutang disimpan di HP. Transaksi yang dibuat saat offline dikirim ke server begitu internet tersambung. Salinan ini dihapus dari HP saat kamu keluar dari akun.</p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>8. Hak Kamu &amp; Hapus Akun</h2>
          <ul className={ulCls}>
            <li><strong className="font-semibold text-ink">Melihat &amp; mengubah:</strong> data akun dan warung bisa diubah di Setelan &gt; Edit Profile.</li>
            <li><strong className="font-semibold text-ink">Menghapus akun:</strong> buka Setelan &gt; Hapus Akun. Untuk pemilik warung, data warung (produk, transaksi, hutang, laporan) ikut dihapus dan semua kasir kehilangan akses.</li>
            <li><strong className="font-semibold text-ink">Lewat email:</strong> kalau tidak bisa masuk ke aplikasi, kirim permintaan hapus akun dari email yang terdaftar ke <a href="mailto:stoqinid@gmail.com" className={aCls}>stoqinid@gmail.com</a>.</li>
          </ul>
          <p className={pCls}>Data yang wajib disimpan menurut hukum (misalnya catatan pembayaran langganan) bisa kami simpan lebih lama sesuai kewajiban tersebut.</p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>9. Perubahan Kebijakan</h2>
          <p className={pCls}>Kalau kebijakan ini berubah, tanggal berlakunya diperbarui dan perubahan penting akan kami beritahukan lewat aplikasi.</p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>10. Hubungi Kami</h2>
          <p className={pCls}>Pertanyaan atau permintaan terkait data pribadi bisa dikirim ke <a href="mailto:stoqinid@gmail.com" className={aCls}>stoqinid@gmail.com</a>.</p>
        </section>
      </article>
      </main>
      <Footer />
    </>
  );
}
