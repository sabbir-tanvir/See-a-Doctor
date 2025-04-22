import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SpecializedDoctors } from "@/components/SpecializedDoctors";
import { EmergencyCallout } from "@/components/EmergencyCallout";

import { DiagnosticServices } from "@/components/DiagnosticServices";
import { HealthSuggestion } from "@/components/HealthSuggestion";
import { Testimonials } from "@/components/Testimonials";

import { HealthServices } from "@/components/HealthServices";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <SpecializedDoctors />
      <EmergencyCallout />

      <DiagnosticServices />
      <HealthSuggestion />
      <Testimonials />

      <HealthServices />

      <Footer />
    </main>
  );
}
