import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import Facts from "@/components/home/Facts";
import Story from "@/components/home/Story";
import DragWords from "@/components/home/DragWords";
import WarungGallery from "@/components/home/WarungGallery";
import ProductStory from "@/components/home/ProductStory";
import Kulakan from "@/components/home/Kulakan";
import Assistant from "@/components/home/Assistant";
import Ecosystem from "@/components/home/Ecosystem";
import Pricing from "@/components/home/Pricing";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ClickBurst from "@/components/motion/ClickBurst";
import Intro from "@/components/motion/Intro";
import CursorLabel from "@/components/motion/CursorLabel";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faq";
import { playStoreUrl, site } from "@/lib/site";

const ORG_ID = `${site.url}/#organization`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Stoqin",
      legalName: site.company,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/icon-512.png`, width: 512, height: 512 },
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: "ID",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.email,
          availableLanguage: ["Indonesian"],
          areaServed: "ID",
        },
      ],
      sameAs: [playStoreUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Stoqin",
      alternateName: ["Stoqin App", "Aplikasi Stoqin"],
      inLanguage: "id-ID",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "id-ID",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#app` },
      primaryImageOfPage: `${site.url}/opengraph-image`,
    },
    {
      "@type": "MobileApplication",
      "@id": `${site.url}/#app`,
      name: "Stoqin",
      alternateName: "Stoqin — Kasir, Stok & Kulakan Warung",
      description: site.description,
      operatingSystem: `ANDROID ${site.minAndroid.replace("Android ", "")}+`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Point of Sale",
      inLanguage: "id-ID",
      installUrl: playStoreUrl,
      downloadUrl: playStoreUrl,
      url: site.url,
      image: `${site.url}/app/home.webp`,
      screenshot: ["home", "kasir", "stok", "hutang", "kulakan", "premium"].map((s) => `${site.url}/app/${s}.webp`),
      publisher: { "@id": ORG_ID },
      featureList: [
        "Kasir digital dengan scan barcode kamera",
        "Kasir suara",
        "Pembayaran tunai, QRIS, transfer, dan hutang",
        "Manajemen stok otomatis dan pengingat restok",
        "Buku hutang pelanggan",
        "Kulakan grosir dengan pelacakan kurir",
        "Mode offline dengan sinkronisasi otomatis",
        "Laporan omzet dan laba",
        "Kelola kasir dengan kode undangan dan izin akses",
        "Asisten suara AI (Stoqin Pro)",
      ],
      offers: [
        {
          "@type": "Offer",
          name: "Gratis",
          price: "0",
          priceCurrency: "IDR",
          category: "free",
        },
        {
          "@type": "Offer",
          name: "Stoqin Pro",
          price: String(site.proPrice),
          priceCurrency: "IDR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(site.proPrice),
            priceCurrency: "IDR",
            billingDuration: "P1M",
            unitCode: "MON",
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten
      </a>
      <Intro />
      <SmoothScroll />
      <ClickBurst />
      <CursorLabel />
      <Navbar />
      <main id="konten">
        <Hero />
        <DragWords />
        <Facts />
        <Story />
        <WarungGallery />
        <ProductStory />
        <Kulakan />
        <Assistant />
        <Ecosystem />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
