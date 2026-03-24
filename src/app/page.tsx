import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="noise">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}