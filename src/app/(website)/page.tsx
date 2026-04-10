import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import ScheduleVisitSection from "@/components/landing/schedule-visit-section";
import TestimonialsSection from "@/components/shared/testimonials-section";
import PricingSection from "@/components/shared/pricing-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ScheduleVisitSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}
