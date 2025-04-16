import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SpecializedDoctors } from "@/components/SpecializedDoctors";
import { EmergencyCallout } from "@/components/EmergencyCallout";
import { EmergencyAmbulance } from "@/components/EmergencyAmbulance";
import { DiagnosticServices } from "@/components/DiagnosticServices";
import { HealthSuggestion } from "@/components/HealthSuggestion";
import { Testimonials } from "@/components/Testimonials";
import { MobileApp } from "@/components/MobileApp";
import { Partners } from "@/components/Partners";
import { HealthServices } from "@/components/HealthServices";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <SpecializedDoctors />
      <EmergencyCallout />
      <EmergencyAmbulance />
      <DiagnosticServices />
      <HealthSuggestion />
      <Testimonials />
      <MobileApp />
      <HealthServices />
      <Partners />
      <Footer />
    </main>
  );
}
