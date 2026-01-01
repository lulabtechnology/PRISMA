import BackgroundFX from "@/components/BackgroundFX";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesTabs from "@/components/ServicesTabs";
import EcosystemOrbit from "@/components/EcosystemOrbit";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <BackgroundFX />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <About />
        <ServicesTabs />
        <EcosystemOrbit />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
