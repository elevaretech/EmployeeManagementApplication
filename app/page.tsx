import Header from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
// import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        {/* <StatsSection /> */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
