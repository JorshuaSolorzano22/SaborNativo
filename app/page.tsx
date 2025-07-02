
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/landing/HeroSection";
import { FeaturedProductsSection } from "@/components/sections/landing/FeaturedProductsSection";
import { AboutUsSection } from "@/components/sections/landing/AboutUsSection";
import { RecipesSection } from "@/components/sections/landing/RecipesSection";
import { ContactSection } from "@/components/sections/landing/ContactSection";
import { WhatsappCTA } from "@/components/sections/landing/WhatsappCTA";
import { Footer } from "@/components/layout/Footer"; 

export default function HomePage() {
  return (
    <div className="bg-brand-background">
      {}
      <Header />
      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FeaturedProductsSection />
        <AboutUsSection />
        <RecipesSection />
        <ContactSection />
        <WhatsappCTA />
      </main>
      <Footer />
    </div>
  );
}